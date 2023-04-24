const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("to_electron", {
  async getInstalledSoftwares (arg1, arg2) {
    return await ipcRenderer.invoke("getInstalledSoftwares", arg1, arg2)
  },
  async connectVPN (arg1, arg2) {
    console.log("OPENVPN",)
    return await ipcRenderer.invoke("connectVPN", arg1, arg2)
  },

  async enCryptPin (arg1,arg2) {
    return await ipcRenderer.invoke("enCryptPin", arg1, arg2)
  },

  async deCryptPin (arg1,arg2) {
    return await ipcRenderer.invoke("deCryptPin", arg1, arg2)
  }

});
