import { app, Menu } from "electron";

export function createMenu() {
  const menu = Menu.buildFromTemplate([
    {
      label: "App",
      type: "submenu",
      submenu: [
        {
          label: "Quit",
          click: app.quit,
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
}
