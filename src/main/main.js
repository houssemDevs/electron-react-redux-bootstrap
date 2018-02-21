const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const dev = process.env.ELECTRON_WEBPACK_APP_DEV;

let mainHtml = 'index.html';

if(dev) {
    mainHtml = 'http://localhost:9080/index.html';
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWin;

function createWindow() {
  // Create the browser window.
  mainWin = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  mainWin.loadURL(mainHtml);

  // Open the DevTools.
  if(dev) {
      installDevtools();
      mainWin.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWin.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWin = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function installDevtools() {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
  } = require('electron-devtools-installer');

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added extension ${name}`))
    .catch(err => console.log(`Error adding extension ${err}`));
  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added extension ${name}`))
    .catch(err => console.log(`Error adding extension ${err}`));
}
