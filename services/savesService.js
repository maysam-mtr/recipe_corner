const { query } = require("../database/db");

/**
 * 
 * This class represents the CRUD of the saves table
 */



/**
 * Function to save a recipe
 * @param {integer} userId 
 * @param {integer} recipeId 
 */
const saveRecipe = async(userId, recipeId) =>{
    try{
        let sql = `INSERT INTO saves(user_id, recipe_id) VALUES (?, ?)`;

        const response = await query(sql, [userId, recipeId]);
        return response;
    }catch(error){
        throw new Error(error);
    } 
    
}

/**
 * Function to unsave a recipe
 * @param {integer} userId 
 * @param {integer} recipeId 
 * @returns 
 */
const unsaveRecipe = async (userId, recipeId) => {
    try {
        let sql = `DELETE FROM saves WHERE user_id = ? AND recipe_id = ?`;
        const response = await query(sql, [userId, recipeId]);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * function to count number of recipes saved for a user
 * @param {integer} userId 
 * @returns number of saves for a user
 */
const getNbOfSaves = async (userId) => {
    try {
        let sql = `SELECT COUNT (*) AS savesCount FROM saves WHERE user_id = ?`;
        const response = await query(sql, [userId]);
        return response[0].savesCount;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * unction to return all saved recipes of a user
 * @param {integer} user_id 
 * @returns array of recipes saved by a user
 */
const getSavedRecipes = async(user_id) =>{
    try{
        let sql = `SELECT * FROM recipes WHERE recipe_id IN(SELECT recipe_id FROM saves WHERE user_id = ?)`;
        const response = await query(sql, [user_id]);
        return response;
    } catch (error){
        throw new Error(error);
    }
}

module.exports = {
    unsaveRecipe,
    getNbOfSaves,
    saveRecipe,
    getSavedRecipes,
}