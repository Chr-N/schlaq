const verify = require('./json-web-token').verifyExistingToken

const protectedRoute = (req, res, next) => {
    //if token exists
    if(req.cookies && req.cookies.token) {
        verify(req.cookies.token)
            .then((user) => {
                //bind user to request object
                req.user = user
                next()
            })
            .catch((error) => {
                console.log(error)
                res.redirect('/login')
            })
    } else {
        //authentication failed
        res.redirect('/login')
    }       
}

const authedUserRedirect = (req, res, next) => {
    //if a user has a token, redirect them to the index page
    if(req.cookies && req.cookies.token) {
        verify(req.cookies.token)
            .then((user) => {
                console.log(user)
                res.redirect('/')
            })
            //if error, log error and do nothing
            .catch((error) => {
                console.log(error)
                next()
            })
    } else {
        //if no token, do nothing.
        next()
    }
}

module.exports = {
    protectedRoute,
    authedUserRedirect
}