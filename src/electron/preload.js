const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getData: () =>
    ipcRenderer.on("system-stats", (_, data) => {
      console.log(data);
    }),
  getStaticData: () => ipcRenderer.invoke("static-data"),
});
