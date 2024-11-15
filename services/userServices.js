const { query } = require("../database/db");

/**
 * 
 * this class represents the CRUD of user table
 * 
*/

/**
 * function to get a user by id
 * @param {integer} user_id 
 * @returns user object with matching id
 */
const getUserById = async(user_id) =>{
    try{
        let sql = `SELECT * FROM users WHERE user_id = ?`;
        const user = await query(sql, [user_id]);
         return user;
    }catch(error){
        throw new Error(error);
    } 
}


/**
 * function to validate a user's id(to be used in validators)
 * @param {integer} user_id 
 * @returns 1 if valid, 0 otherwise
 */
const userIdIsValid = async(user_id) =>{
    try{
        let sql = 'SELECT COUNT(*) as count FROM users WHERE user_id = ?';
        const user = await query(sql, [user_id]);
         return user;
    }catch(error){
        throw new Error(error);
    } 
}


/**
 * create user function
 * @param {string} user_first_name 
 * @param {string} user_last_name 
 * @param {string} username 
 * @param {string} user_password 
 * @param {string} user_description 
 * @param {string} user_profile_pic  
 */
const createUser = async(user_first_name, user_last_name, username, user_password, user_description, user_profile_pic) =>{
      
       try{
         let response;
        if(typeof user_description  === 'undefined' && typeof user_profile_pic === 'undefined'){
            let sql = `INSERT INTO users (user_first_name, user_last_name, username, user_password) 
            VALUES (?, ?, ?, ?) `;
             response = await query(sql, [user_first_name, user_last_name, username, user_password]);
        }
        else if(typeof user_profile_pic === 'undefined'){
            let sql = `INSERT INTO users (user_first_name, user_last_name, username, user_password, user_description) 
                   VALUES (?, ?, ?, ?, ?) `;
                    response = await query(sql, [user_first_name, user_last_name, username, user_password, 
                    user_description]);
        }
        else{
            let sql = `INSERT INTO users (user_first_name, user_last_name, username, user_password, user_profile_pic_path) 
                   VALUES (?, ?, ?, ?, ?) `;
                    response = await query(sql, [user_first_name, user_last_name, username, user_password, user_profile_pic]);
        }
        return response;
    }catch(error){
        throw new Error(error);
    } 
    
}


/**
 * Update user function where the user can only edit his bio or profile picture
 * @param {integer} user_id 
 * @param {string} user_description 
 * @param {string} user_profile_pic_path 
 */
const updateUser = async(user_id, user_description, user_profile_pic_path) =>{
   
    try{
        let response;
        if(typeof user_profile_pic === 'undefined'){

            let sql = `UPDATE users SET user_description = ? WHERE user_id = ?`;

            response = await query(sql, [user_description, user_id]);

        }
        else{
            let sql = `UPDATE users SET user_profile_pic_path = ? WHERE user_id = ?`;

            response = await query(sql, [user_profile_pic_path, user_id]);
        }
        
        return response;
    }catch(error){
        throw new Error(error);
    } 
}


/**
 * authenticate username and password for log in
 * @param {string} username 
 * @param {string} user_password 
 * @returns object response that contains if the user was authenticated or not
 */
const authenticateUser = async (username, user_password) => {

    // default response message 
      let response = {
          message: "Invalid username or password",
          user: null,
      }
      try{
          // check if the username and password provided exists 
          let sql = `SELECT * FROM users WHERE username = ? AND user_password = ? LIMIT 1`;
          const result = await query(sql, [username, user_password]);
        
          if(result){
             // change the response message if client found
              if(result[0].user_password === user_password){
                  response.message = 'authorized';
                  response.user = result;
              }
          }
  
      }catch(error){ 
          console.error(error);
      }
      
      return response;
}


/**
 * function to delete a user's profile
 * @param {integer} user_id 
 */
const deleteUser = async(user_id) =>{
    try{
        let sql = `DELETE FROM users WHERE user_id = ?`;

        const response = await query(sql, [user_id]);
        return response;
    }catch(error){
        throw new Error(error);
    } 
}

/**
 * gets the username of the user with matching id
 * @param {int} user_id 
 * @returns 
 */
const getUsernameById = async(user_id) =>{
    try{
        let sql = `SELECT username FROM users WHERE user_id = ?`;

        const response = await query(sql, [user_id]);
        return response;
    }catch(error){
        throw new Error(error);
    } 
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    authenticateUser,
    userIdIsValid,
    getUsernameById,
}