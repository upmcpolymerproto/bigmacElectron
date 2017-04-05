'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
	  'width': 1800, 
	  'height': 900, 
	  'webPreferences': {
		  'nodeIntegration': false
	  }
	});
  mainWindow.loadURL("http://localhost:8080");

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    // Dereference the window object
    mainWindow = null;
  });
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
