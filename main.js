'use strict';

const electron = require('electron');
const windowStateKeeper = require('electron-window-state');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow () {

  let windowState = windowStateKeeper({
    defaultWidth: 1600,
    defaultHeight: 900
  });

  mainWindow = new BrowserWindow({
	  'x': windowState.x, 
	  'y': windowState.y, 
    'width': windowState.width,
    'height': windowState.height,
    'frame': false,
    'webPreferences': {
      'nodeIntegration': true,
      'webSecurity': false
    }
	});

  mainWindow.loadURL("http://localhost:8080");

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    // Dereference the window object
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', function(e, reqUrl) {
    let getHost = url=>require('url').parse(url).host;
    let reqHost = getHost(reqUrl);
    let isExternal = reqHost && reqHost != getHost(mainWindow.webContents.getURL());
    if(isExternal) {
      e.preventDefault();
      const remote = require('electron').remote;
      var authWindow = new BrowserWindow({ 
        'width': 800, 
        'height': 600,
        'frame': false,
        'webPreferences': {
          'nodeIntegration': false,
          'webSecurity': false
        }
      });
      authWindow.loadURL(reqUrl);
      e.newGuest = authWindow;
      authWindow.focus();
    }
  });

  windowState.manage(mainWindow);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if(mainWindow.isDevToolsOpened()) {
	mainWindow.closeDevTools();
  }
  app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
