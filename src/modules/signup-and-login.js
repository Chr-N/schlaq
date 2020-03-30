const db = require('../sql/mysql-interface')
const hash = require('./bcrypt').hashFunction
const compare = require('./bcrypt').compareHashAndPassword

const signUpUser = (user_name, email, password, profile_picture_link = null) => {
    return new Promise((resolve, reject) => {
        //check to see if email (which is a unique alternate key) already taken
        emailAlreadyExist(email)
        .then(() => {
            return hash(password)
        })
        .then(async (hashedPassword) => {
            try {
                await db.createConnection()
                const newUser = await db.createUser(user_name, email, hashedPassword, profile_picture_link)
                //confirmation message from db.createUser   -->  now go create token
                resolve(newUser)
            } catch (error) {
                //problem creating user
                reject(error)
            } finally {
                //always close the connection.
                await db.closeConnection()
            }
        })
    })
}

const loginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        const crypticUsernamePasswordError = "Incorrect username and password combination. Who knows what the issue is. ¯\_(ツ)_/¯"
        try {
            //find the user by email
            await db.createConnection()
            const emailMatch = await db.getUsers(undefined, `WHERE email = '${email}'`)
            console.log(emailMatch)
            if (emailMatch && Array.isArray(emailMatch) && emailMatch.length > 0) {
                //user confirmed, then try password
                compare(password, emailMatch[0].password_hash)
                    .then((message) => {
                        console.log(message)
                        //resolve the user object
                        resolve(emailMatch[0])
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(crypticUsernamePasswordError)
                    })
            } else {
                reject(crypticUsernamePasswordError)
            }
        } catch(error) {
            //error with db.getUsers
            reject(error)
        } finally {
            await db.closeConnection()
        }
    })
}

const emailAlreadyExist = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.createConnection()
            const emailMatch = await db.getUsers("email", `WHERE email = '${email}'`)
            //console.log(emailMatch)
            if (emailMatch && Array.isArray(emailMatch) && emailMatch.length > 0) {
                reject (new Error('Email already taken.'))
            } else {
                resolve('Email good to use.')
            }
        } catch(error) {
            //error with db.getUsers
            reject(error)
        } finally {
            await db.closeConnection()
        }
    })
}

// loginUser('justin@admin.com', 'password')
//     .then((message) => console.log(message))
//     .catch((error) => console.log(error))

// emailAlreadyExist("justin@admin.com")
//     .catch(error => console.log(error))

// signUpUser("madeon", "madeon@edm.com", "edm")
//     .then((message) => console.log(message))
//     .catch((error) => console.log(error))

module.exports = {
    signUpUser,
    loginUser
}