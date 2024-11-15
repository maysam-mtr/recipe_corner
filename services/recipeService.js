const { query } = require("../database/db");

/**
 * 
 * this class represents the CRUD of recipe table
 * 
 */


/**
 * function to check if the passed recipe id is valid
 * @param {integer} recipe_id 
 * @returns 1 if the user is found, 0 otherwise
 */

const getAllRecipes = async() =>{
    try{
        let sql = 'SELECT * FROM recipes';
        const recipe = await query(sql);
         return recipe;
    }catch(error){
        throw new Error(error);
    } 
}

/**
 * function to check if there is a user with matching id
 * @param {int} recipe_id 
 * @returns recipe array with recipe info
 */
const recipeIsValid = async(recipe_id) =>{
    try{
        let sql = 'SELECT COUNT(*) as count FROM recipes WHERE recipe_id = ?';
        const recipe = await query(sql, [recipe_id]);
         return recipe;
    }catch(error){
        throw new Error(error);
    } 
}

/**
 * function to get recipe by id
 * @param {int} recipe_id 
 * @returns recipe information as array
 */
const getRecipeById = async(recipe_id)=>{
    try{
        let sql = 'SELECT * FROM recipes WHERE recipe_id = ?';
        const recipes = await query(sql, [recipe_id]);
 
        return recipes;
    }catch(error){
        throw new Error(error);
    } 
}


/**
 * function to be used in search that returns recipes with properties matching the keywords passed
 * @param {string} keywords 
 * @returns array of recipes that contain at least one of the keywords entered 
 * (keywords are compared with food category, cuisine type, diet_type, ingredients, or name of the recipe)
 */ 
const searchRecipe = async(keywords) =>{
    try{
        let sql = `SELECT * FROM recipes WHERE recipe_name LIKE '%${keywords}%' OR cuisine_type LIKE '%${keywords}%'
        OR ingredients LIKE '%${keywords}%' OR food_category LIKE '%${keywords}%' OR diet_type LIKE '%${keywords}%'`;
        const recipes = await query(sql);
        return recipes;
    }catch(error){
        throw new Error(error);
    } 
}


/**
 * function to get popular recipes
 * @returns array of recipes that have the highest likes count
 */
const getPopularRecipes = async() =>{
    try{
        let sql = `SELECT recipes.*
        FROM recipes
        LEFT JOIN likes ON recipes.recipe_id = likes.recipe_id
        GROUP BY recipes.recipe_id
        ORDER BY COUNT(likes.like_id) DESC LIMIT 14`;
        const recipes = await query(sql);
        return recipes;
    }catch(error){
        throw new Error(error);
    } 
}


/**
 * funtion to get recipe by food category
 * @param {string} foodCategory 
 * @returns array of recipes with same food category
 */
const getRecipeByFoodCategory = async(foodCategory) =>{
    try{
        let sql = `SELECT * FROM recipes WHERE food_category LIKE ?`;
        const users = await query(sql, [`%${foodCategory}%`]);
         return users;
    }catch(error){
        throw new Error(error);
    } 
}


/**
 * funtion to get recipe by diet type
 * @param {string} dietType 
 * @returns array of recipes with same diet type
 */
const getRecipeByDietType = async(dietType) =>{
    try{
        let sql = `SELECT * FROM recipes WHERE diet_type LIKE ?`;
        const users = await query(sql, [`%${dietType}%`]);
         return users;
    }catch(error){
        throw new Error(error);
    } 
}


/**
 * function to get recipe by cuisine type
 * @param {string} cuisineType 
 * @returns array of recipes with same cuisine type
 */
const getRecipeByCuisineType = async(cuisineType) =>{
    try{
        let sql = `SELECT * FROM recipes WHERE cuisine_type LIKE ?`;
        const users = await query(sql, [`%${cuisineType}%`]);
         return users;
    }catch(error){
        throw new Error(error);
    } 
}


/**
 * function to get recipes posted by a user
 * @param {integer} user_id 
 * @returns array of recipes posted by a certain user 
 */
const getUserRecipes = async(user_id) =>{
    try{
        let sql = `SELECT * FROM recipes WHERE user_id = ?`;
        const recipes = await query(sql, [user_id]);
        return recipes;
    }catch(error){
        throw new Error(error);
    }
}


/**
 * function to get number of posted recipes by a user
 * @param {integer} user_id 
 * @returns number of recipes posted by a user
 */
const getNbOfRecipes = async(user_id) =>{
    try{
        
        let sql = `SELECT COUNT(*) as numberOfPostedrecipes FROM recipes WHERE user_id = ?`;
        const recipes = await query(sql, [user_id]);
        return recipes;
    }catch(error){
        throw new Error(error);
    }
}


/**
 * function to create a recipe
 * @param {string} recipe_name 
 * @param {string} cuisine_type 
 * @param {integer} nb_of_servings 
 * @param {string} recipe_picture_path 
 * @param {string} ingredients 
 * @param {string} instructions 
 * @param {integer} prep_time 
 * @param {string} food_category 
 * @param {string} diet_type 
 * @param {integer} calories_nb 
 * @param {integer} user_id 
 * 
 */
