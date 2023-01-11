# Luxafor Agent

Provides access to luxafor devices

## Starting instructions

### Linux

The Luxafor agent must have the rights to access the USB port.

Under Linux you can achieve that by starting the application using `sudo`.
Note that you have to provide the absolute path to the executable in that case.

You can find out the path using:

```bash
which node
```

Example:

```bash
sudo /home/bheisen/.nvm/versions/node/v16.15.1/bin/node index.js -a 'Luxafor Agent' -d <domain>
```

You can then try out your device using [vrpc.io](https://live.vrpc.io)

Hint:

Depending on your OS the `node-hid` library may needs to be build and can not
survive with the pre-packed binaries. If that's the case install this package with

```bash
npm install --build-from-source
```

### Windows

Make sure you have installed node, that's all you need!

```bash
node index.js - a 'Luxafor Agent' -d <domain>
```

## Integration to Heisenware's App Builder

Example:

```bash
node index.js -a 'Luxafor Agent' -d <domain> -t <token> -b mqtts://heisenware.rocks --bestEffort
```

You will then see the device directly in the Connectivity list.
