const { query } = require("../database/db");

/**
 * 
 * this class represents the CRUD of dislikes table
 * 
*/


/**
 * Function to add a dislike
 * @param {integer} user_id 
 * @param {integer} recipe_id  
 */
const addDislike = async(user_id, recipe_id) =>{
    try{
        let sql = `INSERT INTO dislikes(user_id, recipe_id) VALUES (?, ?)`;

        const response = await query(sql, [user_id, recipe_id]);
        return response;
    }catch(error){
        throw new Error(error);
    } 
    
}

/**
 * Function to remove a dislike
 * @param {integer} user_id 
 * @param {integer} recipe_id 
 */
const removeDislike = async (user_id, recipe_id) => {
    try {
        let sql = `DELETE FROM dislikes WHERE user_id = ? AND recipe_id = ?`;
        const response = await query(sql, [user_id, recipe_id]);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Function to get number of dislikes
 * @param {integer} recipe_id 
 * @returns number of dislikes under a recipe
 */
const getNbOfDislikes = async (recipe_id) => {
    try {
        let sql = `SELECT COUNT(*) AS nbOfDislikes FROM dislikes WHERE recipe_id = ?`;
        const response = await query(sql, [recipe_id]);
        return response[0].nbOfDislikes;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    addDislike,
    removeDislike,
    getNbOfDislikes,
}