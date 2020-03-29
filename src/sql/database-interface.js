//pass in the databaseName, by default we will use project_sunshine
//https://stackoverflow.com/questions/14087924/cannot-enqueue-handshake-after-invoking-quit

//BIG CAVEAT - node mysql module only works with legacy mysql... does not support SHA2 passwords, so the mysql with node.js is currently unsecure.


/**
 * Database Interface
 * connects to mySQL database at hostAddress
 * functions that take 'searchBy' expect a callback function from the Search file. 
 */

const mysql = require('mysql')

const herokuJawsDBURL = process.env.JAWSDB_URL;

const default_hostAddress = "s9xpbd61ok2i7drv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com" || "192.168.55.10"
const default_mySQLUser = "vilstgbzc803gepx" || "root"
const default_mySQLPassword = "$2y$12$mban5psbp467m4dn" || "root"
const default_databaseName = "cauv398s2hgs2pdo" || 'project_sunshine'
const default_port = 3306

let db = null

const rawDataPacketConverter = (result) => {
    let formattedResult;
    if (Array.isArray(result)){
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
        // const newDB = mysql.createConnection({
        //     host: hostAddress,
        //     'port': port,
        //     user: mySQLUser,
        //     password: mySQLPassword,
        //     multipleStatements: true, //this is false by default... to prevent SQL injection
        //     database: databaseName //normal default is undefined. Pass in undefined to create a new database in mysql.
        //         //socketPath  : '/var/run/mysqld/mysqld.sock'
        // })

        //get access denial if you try to setup the connection any other way
        const newDB = mysql.createConnection(herokuJawsDBURL)
    
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
        //new connection
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
        //closeConnection() //this will not work... work on async
    })
}

/*
 *  internal use only
 */
const readResources = (path) => {
    const fs = require('fs').promises
    return new Promise((resolve, reject) => {
        //let json = require(path)
        fs.readFile(path, 'utf8')
        .then((rawData) => {
            resolve(JSON.parse(rawData))
        })                 
    })
}

/*
 * internal use only
 */
