const express = require('express')
const router = express.Router()
const authUserRedirect = require('../../modules/authentication').authedUserRedirect
const signUpUser = require('../../modules/signup-and-login').signUpUser

router.get('/', authUserRedirect, (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang='en'>
    
    <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <meta http-equiv='X-UA-Compatible' content='ie=edge'>
      <link href='/style' rel='stylesheet'>
      <title>Sign In</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    </head>
    
    <body>
        <div class='signup-form'>
            <h1>Sign Up 👤</h1>
                <form method='post' action='/signup'>
                    <input type='text' placeholder='Username' name='userName' required>
                    <input type='text' placeholder='Email' name='email' required>
                    <input type='text' placeholder='Password' name='password' required>
                    <input type='text' placeholder='Profile Picture Link' name='profilePictureLink'>
                    <button class='login' type='submit'>Signup</button>
                </form>
            </div>
    
        <div class='login-form'>
        <h1>Sign In 👤</h1>
            <form method='post' action='/login'>
                <input type='text' placeholder='Email' name='email' required>
                <input type='text' placeholder='Password' name='password' required>
                <button class='login' type='submit'>Login</button>
            </form>
        </div>
    </body>
    
    </html>`)
    //res.render('signup-page')
})

router.post('/', authUserRedirect, async (req, res) => {
    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password
    const profilePictureLink = req.body.profilePictureLink
    
    if(userName && email && password) {
        if(profilePictureLink) {
            await signUpUser(userName, email, password, profilePictureLink)
        } else {
            await signUpUser(userName, email, password)
        }
        res.redirect('/')
    } else {
        res.send("Error!")
    }
})

module.exports = router