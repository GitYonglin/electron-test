import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line
import path from 'path';
const fs = require('fs');
const net = require('net');

// 创建TCP客户端
const Client = new net.Socket();
Client.setEncoding('utf8');
Client.connect(502, '192.168.181.101');
// 监听返回数据
Client.on('data', () => {
});
// 监听与服务端连接的错误事件
Client.on('error', () => {
  Client.destroy();
});

ipcMain.on('open', () => {
  Client.write(':01050500FF00F6\r\n');
});

ipcMain.on('cloce', () => {
  Client.write(':010505000000F5\r\n');
});

ipcMain.on('file', (event, filePath) => {
  // const newfilepath = `${path.join(app.getPath('userData'), `/${path.basename(filePath)}`)}`;
  const newfilepath = `${path.join(__static, `/${path.basename(filePath)}`)}`;
  console.log('文件保存路径', `源文件路径：${filePath}`, `保存文件路径：${newfilepath}`);
  console.log(path.join(__static));
  // 保存文件
  fs.writeFileSync(path.basename(filePath), fs.readFileSync(filePath));
  // fs.writeFileSync(newfilepath, fs.readFileSync(filePath));
  // nodejs 8.5.0之后添加的方法
  // fs.copyFile(filePath, path.join(app.getPath('userData'),
  //  `/${path.basename(filePath)}`), (err) => {
  //   if (err) throw err;
  //   console.log('source.txt was copied to destination.txt');
  // });
});
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
