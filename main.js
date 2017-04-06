'use strict';

const electron = require('electron');
const windowStateKeeper = require('electron-window-state');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow () {

  let windowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
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
