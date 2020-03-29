const express = require('express')
const router = express.Router()
const db = require('../../database/sql/database-interface')
const resources = '../test' //change to the /resources folder for the full database
const {protected , nonUser} = require('../middlewares/authentication')
const bcrypt = require('../controllers/bcrypt/bcrypt').hash

/*

still need to add sanitization




*/


router.get('/test-endpoint', async (req,res) => {
    try {
        await db.createConnection()
        const result = await db.showTables()
        console.log(result)
        let html = ""
        for (obj of result) {
            html = `${html} ${Object.values(obj)}`
        }
        res.send(`test endpoint works for database. Tables: ${html}`)
    } catch (error) {
        console.log(error)
    } finally {
        db.closeConnection()
    }
})


/**
 * note that the database functions themselves return promises
 * except for db.createDatabase(), none of them open the connection or close the connection themselves... you must do that here
 */
router.get('/createDB', async (req, res, next) => {
    try {
        db.createDatabase("project_sunshine")
    } catch (error) {
        throw error
    } finally {
        res.send("check heroku logs")
        db.closeConnection()
    }
})

//ADMIN ENDPOINT - ADMINS ONLY
//THIS TAKES A LONG TIME TO EXECUTE 15~20 MINUTES
router.get('/reset/resetDatabase', async (req, res, next) => {
    try {
        await db.createConnection()
        //takes path to directory of resources, do not enter filenames
        const result = await db.resetDatabase(resources)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        db.closeConnection()
    }
})


router.get('/reset/resetTestEnvironment', async (req, res, next) => {
    try {
        await db.createConnection()
        //takes path to directory of resources, do not enter filenames
        await db.resetDatabase(resources)

        let pass = await bcrypt('admin')

        await db.createUser('parsa', 'parsa', 'parsa@admin.com', pass, 'vancouver')
        await db.createUser('justin', 'justin', 'justin@admin.com', pass, 'vancouver')
        await db.createUser('dmitry', 'dmitry', 'dmitry@admin.com', pass, 'vancouver')
        await db.createUser('gurmeet', 'gurmeet', 'gurmeet@admin.com', pass, 'vancouver')

        await db.createUserPreferences(1, 1000, 3, 10, 25)
        await db.createUserPreferences(2, 1000, 3, 10, 25)
        await db.createUserPreferences(3, 1000, 3, 10, 25)
        await db.createUserPreferences(4, 1000, 3, 10, 25)

        await db.createUserPreferredDestinations(1, 'CUN', 500)
        await db.createUserPreferredDestinations(1, 'LAX', 400)
        await db.createUserPreferredDestinations(1, 'TYO', 300)
        await db.createUserPreferredDestinations(1, 'PAR', 600)
        await db.createUserPreferredDestinations(1, 'MIA', 200)

        await db.createUserPreferredDestinations(2, 'CUN', 500)
        await db.createUserPreferredDestinations(2, 'LAX', 400)
        await db.createUserPreferredDestinations(2, 'TYO', 600)
        await db.createUserPreferredDestinations(2, 'PAR', 300)
        await db.createUserPreferredDestinations(2, 'MIA', 200)

        await db.createUserPreferredDestinations(3, 'CUN', 500)
        await db.createUserPreferredDestinations(3, 'LAX', 400)
        await db.createUserPreferredDestinations(3, 'TYO', 300)
        await db.createUserPreferredDestinations(3, 'PAR', 200)
        await db.createUserPreferredDestinations(3, 'MIA', 600)

        await db.createUserPreferredDestinations(4, 'CUN', 500)
        await db.createUserPreferredDestinations(4, 'LAX', 600)
        await db.createUserPreferredDestinations(4, 'TYO', 300)
        await db.createUserPreferredDestinations(4, 'PAR', 400)
        await db.createUserPreferredDestinations(4, 'MIA', 200)

    } catch (error) {
        throw error
    } finally {
        await db.closeConnection()
        res.send('test environment up')
    }
})


router.get('/getUsers', async (req, res, next) => {
    //access by passing in querystring like: 'http://localhost:3000/database/getUserPreferredDestinations/?selectBy=foo&searchBy=bar'
    const selectBy = req.query.selectBy
    const searchBy = req.query.searchBy
    console.log(`selectBy: ${selectBy}`)
    console.log(`searchBy: ${searchBy}`)

    try {
        await db.createConnection()
        const result = await db.getUsers(selectBy, searchBy)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        
        db.closeConnection()
    }
})

router.get('/getUserPreferences', async (req, res, next) => {
    const selectBy = req.query.selectBy
    const searchBy = req.query.searchBy

    try {
        await db.createConnection()
        const result = await db.getUserPreferences(selectBy, searchBy)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        db.closeConnection()
    }
})

router.get('/getUserPreferredDestinations', async (req, res, next) => {
    const selectBy = req.query.selectBy
    const searchBy = req.query.searchBy

    try {
        await db.createConnection()
        const result = await db.getUserPreferredDestinations(selectBy, searchBy)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        db.closeConnection()
    }
})

router.get('/getCities', async (req, res, next) => {
    const selectBy = req.query.selectBy
    const searchBy = req.query.searchBy
    try {
        await db.createConnection()
        const result = await db.getCities(selectBy, searchBy)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        db.closeConnection()
    }
    
})

router.get('/getListOfAirports', async (req, res, next) => {
    const selectBy = req.query.selectBy
    const searchBy = req.query.searchBy
    try {
        await db.createConnection()
        const result = await db.getListOfAirports(selectBy, searchBy)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        db.closeConnection()
    }
})


module.exports = router