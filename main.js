const { app, BrowserWindow,ipcMain, Menu } = require('electron')
// const { width, height } = screen.getPrimaryDisplay().workAreaSize;
const url = require('url')
const path = require('path')
const createWindow = () => {
  const win = new BrowserWindow({
    width: '80vh',
    height: '95vh',
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
  })
  const mainMenu = Menu.buildFromTemplate([{
    label:"Quit",
    accelerator: process.platform == 'darwin'?'command+Q':'Ctrl+Q',
    click(){
      app.quit();
    }
  }]);
Menu.setApplicationMenu(mainMenu);
  ipcMain.handle('ping', () => 'pong')
  win.loadFile('./src/index.html')
  
}

app.whenReady().then(() => {
  // const displays = screen.getAllDisplays()
  // console.log('ele ',displays
  // )

  createWindow()
})