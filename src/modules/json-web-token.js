const jwt = require('jsonwebtoken')

createNewToken = (content) => {
    require('dotenv').config()
    const key = process.env.JWT_SECRET || "gangstahsecret"
    console.log(key)
    return new Promise((resolve, reject) => {
        if(content) {
            if (typeof content == 'object') {
                jwt.sign(content, key, (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                })
            } else {
                reject(new Error("Content must be of type object."))
            }
        } else {
            reject(new Error("Content must exist."))
        }
    })
}

verifyExistingToken = (token) => {
    require('dotenv').config()
    const key = process.env.JWT_SECRET || "gangstahsecret"
    return new Promise((resolve, reject) => {
        if(token) {
            jwt.verify(token, key, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        } else {
            reject(new Error("No token found. Please pass token as argument."))
        }
    })
}

module.exports = {
    createNewToken,
    verifyExistingToken
}