const sqlCallback = (sql) => {
    return new Promise((resolve, reject) => {
        //const formattedSQL = sql.replace((/  |\r\n|\n|\r/gm),"")
        db.query(sql, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

/*
 * internal use only
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
        .then((result) => {
            console.log(result.message)
            return sqlCallback('DROP TABLE IF EXISTS user_preferences')
        })
        .then((result) => {
            console.log(result.message)
            return sqlCallback('DROP TABLE IF EXISTS users')
        })
        .then((result) => {
            console.log(result.message)
            return sqlCallback(`CREATE TABLE users (
                id int              PRIMARY KEY AUTO_INCREMENT,
                first_name          varchar(255),
                last_name           varchar(255),    
                email               varchar(255) NOT NULL,
                password_hash       varchar(255) NOT NULL,
                city_name           VARCHAR(255),        
                instagram_id        varchar(255),
                instagram_username  varchar(255),
                access_token        varchar(255),
                created_at          TIMESTAMP NOT NULL DEFAULT NOW()
            )`)
        })
        .then((result) => {
            console.log(result.message)
            return sqlCallback(`CREATE TABLE user_preferences (
                user_id             INT PRIMARY KEY,
                price               INT,
                number_of_nights    INT,
                flight_time         INT,
                temperature         INT,
                last_updated        TIMESTAMP NOT NULL DEFAULT NOW(),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`)
        })
        .then((result) => {
            console.log(result.message)
            return sqlCallback(`CREATE TABLE cities (
                city_code       VARCHAR(10) PRIMARY KEY,
                city_name       VARCHAR(255)
            )`)
        })
        .then((result) => {
            console.log(result.message)
            return sqlCallback(`CREATE TABLE user_preferred_destinations (
                id int              PRIMARY KEY AUTO_INCREMENT,
                user_id             INT NOT NULL,
                city_code           VARCHAR(10) NOT NULL,
                preferred_rating    INT NOT NULL,
                last_updated        TIMESTAMP NOT NULL DEFAULT NOW(),
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (city_code) REFERENCES cities(city_code)
            )`)
        })
        .then((result) => {
            console.log(result.message)
            return sqlCallback(`CREATE TABLE list_of_airports (
                airport_code        VARCHAR(10) PRIMARY KEY,
                airport_name        VARCHAR(255),
                city_code           VARCHAR(10),
                country_code        VARCHAR(10),
                time_zone           VARCHAR(255),
                FOREIGN KEY (city_code) REFERENCES cities (city_code)
            )`)
        })
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

const resetDatabase = (resources) => {
    const path = require('path')
    return new Promise((resolve, reject) => {
        dropAndRecreateTables()
        .then((message) => console.log(message))
        .then(() => {
        //'../resources/cities.json'
        return readResources(path.join(__dirname, resources, '/cities.json'))//)
        })
        .then((data) => {
            //console.log(data)
            for (obj of data) {
                //(city_code, city_name)
                createCity(obj['code'], obj['name_translations']['en'])
            }
        })
        .then(() => {
            return readResources(path.join(__dirname, resources, '/airports.json'))//)
        })
        .then((data) => {
            //console.log(data)
            for (obj of data) {
                //(airport_code, airport_name, city_code, country_code, time_zone)
                createAirport(obj['code'], obj['name_translations']['en'], obj['city_code'], obj['country_code'], obj['time_zone'])
            }
        })
        .then(() => {
            resolve("cities and list_of_airports have been reset")
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
 * updateUserEmail  - update user email by selecting with either (internal) id or instagram_id
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

const createUser = (first_name , last_name, email, password_hash, city_name, instagram_id, instagram_username, access_token) => {
    return new Promise((resolve, reject) => {
        const table = 'users'
        const sql = `INSERT INTO ${table} (first_name , last_name, email, password_hash, city_name, instagram_id, instagram_username, access_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        const params = [first_name , last_name, email, password_hash, city_name, instagram_id, instagram_username, access_token]
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
 * search by either id or email, pass in null to skip id
 *
 */
const updateUserIG = (id, email, instagram_id, instagram_username, access_token) => {
    return new Promise((resolve, reject) => {
        const table = 'users'
        let whereCondtion;
        let conditionValue;
        
        if (id) {
            whereCondition = 'id'
            conditionValue = id
        } else if (email) {
            whereCondition = 'email'
            conditionValue = email
        } else {
            reject("Invalid parameter. Must pass in either id or email. Pass null first to skip id and update by email")
        }

        const sql = `UPDATE ${table} SET instagram_id = ?, instagram_username = ?, access_token = ? WHERE ${whereCondition} = ?`
        const params = [instagram_id, instagram_username, access_token, conditionValue]
        db.query(sql, params, (error, result) => {
            if (error) {
                console.log(`Problem updateing ${table}.`)
                reject(error)
            }
            //console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}

const updateUserEmail = (id, email, instagram_id) => {
    return new Promise((resolve, reject) => {       
        const table = 'users'
        let whereCondtion;
        let conditionValue;
        
        if (id) {
            whereCondition = 'id'
            conditionValue = id
        } else if (instagram_id) {
            whereCondition = 'instagram_id'
            conditionValue = instagram_id
        } else {
            reject("Invalid parameter. Must pass in either id or")
        }

        const sql = `UPDATE ${table} SET email = ? WHERE ${whereCondition} = ?`
        const params = [email, conditionValue]
        db.query(sql, params, (error, result) => {
            if (error) {
                console.log(`Problem updateing ${table}.`)
                reject(error)
            }
            //console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}

/**
 * user_preferences section
 */
const getUserPreferences = (selectBy = '*', searchBy = '') => {
    return new Promise((resolve, reject) => {
        const table = 'user_preferences'
        const sql = `SELECT ${selectBy} FROM ${table} ${searchBy}`
        db.query(sql, (error, result) => {
            if (error) {
                console.log(`Problem searching ${table} by ${searchBy}.`)
                reject(error)
            }
            console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}

const createUserPreferences = (user_id, price, number_of_nights, flight_time, temperature) => {
    return new Promise((resolve, reject) => {
        const table = 'user_preferences'
        const sql = `INSERT INTO ${table} (user_id, price, number_of_nights, flight_time, temperature) VALUES (?, ?, ?, ?, ?)`
        const params = [user_id, price, number_of_nights, flight_time, temperature]
        db.query(sql, params, (error, result) => {
            if (error) {
                console.log(`Problem creating preferred destination and inserting into ${table}.`)
                reject(error)
            }
            console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}

//need to think about how to setup update statement


/**
 * user_preferred_destinations section
 */
const getUserPreferredDestinations = (selectBy = '*', searchBy = '') => {
    return new Promise((resolve, reject) => {
        const table = 'user_preferred_destinations'
        const sql = `SELECT ${selectBy} FROM ${table} ${searchBy}`
        db.query(sql, (error, result) => {
            if (error) {
                console.log(`Problem searching ${table} by ${searchBy}.`)
                reject(error)
            }
            console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}

const createUserPreferredDestinations = (user_id, city_code, preferred_rating) => {
    return new Promise((resolve, reject) => {
        const table = 'user_preferred_destinations'
        const sql = `INSERT INTO ${table} (user_id, city_code, preferred_rating) VALUES (?, ?, ?)`
        const params = [user_id, city_code, preferred_rating]
        db.query(sql, params, (error, result) => {
            if (error) {
                console.log(`Problem creating preferred destination and inserting into ${table}.`)
                reject(error)
            }
            console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}

const updateUserPreferredDestinations = (user_id, city_code, preferred_rating) => {
    return new Promise((resolve, reject) => {
        const table = 'user_preferred_destinations'
        let whereCondition;
        let conditionValue;
        if(user_id) {
            whereCondition = 'user_id'
            conditionValue = user_id
        } else {
            reject(`Problem updateing ${table}.`)
        }
        const sql = `UPDATE ${table} SET preferred_rating = ? WHERE city_code = ? AND ${whereCondition} = ?`
        const params = [preferred_rating, city_code, conditionValue]
        db.query(sql, params, (error, result) => {
            if (error) {
                console.log(`Problem creating preferred destination and inserting into ${table}.`)
                reject(error)
            }
            console.log(result)
            //console.log(result.message) //can access the OkPacket object with dot notation on result
            resolve(rawDataPacketConverter(result))
        })
    })
}

/**
 * cities section
 */
const getCities = (selectBy = '*', searchBy = '') => {
    return new Promise((resolve, reject) => {
        const table = 'cities'
        const sql = `SELECT ${selectBy} FROM ${table} ${searchBy}`
        db.query(sql, (error, result) => {
            if (error) {
                console.log(`Problem searching ${table} by ${searchBy}.`)
                reject(error)
            }
            console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}

const createCity = (city_code, city_name) => {
    return new Promise((resolve, reject) => {
        const table = 'cities'
        const sql = `INSERT INTO ${table} (city_code, city_name) VALUES (?, ?)`
        const params = [city_code, city_name]
        db.query(sql, params, (error, result) => {
            if (error) {
                console.log(`Problem creating city and inserting into ${table}.`)
                reject(error)
            }
            console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}

/**
 * list_of_airports section
 */
const getListOfAirports = (selectBy = '*', searchBy = '') => {
    return new Promise((resolve, reject) => {
        const table = 'list_of_airports'
        const sql = `SELECT ${selectBy} FROM ${table} ${searchBy}`
        db.query(sql, (error, result) => {
            if (error) {
                console.log(`Problem searching ${table} by ${searchBy}.`)
                reject(error)
            }
            console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}

const createAirport = (airport_code, airport_name, city_code, country_code, time_zone) => {
    return new Promise((resolve, reject) => {
        const table = 'list_of_airports'
        const sql = `INSERT INTO ${table} (airport_code, airport_name, city_code, country_code, time_zone) VALUES (?, ?, ?, ?, ?)`
        const params = [airport_code, airport_name, city_code, country_code, time_zone]
        db.query(sql, params, (error, result) => {
            if (error) {
                console.log(`Problem creating airport and inserting into ${table}.`)
                reject(error)
            }
            console.log(result)
            resolve(rawDataPacketConverter(result))
        })
    })
}


module.exports = {
    createConnection,
    closeConnection,
    createDatabase,
    resetDatabase,
    showTables,
    getUsers,
    createUser,
    updateUserIG,
    updateUserEmail,
    getUserPreferences,
    createUserPreferences,
    getUserPreferredDestinations,
    createUserPreferredDestinations,
    updateUserPreferredDestinations,
    getCities,
    createCity,
    getListOfAirports,
    createAirport,
}


//this will setup the database and insert 20,000 sql statements!!!
// createConnection()
// .then((message) => {
//     console.log(message)
// })
// .then(() => {
//     dropAndRecreateTables()
// })
// .then(() => {
//     return resetDatabase('../resources')
// })
// .then((result) => console.log(result))
// .then(() => {
//     getCities()
// })
// .then(() => {
//     closeConnection()
// })
// .catch((error) => console.log(error))

/*

// createDatabase("createDB_test")
// createConnection()
//     createUser('database_interface_test_email1', 'some_insta_id1', 'db_interface1', 'hash_token')
//     getUsers()
//     createUserPreferredDestinations('1', 'VAN', '150')
//     getUserPreferredDestinations()
//     createCity('UWU', 'uwu town')
//     getCities()
//     createAirport('UWU', 'uwu airport', 'UWU', 'UWU', 'owo time')
//     getListOfAirports()
//     updateUserEmail('1', 'updatedEmail')
//     getUsers()
//     updateUserEmail(null, 'instagramIDEmail', 'userid1')
//     getUsers()
//     updateUserPreferredDestinations(1, 'TYO', '999')
//     getUserPreferredDestinations()

// closeConnection()

// createConnection()
// .then(() => {
//     dropAndRecreateTables()
// })
// .then(() => {
//     closeConnection()
// })


OkPacket {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        serverStatus: 2,
        warningCount: 0,
        message: '(Rows matched: 1  Changed: 0  Warnings: 0',
        protocol41: true,
        changedRows: 0
      }



    createConnection()
    getUsers()
    Connected to SQL database on 192.168.55.10.
[
  RowDataPacket {
    id: 1,
    email: 'email1',
    instagram_id: 'userid1',
    instagram_username: 'username1',
    access_token: 'token_hash',
    created_at: 2020-03-08T05:40:12.000Z
  },
  RowDataPacket {
    id: 2,
    email: 'email2',
    instagram_id: 'userid2',
    instagram_username: 'username2',
    access_token: 'token_hash',
    created_at: 2020-03-08T05:40:12.000Z
  },
  RowDataPacket {
    id: 3,
    email: 'email3',
    instagram_id: 'userid3',
    instagram_username: 'username3',
    access_token: 'token_hash',
    created_at: 2020-03-08T05:40:12.000Z
  },
  RowDataPacket {
    id: 4,
    email: 'email4',
    instagram_id: 'userid4',
    instagram_username: 'username4',
    access_token: 'token_hash',
    created_at: 2020-03-08T05:40:12.000Z
  },
  RowDataPacket {
    id: 5,
    email: 'email5',
    instagram_id: 'userid5',
    instagram_username: 'username5',
    access_token: 'token_hash',
    created_at: 2020-03-08T05:40:12.000Z
  }
]
*/


/*
    mysql object has a _config... see: console.log(newDB)
    _config: ConnectionConfig {
      host: '192.168.55.10',
      port: 3306,
      localAddress: undefined,
      socketPath: undefined,
      user: 'root',
      password: 'root',
      database: undefined,
      connectTimeout: 10000,
      insecureAuth: false,
      supportBigNumbers: false,
      bigNumberStrings: false,
      dateStrings: false,
      debug: undefined,
      trace: true,
      stringifyObjects: false,
      timezone: 'local',
      flags: '',
      queryFormat: undefined,
      pool: undefined,
      ssl: false,
      localInfile: true,
      multipleStatements: false,
      typeCast: true,
      maxPacketSize: 0,
      charsetNumber: 33,
      clientFlags: 455631
    }
    */