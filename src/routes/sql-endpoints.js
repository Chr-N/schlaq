const express = require('express')
const router = express.Router()
const db = require('../sql/mysql-interface')
const resources = null //'../sql/resources' //load whatever resources from resources

const hash = require('../modules/bcrypt').hashFunction

const databaseName = "slack_clone"




router.get('/test', async (req,res) => {
    try {
        await db.createConnection()
        const result = await db.showTables()
        console.log(result)
        let tables = ""
        for (obj of result) {
            tables = `${tables} ${Object.values(obj)}`
        }
        res.send(`test endpoint works for database. Tables: ${tables}`)
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
        await db.createDatabase(databaseName)
    } catch (error) {
        throw error
    } finally {
        res.send("finished. check logs")
        await db.closeConnection()
    }
})

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
        await db.closeConnection()
    }
})

router.get('/reset/resetToTestEnvironment', async (req, res, next) => {
    try {
        await db.createConnection()
        //takes path to directory of resources, do not enter filenames
        await db.resetDatabase(resources)
        const password = await hash('password')

        await db.createUser("timothy", "timothy@test.com", password)
        await db.createUser("chris", "chris@admin.com", password)
        await db.createUser("justin", "justin@admin.com", password)

    } catch (error) {
        throw error
    } finally {
        await db.closeConnection()
        res.send('test environment up')
    }
})


router.get('/getUsers', async (req, res, next) => {
    //access by passing in querystring like: 'http://localhost:3000/database/getUsers/?selectBy=foo&searchBy=bar'
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
        await db.closeConnection()
    }
})

router.get('/getWorkspaces', async (req, res, next) => {
    const selectBy = req.query.selectBy
    const searchBy = req.query.searchBy
    console.log(`selectBy: ${selectBy}`)
    console.log(`searchBy: ${searchBy}`)

    try {
        await db.createConnection()
        const result = await db.getWorkspaces(selectBy, searchBy)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        await db.closeConnection()
    }
})

router.get('/getUserWorkspaces', async (req, res, next) => {
    const selectBy = req.query.selectBy
    const searchBy = req.query.searchBy
    console.log(`selectBy: ${selectBy}`)
    console.log(`searchBy: ${searchBy}`)

    try {
        await db.createConnection()
        const result = await db.getUserWorkspaces(selectBy, searchBy)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        await db.closeConnection()
    }
})

router.get('/getChannels', async (req, res, next) => {
    const selectBy = req.query.selectBy
    const searchBy = req.query.searchBy
    console.log(`selectBy: ${selectBy}`)
    console.log(`searchBy: ${searchBy}`)

    try {
        await db.createConnection()
        const result = await db.getChannels(selectBy, searchBy)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        await db.closeConnection()
    }
})

router.get('/getPosts', async (req, res, next) => {
    const selectBy = req.query.selectBy
    const searchBy = req.query.searchBy
    console.log(`selectBy: ${selectBy}`)
    console.log(`searchBy: ${searchBy}`)

    try {
        await db.createConnection()
        const result = await db.getPosts(selectBy, searchBy)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        await db.closeConnection()
    }
})

router.get('/getComments', async (req, res, next) => {
    const selectBy = req.query.selectBy
    const searchBy = req.query.searchBy
    console.log(`selectBy: ${selectBy}`)
    console.log(`searchBy: ${searchBy}`)

    try {
        await db.createConnection()
        const result = await db.getComments(selectBy, searchBy)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        await db.closeConnection()
    }
})

router.get('/getDirectMessages', async (req, res, next) => {
    const selectBy = req.query.selectBy
    const searchBy = req.query.searchBy
    console.log(`selectBy: ${selectBy}`)
    console.log(`searchBy: ${searchBy}`)

    try {
        await db.createConnection()
        const result = await db.getDirectMessages(selectBy, searchBy)
        console.log(result)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        await db.closeConnection()
    }
})

module.exports = router