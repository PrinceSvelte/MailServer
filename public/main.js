const { app, BrowserWindow} = require("electron");
app.commandLine.appendSwitch('ignore-certificate-errors')
// const {
//   default: installExtension,
//   REDUX_DEVTOOLS,
// } = require("electron-devtools-installer");
// try {
// 	require('electron-reloader')(module);
// } catch {}
const path = require("path");
const isDev = require("electron-is-dev");
require("../src/electron/index");



// let dirpath = path.join(os.homedir(), "Desktop");
// let watcher = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
  // watcher.close();
} // NEW

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      webviewTag: true
    }
  });

  // const view = new BrowserView()
  // win.setBrowserView(view)
  // view.setBounds({ x: 0, y: 0, width: 600, height: 600 })
  // view.webContents.loadURL('https://mail.waharat.com/mail/')



  //load the index.html from a url
  // win.loadURL("http://localhost:3000");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  // win.webContents.openDevTools();
  win.maximize();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  
  }
});
