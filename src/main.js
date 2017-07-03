const electron = require('electron');
const path = require('path');

const app = electron.app;

let tray;

const WindowManager = (function () {
  let popup;

  const createPopupWindow = () => {
    const popupWindow = new electron.BrowserWindow({
      width: 300,
      height: 350,
      show: false,
      frame: false,
      resizable: false,
    });
    popupWindow.loadURL(`file://${__dirname}/index.html`);
    popupWindow.hide();
    return popupWindow;
  };
  const showPopupWindow = () => {
    const trayPos = tray.getBounds();
    const windowPos = popup.getBounds();
    let x = 0;
    let y = 0;

    if (process.platform === 'darwin') {
      x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2));
      y = Math.round(trayPos.y + trayPos.height);
    } else {
      x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2));
      y = Math.round(trayPos.y + trayPos.height * 10);
    }

    popup.setPosition(x, y, false);
    popup.show();
    popup.focus();
  };
  return {
    init: () => {
      if (!popup) {
        popup = createPopupWindow();
      }
    },
    toggleWindow: () => {
      if (popup.isVisible()) {
        popup.hide();
      } else {
        showPopupWindow();
      }
    },
  };
}());

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  tray = new electron.Tray(path.join(__dirname, 'img', 'icon.png'));
  WindowManager.init();
  tray.on('click', (event) => {
    WindowManager.toggleWindow();
  });
});
