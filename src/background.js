"use strict";
import { app, protocol, BrowserWindow, ipcMain } from "electron";
import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
import path from "path";
const isDevelopment = process.env.NODE_ENV !== "production";

const electron = require("electron");
const Tray = electron.Tray;
const Menu = electron.Menu;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(["app"], { secure: true });
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    title: "CloudMusic",
    minWidth: 1600,
    minHeight: 670,
    width: 1000,
    height: 670,
    frame: false,
    show: false
    // resizable: false
  });

  if (isDevelopment || process.env.IS_TEST) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
  //退出
  ipcMain.on("window-all-closed", () => {
    win.hide();
    //app.quit();
  });
  //小化
  ipcMain.on("hide-window", () => {
    win.minimize();
  });
  //切换窗口大小
  ipcMain.on("toggle-window", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    //await installVueDevtools();
  }
  createWindow();
  /* eslint-disable no-undef */
  let tray = new Tray(path.join(__static, "msic.ico"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "主界面",
      click() {
        win.show();
      }
    },
    {
      label: "播放/暂停",
      click() {
        win.webContents.send("control", "playToggle");
      }
    },
    {
      label: "上一首",
      click() {
        win.webContents.send("control", "playPrevSong");
      }
    },
    {
      label: "下一首",
      click() {
        win.webContents.send("control", "playNextSong");
      }
    },
    {
      label: "关于",
      click() {
        shell.openExternal("https://github.com/MeedFine/ElectronMusic");
      }
    },
    {
      label: "退出",
      click() {
        app.quit();
      }
    }
  ]);
  tray.setToolTip("Cloud Music");
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    win.show();
    win.setSkipTaskbar(false);
  });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
