
const {getInstalledSoftwares} = require("./folder")
const {connectVPN} = require("./openvpn")
const {enCryptPin,deCryptPin} = require("./encrypt")


module.exports={
    getInstalledSoftwares,
    connectVPN,
    enCryptPin,
    deCryptPin
}