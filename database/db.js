const mysql = require('mysql2/promise');

const config = require('./config');

var connection;

const connect = async() => {
    try{
        connection = await mysql.createConnection(config.db); 
        console.log("==================================================");
        console.log(`>>>> Connection to ${process.env.DB_NAME} successful`);
        console.log("==================================================");
    }catch(error){ 
        console.error(`>>> Error occured connecting to ${process.env.DB_NAME}`, error);
        process.exit();
    }
}

const query = async(sql, params) =>{ 

    if(!connection){ 
        await connect();
    }

    try{
        const [results] = await connection.execute(sql, params); 
        return results; 
    }catch(error){
        console.error(`Query Error -> ${sql}`, error.message);
    }
}

module.exports = {
    query,
}