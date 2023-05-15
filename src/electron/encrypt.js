const { ipcMain } = require("electron")
var aes256 = require('aes256');

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

const key = '9427bfe5b2a07ddfbdc30a254f44fd09bdd216c6ab1b37738c5758e4fa4d114d';
const iv = '59ec1871179215f16986aa4e4092cda8';
const enCryptPin = (pin) => {
// var encryptedPlainText = aes256.encrypt(key, pin);
// return encryptedPlainText
let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key,'hex'), Buffer.from(iv, 'hex'));
let encrypted = cipher.update(pin);
encrypted = Buffer.concat([encrypted, cipher.final()]);
return encrypted.toString('hex');
}

const deCryptPin = (pin) => {
// var decryptedPlainText = aes256.decrypt(key, pin);
// return decryptedPlainText
let ivk = Buffer.from(iv, 'hex');
let encryptedText = Buffer.from(pin, 'hex');
let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key,'hex'), ivk);
let decrypted = decipher.update(encryptedText);
decrypted = Buffer.concat([decrypted, decipher.final()]);
return decrypted.toString();
}


module.exports={
    enCryptPin:ipcMain.handle("enCryptPin",(e,arg1,arg2) => {
       return enCryptPin(arg1,arg2)
    }),
    deCryptPin:ipcMain.handle("deCryptPin",(e,arg1,arg2) => {
       return deCryptPin(arg1,arg2)
    })
}


