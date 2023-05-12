const { ipcMain } = require("electron")
const { getAllInstalledSoftware} = require("fetch-installed-software")

module.exports={
    getInstalledSoftwares:ipcMain.handle("getInstalledSoftwares",(e,arg1,arg2) => {
       return getAllInstalledSoftware()
    })
}