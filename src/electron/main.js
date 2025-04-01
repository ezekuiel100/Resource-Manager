import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import { getStaticData, resources } from "./resourceManager.js";
import { createMenu } from "./menu.js";

// Menu.setApplicationMenu(null);  remove menu

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(app.getAppPath(), "src/electron/preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5123");
  } else {
    win.loadFile(path.join(app.getAppPath(), "dist/index.html"));
  }

  resources(win);
  ipcMain.handle("static-data", async () => {
    return getStaticData();
  });
}

app.whenReady().then(() => {
  createWindow();
  createMenu();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
