const { ipcMain } = require("electron")
var aes256 = require('aes256');

const enCryptPin = (key,pin) => {
    // var key = 'my passphrase';
// var pin = 'my plaintext message';
var buffer = Buffer.from(pin);
var encryptedPlainText = aes256.encrypt(key, pin);
return encryptedPlainText
}

const deCryptPin = (key,pin) => {
    // var key = 'my passphrase';
// var pin = 'my plaintext message';
var buffer = Buffer.from(pin);
var decryptedPlainText = aes256.decrypt(key, pin);
return decryptedPlainText
}


module.exports={
    enCryptPin:ipcMain.handle("enCryptPin",(e,arg1,arg2) => {
       return enCryptPin(arg1,arg2)
    }),
    deCryptPin:ipcMain.handle("deCryptPin",(e,arg1,arg2) => {
       return deCryptPin(arg1,arg2)
    })
}


