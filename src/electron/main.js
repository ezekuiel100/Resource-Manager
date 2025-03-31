import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getStaticData, resources } from "./resourceManager.js";
import { createMenu } from "./menu.js";

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
    console.log("Janela carregada com sucesso ");
  } else {
    win.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
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
