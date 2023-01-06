# Luxafor Agent

Provides access to luxafor devices

## Starting instructions

The Luxafor agent must have the rights to access the USB port.

Under Linux you can achieve that by starting the application using `sudo`.
Note that you have to provide the absolute path to the executable in that case.

Example:

```bash
sudo /home/bheisen/.nvm/versions/node/v16.15.1/bin/node index.js -a 'Luxafor Agent' -d <domain>
```

You can then try out your device using [vrpc.io](https://live.vrpc.io)

## Integration to Heisenware's App Builder

Example:

```bash
sudo /home/bheisen/.nvm/versions/node/v16.15.1/bin/node index.js -a 'Luxafor Agent' -d <domain> -t <token> -b mqtts://heisenware.rocks --bestEffort
```

You will then see the device directly in the Connectivity list.
