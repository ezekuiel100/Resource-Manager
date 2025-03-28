import { app, BrowserWindow } from "electron";
import path from "path";
import { resources } from "./resourceManager.js";

//cpu, ram, storage

function createWindow() {
  const win = new BrowserWindow({});

  resources();
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5123");
  } else {
    win.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
