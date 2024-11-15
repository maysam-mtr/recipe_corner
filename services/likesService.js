const { query } = require("../database/db");

/**
 * 
 * this class represents the CRUD of likes table
 * 
*/


/**
 * Function to add a like
 * @param {integer} user_id 
 * @param {integer} recipe_id 
 */
const addLike = async(user_id, recipe_id) =>{
    try{
        let sql = `INSERT INTO likes (user_id, recipe_id) VALUES (?, ?);`;
        const response = await query(sql, [user_id, recipe_id]);
        return response;
    }catch(error){
        throw new Error(error);
    } 
    
}


/**
 * Function to remove a like
 * @param {integer} user_id 
 * @param {integer} recipe_id  
 */
const removeLike = async(user_id, recipe_id) => {
    try {
        let sql = `DELETE FROM likes WHERE user_id = ? AND recipe_id = ?`;
        const response = await query(sql, [user_id, recipe_id]);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}


/**
 * Function to get number of likes
 * @param {integer} recipe_id 
 * @returns number of likes under a recipe
 */
const getNbOfLikes = async (recipe_id) => {
    try {
        let sql = `SELECT COUNT(*) AS nbOfLikes FROM likes WHERE recipe_id = ?`;
        const response = await query(sql, [recipe_id]);
        return response[0].nbOfLikes;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    addLike,
    removeLike,
    getNbOfLikes,
}