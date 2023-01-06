const { VrpcAdapter, VrpcAgent } = require('vrpc')
const Luxafor = require('./src/Luxafor')

VrpcAdapter.register(Luxafor, { jsdocPath: './src/Luxafor.js' })

function main () {
  try {
    const agent = VrpcAgent.fromCommandline()
    agent.serve()
  } catch (err) {
    console.log('VRPC triggered an unexpected error', err)
  }
}

main()
