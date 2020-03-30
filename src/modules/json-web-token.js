const jwt = require('jsonwebtoken')

createNewToken = (content) => {
    return new Promise((resolve, reject) => {
        if(content) {
            if (typeof content == 'object') {
                jwt.sign(JSON.stringify(content), process.env.JWT_SECRET, (error, result) => {
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
    return new Promise((resolve, reject) => {
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
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