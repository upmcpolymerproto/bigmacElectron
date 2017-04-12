# comit-electron

This repository contains all the files needed to run and package an Electron application containing ComitUI.


## Installation

This module requires Node.js 4.0 or higher to run.

```
npm install
```

## Usage

Running ComitUI in Electron without packaging is as simple as:

```
npm start
```

To package this Electron application as an .exe, .dmg, etc...:

```
npm run pack
```

This will automatically detect the appropriate settings for your system. If you would like to configure these settings, you can add to the build options for electron-packager by editing the "pack" script in package.json. See [here](https://github.com/electron-userland/electron-packager/blob/master/usage.txt) for available command line options and documentation for electron-packager.