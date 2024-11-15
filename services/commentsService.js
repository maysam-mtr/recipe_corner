const { query } = require("../database/db");
const { recipeIsValid } = require("./recipeService");

/**
 * 
 * this class represents the CRUD of comments table
 * 
*/


/**
 * function to check if comment id is valid
 * @param {integer} comment_id 
 * @returns 1 if the comment id is found, 0 otherwise
 */
const commentIdIsValid = async(comment_id) =>{
    try{
        let sql = `SELECT COUNT(*) FROM comments WHERE comment_id = ?`;
        const response = await query(sql, [comment_id]);
        return response;
    }catch(error){
        throw new Error(error);
    }
}


/**
 * function to get comments under a recipe
 * @param {integer} recipe_id 
 * @returns array of comments for a recipe
 */
const getRecipeComments = async(recipe_id) =>{
    try{
        let sql = `SELECT * FROM comments WHERE recipe_id = ?`;
        const response = await query(sql, [recipe_id]);
        return response;
    }catch(error){
        throw new Error(error);
    }
}

/**
 * Function to add a comment
 * @param {integer} user_id 
 * @param {integer} recipe_id 
 * @param {string} commentText   
 */
const addComment = async (user_id, recipe_id, commentText) => {
    try {
        let sql = `INSERT INTO comments (user_id, recipe_id, comment_text, comment_date) VALUES (?, ?, ?, NOW())`;
        const response = await query(sql, [user_id, recipe_id, commentText]);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Function to delete a comment
 * @param {integer} comment_id 
 */
const deleteComment = async (comment_id) => {
    try {
        let sql = `DELETE FROM comments WHERE comment_id = ?`;
        const response = await query(sql, [comment_id]);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Function to count the number of comments
 * @param {integer} recipe_id 
 * @returns number of comments under a recipe
 */
const countComments = async (recipe_id) => {
    try {
        
        let sql = `SELECT COUNT(*) as commentCount FROM comments WHERE recipe_id = ?`;
        const response = await query(sql, [recipe_id]);
        return response[0].commentCount;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    addComment,
    deleteComment,
    countComments,
    getRecipeComments,
    commentIdIsValid,
}
