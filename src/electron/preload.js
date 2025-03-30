const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getData: (callback) =>
    ipcRenderer.on("system-stats", (_, data) => {
      callback(data);
    }),
  getStaticData: () => ipcRenderer.invoke("static-data"),
});
