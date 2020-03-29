//BIG CAVEAT - node mysql module only works with legacy mysql... does not support SHA2 passwords, so the mysql with node.js is currently unsecure.

const mysql = require('mysql')

const herokuJawsDBURL = process.env.JAWSDB_URL;

const default_hostAddress = "192.168.55.10"
const default_mySQLUser = "root"
const default_mySQLPassword = "root"
const default_databaseName = 'slack_clone'
const default_port = 3306

let db = null

const rawDataPacketConverter = (result) => {
    let formattedResult;
    if (Array.isArray(result) && result.length > 0){
            for(row of result) {
                // function  will be used on every row returned by the query
                const objectifyRawPacket = row => ({...row});
                // iterate over all items and convert the raw packet row -> js object
                formattedResult = result.map(objectifyRawPacket);
            }
        return(formattedResult)
    } else {
        return result
    }
}

const createConnection = (hostAddress = default_hostAddress, port = default_port, mySQLUser = default_mySQLUser, mySQLPassword = default_mySQLPassword, databaseName = default_databaseName) => {
    return new Promise((resolve, reject) => {
        if (databaseName == "set_undefined") {
            databaseName = undefined
        }
        const newDB = mysql.createConnection({
            host: hostAddress,
            'port': port,
            user: mySQLUser,
            password: mySQLPassword,
            multipleStatements: true, //this is false by default... to prevent SQL injection
            database: databaseName //normal default is undefined. Pass in undefined to create a new database in mysql.
        })
    
        db = newDB
    
        db.connect((error) => {
            if (error) {
                reject(error)
            }
            resolve(`Connected to SQL database on ${hostAddress}.`)
        })
    })
}

const closeConnection = () => {
    db.end()
    console.log("connection closed")
}

/**
 * Note that createDatabase cannot work with a createConnection() that specifies the databaseName... since the databaseName should not exist.
 * 
 */
const createDatabase = (databaseName) => {
    return new Promise((resolve, reject) => {
        if (databaseName == false || databaseName == "") {
            reject("Please enter a valid database name")
        }
        //close current connection
        if (db) {
            closeConnection()
        }
        createConnection(undefined, undefined, undefined, undefined, 'set_undefined')
        const sql = `CREATE DATABASE ${databaseName}`
        db.query(sql, (error, result) => {
            if (error) {
                console.log(`Problem creating database: ${databaseName}.`)
                reject(error)
            }
            console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}


/*
 * internal use only
 * reset schema
 */
const dropAndRecreateTables = () => {
    return new Promise((resolve, reject) => {
        sqlCallback('DROP TABLE IF EXISTS list_of_airports')
        .then((result) => {
            console.log(result.message)
            return sqlCallback('DROP TABLE IF EXISTS user_preferred_destinations')
        })
        .then((result) => {
            console.log(result.message)
            return sqlCallback('DROP TABLE IF EXISTS cities')
        })

        //finally resolve/reject
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}



const resetDatabase = (resources = null) => {
    const path = require('path')
    return new Promise((resolve, reject) => {
        dropAndRecreateTables()
        .then((message) => console.log(message))
        // .then(() => {
        // //'../resources/cities.json'
        // return readResources(path.join(__dirname, resources, '/cities.json'))//)
        // })
        // .then((data) => {
        //     //console.log(data)
        //     for (obj of data) {
        //         //(city_code, city_name)
        //         createCity(obj['code'], obj['name_translations']['en'])
        //     }
        // })
        // .then(() => {
        //     return readResources(path.join(__dirname, resources, '/airports.json'))//)
        // })
        // .then((data) => {
        //     //console.log(data)
        //     for (obj of data) {
        //         //(airport_code, airport_name, city_code, country_code, time_zone)
        //         createAirport(obj['code'], obj['name_translations']['en'], obj['city_code'], obj['country_code'], obj['time_zone'])
        //     }
        // })
        .then(() => {
            resolve("slack database reset")
        })
        .catch((error) => {
            console.log("problem resetting database")
            reject(error)
        })
    })
}


const showTables = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SHOW TABLES'
        db.query(sql, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(rawDataPacketConverter(result))
        })
    })
}


/**
 * users Section
 * 
 * getUsers         - get all users, parameters selectBy or searchBy from query string
 * createUser       - create new user
 */
const getUsers = (selectBy = '*', searchBy = '') => {
    return new Promise((resolve, reject) => {
        const table = 'users'
        const sql = `SELECT ${selectBy} FROM ${table} ${searchBy}`
        db.query(sql, (error, result) => {
            if (error) {
                console.log(`Problem searching for ${table} by ${searchBy}.`)
                reject(error)
            }
            //console.log(rawDataPacketConverter(result))
            resolve(rawDataPacketConverter(result))
        })
    })
}

const createUser = (username, email, password_hash) => {
    return new Promise((resolve, reject) => {
        const table = 'users'
        const sql = `INSERT INTO ${table} (username, email, password_hash) VALUES (?, ?, ?)`
        const params = [username, email, password_hash]
        db.query(sql, params, (error, result) => {
            if (error) {
                console.log(`Problem creating user and inserting into ${table}.`)
                reject(error)
            }
            console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}


/**
 * workspaces
 */
const getWorkspaces = (selectBy = '*', searchBy = '') => {
    return new Promise((resolve, reject) => {
        const table = 'workspaces'
        const sql = `SELECT ${selectBy} FROM ${table} ${searchBy}`
        db.query(sql, (error, result) => {
            if (error) {
                console.log(`Problem searching for ${table} by ${searchBy}.`)
                reject(error)
            }
            //console.log(rawDataPacketConverter(result))
            resolve(rawDataPacketConverter(result))
        })
    })
}