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
        res.send(error)
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

        await db.createWorkspace('FSWD', 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0015-44.png', 1)
        await db.createWorkspace('Armaan', 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0015-44.png', 1)
        await db.createWorkspace('Meech', 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0015-44.png', 1)

        await db.createUserWorkspace(1, 1)
        await db.createUserWorkspace(1, 2)
        await db.createUserWorkspace(1, 3)
        await db.createUserWorkspace(2, 1)
        await db.createUserWorkspace(2, 2)
        await db.createUserWorkspace(2, 3)
        await db.createUserWorkspace(3, 1)
        await db.createUserWorkspace(3, 2)
        await db.createUserWorkspace(3, 3)

        await db.createChannel('general', 1, 1)
        await db.createChannel('random', 1, 2)
        await db.createChannel('questions', 1, 3)
        await db.createChannel('announcements', 1, 4)
        await db.createChannel('discussion', 1, 5)
        await db.createChannel('more random', 1, 6)
        await db.createChannel('general', 2, 7)
        await db.createChannel('random', 2, 8)
        await db.createChannel('armaan', 2, 9)
        await db.createChannel('announcements', 2, 10)
        await db.createChannel('discussion', 2, 11)
        await db.createChannel('more random', 2, 12)
        await db.createChannel('general', 3, 13)
        await db.createChannel('sam', 3, 14)
        await db.createChannel('questions', 3, 15)
        await db.createChannel('announcements', 3, 16)
        await db.createChannel('discussion', 3, 17)
        await db.createChannel('more random', 3, 18)

        await db.createPost(1, 1, 'The quick brown fox jumped over the lazy dog')
        await db.createPost(2, 1, 'Lorem')
        await db.createPost(2, 1, 'Ipsum')
        await db.createPost(2, 1, 'Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Amet nulla facilisi morbi tempus iaculis. Dui ut ornare lectus sit amet est. Pharetra vel turpis nunc eget lorem dolor sed viverra. Tristique magna sit amet purus gravida quis blandit turpis cursus. Mauris vitae ultricies leo integer. Mauris nunc congue nisi vitae suscipit tellus mauris. Ultricies lacus sed turpis tincidunt id. Suspendisse interdum consectetur libero id faucibus nisl tincidunt. Id diam maecenas ultricies mi eget. Vel risus commodo viverra maecenas accumsan lacus vel. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. At quis risus sed vulputate odio ut. Ac auctor augue mauris augue. Dignissim convallis aenean et tortor at risus. Commodo ullamcorper a lacus vestibulum sed arcu non.')
        await db.createPost(1, 1, 'Robust barista chicory mocha cultivar doppio strong espresso skinny. To go, caramelization, plunger pot coffee dark cappuccino sweet latte irish half and half variety. Frappuccino foam arabica steamed cream aromatic extraction. Con panna eu cinnamon, galão chicory, roast black brewed dripper brewed.')
        await db.createPost(1, 2, 'Robust barista chicory mocha cultivar doppio strong espresso skinny. To go, caramelization, plunger pot coffee dark cappuccino sweet latte irish half and half variety. Frappuccino foam arabica steamed cream aromatic extraction. Con panna eu cinnamon, galão chicory, roast black brewed dripper brewed.')
        await db.createPost(2, 2, 'Robust barista chicory mocha cultivar doppio strong espresso skinny. To go, caramelization, plunger pot coffee dark cappuccino sweet latte irish half and half variety. Frappuccino foam arabica steamed cream aromatic extraction. Con panna eu cinnamon, galão chicory, roast black brewed dripper brewed.')
        await db.createPost(1, 5, 'Robust barista chicory mocha cultivar doppio strong espresso skinny. To go, caramelization, plunger pot coffee dark cappuccino sweet latte irish half and half variety. Frappuccino foam arabica steamed cream aromatic extraction. Con panna eu cinnamon, galão chicory, roast black brewed dripper brewed.')
        await db.createPost(2, 5, 'Robust barista chicory mocha cultivar doppio strong espresso skinny. To go, caramelization, plunger pot coffee dark cappuccino sweet latte irish half and half variety. Frappuccino foam arabica steamed cream aromatic extraction. Con panna eu cinnamon, galão chicory, roast black brewed dripper brewed.')
        await db.createPost(1, 7, 'Robust barista chicory mocha cultivar doppio strong espresso skinny. To go, caramelization, plunger pot coffee dark cappuccino sweet latte irish half and half variety. Frappuccino foam arabica steamed cream aromatic extraction. Con panna eu cinnamon, galão chicory, roast black brewed dripper brewed.')
        await db.createPost(1, 1, 'Sit, shop aged grinder id extraction bar decaffeinated affogato. Mug galão spoon blue mountain that siphon mazagran. Roast flavour latte acerbic, galão et dripper dark viennese. Flavour id, dark, grounds cinnamon cream cortado mug acerbic extra acerbic.')
        await db.createPost(2, 1, 'Sit, shop aged grinder id extraction bar decaffeinated affogato. Mug galão spoon blue mountain that siphon mazagran. Roast flavour latte acerbic, galão et dripper dark viennese. Flavour id, dark, grounds cinnamon cream cortado mug acerbic extra acerbic.')
        await db.createPost(1, 5, 'Sit, shop aged grinder id extraction bar decaffeinated affogato. Mug galão spoon blue mountain that siphon mazagran. Roast flavour latte acerbic, galão et dripper dark viennese. Flavour id, dark, grounds cinnamon cream cortado mug acerbic extra acerbic.')
        await db.createPost(2, 5, 'Sit, shop aged grinder id extraction bar decaffeinated affogato. Mug galão spoon blue mountain that siphon mazagran. Roast flavour latte acerbic, galão et dripper dark viennese. Flavour id, dark, grounds cinnamon cream cortado mug acerbic extra acerbic.')
        await db.createPost(1, 1, 'Caramelization sweet, cup robusta frappuccino, aged irish latte espresso milk. Roast iced, variety flavour mug frappuccino caramelization wings. Strong acerbic lungo cinnamon instant skinny lungo.')
        await db.createPost(2, 1, 'Caramelization sweet, cup robusta frappuccino, aged irish latte espresso milk. Roast iced, variety flavour mug frappuccino caramelization wings. Strong acerbic lungo cinnamon instant skinny lungo.')
        await db.createPost(1, 5, 'Caramelization sweet, cup robusta frappuccino, aged irish latte espresso milk. Roast iced, variety flavour mug frappuccino caramelization wings. Strong acerbic lungo cinnamon instant skinny lungo.')
        await db.createPost(2, 2, 'Caramelization sweet, cup robusta frappuccino, aged irish latte espresso milk. Roast iced, variety flavour mug frappuccino caramelization wings. Strong acerbic lungo cinnamon instant skinny lungo.')
        await db.createPost(1, 1, 'Body, roast foam, white body, foam lungo carajillo single origin a flavour. Aftertaste variety, irish, variety, coffee sit breve sugar cultivar. In sugar crema that iced, mazagran, lungo et acerbic lungo grinder roast. Iced, caffeine whipped id half and half black bar con panna. Black and that blue mountain so barista seasonal extra.')
        await db.createPost(2, 2, 'Body, roast foam, white body, foam lungo carajillo single origin a flavour. Aftertaste variety, irish, variety, coffee sit breve sugar cultivar. In sugar crema that iced, mazagran, lungo et acerbic lungo grinder roast. Iced, caffeine whipped id half and half black bar con panna. Black and that blue mountain so barista seasonal extra.')
        await db.createPost(2, 5, 'Body, roast foam, white body, foam lungo carajillo single origin a flavour. Aftertaste variety, irish, variety, coffee sit breve sugar cultivar. In sugar crema that iced, mazagran, lungo et acerbic lungo grinder roast. Iced, caffeine whipped id half and half black bar con panna. Black and that blue mountain so barista seasonal extra.')
        await db.createPost(2, 1, 'Body, roast foam, white body, foam lungo carajillo single origin a flavour. Aftertaste variety, irish, variety, coffee sit breve sugar cultivar. In sugar crema that iced, mazagran, lungo et acerbic lungo grinder roast. Iced, caffeine whipped id half and half black bar con panna. Black and that blue mountain so barista seasonal extra.')
        await db.createPost(1, 1, 'Crema french press half and half instant, cultivar black trifecta aromatic shop. Variety ut, plunger pot con panna turkish ristretto french press cappuccino java. Plunger pot robusta brewed, pumpkin spice wings percolator froth cup that foam ristretto. Caramelization robusta, qui dripper barista kopi-luwak cup rich.')
        await db.createPost(1, 5, 'Crema french press half and half instant, cultivar black trifecta aromatic shop. Variety ut, plunger pot con panna turkish ristretto french press cappuccino java. Plunger pot robusta brewed, pumpkin spice wings percolator froth cup that foam ristretto. Caramelization robusta, qui dripper barista kopi-luwak cup rich.')
        await db.createPost(2, 5, 'Crema french press half and half instant, cultivar black trifecta aromatic shop. Variety ut, plunger pot con panna turkish ristretto french press cappuccino java. Plunger pot robusta brewed, pumpkin spice wings percolator froth cup that foam ristretto. Caramelization robusta, qui dripper barista kopi-luwak cup rich.')
        await db.createPost(1, 7, 'Crema french press half and half instant, cultivar black trifecta aromatic shop. Variety ut, plunger pot con panna turkish ristretto french press cappuccino java. Plunger pot robusta brewed, pumpkin spice wings percolator froth cup that foam ristretto. Caramelization robusta, qui dripper barista kopi-luwak cup rich.')

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