const os = require('os')
const HID = require('node-hid')
const parseColor = require('parse-color')
const { VrpcAdapter, VrpcAgent } = require('vrpc')

const COMMAND = {
  color: 0x01,
  fadeTo: 0x02,
  flash: 0x03,
  wave: 0x04,
  police: 0x06,
  rainbow: 0x06
}

const TARGET = {
  all: 0xff,
  top: 0x41,
  bottom: 0x42,
  one: 0x01,
  two: 0x02,
  three: 0x03,
  four: 0x04,
  five: 0x05,
  six: 0x06
}

class Luxafor {
  static hasDevice () {
    Luxafor._device = null
    return !!Luxafor._getDevice()
  }

  /**
   * Change color to given color
   * @param {String} color The color to be set
   * @param {String} [target='all'] Defines which LEDs to set (all, top, bottom, one, two, three, four, five, six)
   */
  static setColor (color, target = 'all') {
    const targetHex = Luxafor._getTarget(target)
    Luxafor._write(COMMAND.color, targetHex, color, [0x00, 0x00, 0x00])
  }

  /**
   * Gradually change color with a given speed
   * @param {String} color The color to be set
   * @param {Number} [speed=20] The transition time
   * @param {String} [target='all'] Defines which LEDs to set (all, top, bottom, one, two, three, four, five, six)
   */
  static fadeTo (color, speed = 20, target = 'all') {
    const targetHex = Luxafor._getTarget(target)
    Luxafor._write(COMMAND.fadeTo, targetHex, color, [speed, 0x00, 0x00])
  }

  /**
   * Flash given color and return to previous state
   * @param {String} color Color to flash to
   * @param {Number} [speed=20] Flashing speed
   * @param {Number} [repeat=5] Number of repetitions
   * @param {String} [target='all'] Defines which LEDs to set (all, top, bottom, one, two, three, four, five, six)
   */
  static flash (color, speed = 20, repeat = 5, target = 'all') {
    const targetHex = Luxafor._getTarget(target)
    Luxafor._write(COMMAND.flash, targetHex, color, [speed, 0x00, repeat])
  }

  /**
   * Start a police pattern
   * @param {Number} [repeat=5] Number of repetitions
   */
  static police (repeat = 5) {
    Luxafor._writeRaw([COMMAND.police, 0x05, repeat])
  }

  /**
   * Start a rainbow pattern
   *  * @param {Number} [repeat=5] Number of repetitions
   */
  static rainbow (repeat = 5) {
    Luxafor._writeRaw([COMMAND.police, 0x08, repeat])
  }

  /**
   * Start a coloured wave and return to previous state
   * @param {String} color Color to start wave from
   * @param {Number} [type=1] Wave type
   * @param {Number} [speed=2] Wave speed
   * @param {Number} [repeat=5] Number of repetitions
   */
  static wave (color, type = 1, speed = 2, repeat = 5) {
    Luxafor._write(COMMAND.wave, type, color, [0x00, repeat, speed])
  }

  /**
   * Turn off all the LEDs
   */
  static off () {
    Luxafor.setColor('#000')
  }

  static _getTarget (target) {
    const targetHex =
      typeof target === 'number' && number < 7 ? target : TARGET[target]
    if (!targetHex) throw new Error(`Invalid target: ${target}`)
    return targetHex
  }

  static _write (command, target, color, options = []) {
    const [r, g, b] = parseColor(color).rgb
    const data = [command, target, r, g, b, ...options]
    console.log('data', data)
    Luxafor._writeRaw(data)
  }

  static _writeRaw (data) {
    Luxafor._getDevice()
    if (os.platform() === 'win32') {
      data.unshift(0)
    }

    if (!Luxafor._device) {
      throw new Error('No device available')
    }
    try {
      Luxafor._device.resume()
      Luxafor._device.write(data)
      Luxafor._device.pause()
    } catch (err) {
      Luxafor._device = null
      throw new Error (`Failed to write to device, because: ${err}`)
    }
  }

  static getDevices () {
    return HID.devices()
  }

  static _getDevice () {
    if (!Luxafor._device) {
      const path = HID.devices()
        .filter(({ product }) => product === 'LUXAFOR')
        .map(({ path }) => path)[0]
      Luxafor._device = path ? new HID.HID(path) : null
      if (Luxafor._device) Luxafor._device.pause()
    }
    return Luxafor._device
  }
}

VrpcAdapter.register(Luxafor)

function main () {
  try {
    const agent = VrpcAgent.fromCommandline()
    agent.serve()
  } catch (err) {
    console.log('VRPC triggered an unexpected error', err)
  }
}

main()
