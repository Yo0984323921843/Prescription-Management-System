const { app, BrowserWindow,ipcMain } = require('electron')
// const { width, height } = screen.getPrimaryDisplay().workAreaSize;
const url = require('url')
const path = require('path')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
  })
  const mainMenu = Menu.buildFromTemplate([{}]);
Menu.setApplicationMenu(mainMenu);
  ipcMain.handle('ping', () => 'pong')
  win.loadFile('./renderer/index.html')
  
}

app.whenReady().then(() => {
  // const displays = screen.getAllDisplays()
  // console.log('ele ',displays
  // )

  createWindow()
})