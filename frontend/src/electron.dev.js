const { app, BrowserWindow } = require('electron');
const url = require('url');

let win;

const createWindow = () => {
  setTimeout(() => {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: './src/favicon.ico',
      autoHideMenuBar: true,
    });

    win.loadURL(url.format({
      pathname: 'localhost:4200',
      protocol: 'http:',
      slashes: true
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
      win = null;
    });
  }, 10000);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});