const createRecipe = async(recipe_name, cuisine_type, nb_of_servings, recipe_picture_path, recipe_description,
    ingredients, instructions, prep_time, food_category, diet_type, calories_nb, user_id) =>{

    try{
        let response;
        //recipe picture and description are optional to input
        if(typeof recipe_picture_path === 'undefined' && typeof recipe_description === 'undefined'){
            let sql = `INSERT INTO recipes (recipe_name, cuisine_type, nb_of_servings,
                ingredients, instructions, prep_time, food_category, diet_type, calories_nb, user_id) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            response = await query(sql, [recipe_name, cuisine_type, nb_of_servings,
                ingredients, instructions, prep_time, food_category, diet_type, calories_nb, user_id]);
        }
        else if(typeof recipe_description === 'undefined'){
            let sql = `INSERT INTO recipes (recipe_name, cuisine_type, nb_of_servings, recipe_picture_path,
                ingredients, instructions, prep_time, food_category, diet_type, calories_nb, user_id) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            response = await query(sql, [recipe_name, cuisine_type, nb_of_servings, recipe_picture_path,
                ingredients, instructions, prep_time, food_category, diet_type, calories_nb, user_id]);
        }
        else {
            let sql = `INSERT INTO recipes (recipe_name, cuisine_type, nb_of_servings, recipe_description,
                ingredients, instructions, prep_time, food_category, diet_type, calories_nb, user_id) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            response = await query(sql, [recipe_name, cuisine_type, nb_of_servings, recipe_description,
                ingredients, instructions, prep_time, food_category, diet_type, calories_nb, user_id]);
        }

        return response;

    }catch(error){
        throw new Error(error);
    } 
}

// function to update recipe information
/**
 * 
 * @param {integer} recipe_id 
 * @param {string} recipe_name 
 * @param {string} cuisine_type 
 * @param {integer} nb_of_servings 
 * @param {string} recipe_picture_path 
 * @param {string} ingredients 
 * @param {string} instructions 
 * @param {integer} prep_time 
 * @param {string} food_category 
 * @param {string} diet_type 
 * @param {integer} calories_nb 
 * @param {string} recipe_description 
 *  
 */
const updateRecipe = async(recipe_id, recipe_name, cuisine_type, nb_of_servings, recipe_picture_path,
    ingredients, instructions, prep_time, food_category, diet_type, calories_nb, recipe_description) =>{
    try{
        let response;
        //recipe picture and description are optional to input
        if(typeof recipe_picture_path === 'undefined' && typeof recipe_description === 'undefined'){

            let sql = `UPDATE recipes SET recipe_name = ?, cuisine_type = ?, nb_of_servings = ?,
            ingredients = ?, instructions = ?, prep_time = ?, food_category = ?, diet_type = ?, 
            calories_nb = ? WHERE recipe_id = ?`;

            response = await query(sql, [recipe_name, cuisine_type, nb_of_servings, ingredients, instructions, 
                prep_time, food_category, diet_type, calories_nb, recipe_id]);

        }
        else if(typeof recipe_description === 'undefined'){
            let sql = `UPDATE recipes SET recipe_name = ?,  cuisine_type = ?, nb_of_servings = ?, 
            recipe_picture_path = ?, ingredients = ?, instructions = ?, prep_time = ?, food_category = ?, 
            diet_type = ?, calories_nb = ? WHERE recipe_id = ?`;

            response = await query(sql, [recipe_name, cuisine_type, nb_of_servings, recipe_picture_path,
                ingredients, instructions, prep_time, food_category, diet_type, calories_nb, recipe_id]);
        }
        else {
            let sql = `UPDATE recipes SET recipe_name = ?, cuisine_type = ?, nb_of_servings = ?, recipe_description = ?, 
            ingredients = ?, instructions = ?, prep_time = ?, food_category = ?, diet_type = ?, calories_nb = ? WHERE recipe_id = ?`;

            response = await query(sql, [recipe_name, cuisine_type, nb_of_servings, recipe_description,
                ingredients, instructions, prep_time, food_category, diet_type, calories_nb, recipe_id]);

        }

        return response;

    }catch(error){
        throw new Error(error);
    } 
}


/**
 * function to delete a recipe
 * @param {integer} recipe_id 
 *  
 */
const deleteRecipe = async(recipe_id) =>{
    try{
        let sql = `DELETE FROM recipes WHERE recipe_id = ?`;

        const response = await query(sql, [recipe_id]);
        return response;
    }catch(error){
        throw new Error(error);
    } 
}

/**
 * 
 * @param {int} user_id 
 * @returns array of recipes by followed users
 */
const getRecipesOfFollowings = async(user_id) =>{
    try{
        let sql = `SELECT * FROM recipes WHERE user_id IN (SELECT followed_user_id FROM followlist WHERE user_id = ?)`;

        const response = await query(sql, [user_id]);
        return response;
    }catch(error){
        throw new Error(error);
    } 
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    searchRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    recipeIsValid,
    getUserRecipes,
    getNbOfRecipes,
    getRecipeByCuisineType,
    getRecipeByDietType,
    getRecipeByFoodCategory,
    getPopularRecipes,
    getRecipesOfFollowings,
}