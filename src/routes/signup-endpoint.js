const express = require('express')
const router = express.Router()
const authUserRedirect = require('../modules/authentication').authedUserRedirect
const signUpUser = require('../modules/signup-and-login').signUpUser

router.get('/', authUserRedirect, (req, res) => {
    res.send("Please sign up now.")
    //res.render('signup-page')
})

router.post('/', authUserRedirect, (req, res) => {
    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password
    const profilePictureLink = req.body.profilePictureLink
    
    if(userName && email && password) {
        if(profilePictureLink) {
            signUpUser(userName, email, password, profilePictureLink)
        } else {
            signUpUser(userName, email, password)
        }
    } else {
        res.send("Error!")
    }
})

module.exports = router