const express = require('express')
const router = express.Router()
const authUserRedirect = require('../modules/authentication').authedUserRedirect
const createNewToken = require('../modules/json-web-token').createNewToken
const loginUser = require('../modules/signup-and-login').loginUser

const milliSecondsPerDay = 86400000

router.get('/', authUserRedirect, (req, res) => {
    res.send('login please')
    //res.render('login page')
})

router.post('/', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if(email && password) {
        loginUser(email, password)
            .then((user) => {
                return createNewToken({...user})
            })
            .then((token) => {
                res.cookie('token', token, { maxAge: milliSecondsPerDay })
            })
            .then(() => {
                res.redirect('/')
            })
            .catch((error) => {
                console.log(error)
                res.send(error)
            })
    } else {
        res.redirect('/login')
    }
})

module.exports = router