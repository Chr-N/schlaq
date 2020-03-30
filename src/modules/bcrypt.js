const bcrypt = require('bcrypt');

const defaultSaltRounds = 12

const hashFunction = (password) => {
    return new Promise((resolve,reject) => {
        bcrypt.hash(password, defaultSaltRounds, (error, result) => {
            if(error){
                reject(error)
            } else {
                resolve(result)
            }
        });
    })
}
const compareHashAndPassword = (password , password_hash) => {
    return new Promise((resolve , reject) => {
        bcrypt.compare(password, password_hash, (error, result) => {
           if(error) {
                reject(error)
           } else {
                resolve(result)
           }
        });
    })
}

module.exports = {
    hashFunction,
    compareHashAndPassword
}