const {validationResult} = require("express-validator");
const { searchRecipe, createRecipe, updateRecipe, deleteRecipe, getUserRecipes, getNbOfRecipes, getPopularRecipes, getRecipeByFoodCategory, getRecipeByCuisineType, getRecipeByDietType, getRecipesOfFollowings, getRecipeById, getAllRecipes } = require("../services/recipeService");
const { getRecipeComments } = require("../services/commentsService");
const { getUserById } = require("../services/userServices");

/**
 * 
 * @param {string} req 
 * @param {array} res 
 * @returns array of recipes with matching credentials
 */
const searchRecipeController = async(req, res) =>{ 
    const { keywords } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
       const response = await searchRecipe(keywords); 
       //res.status(200).json({response});
       
       res.render('search', {recipes: response, keywords: keywords});
    }catch(error){
       //res.status(500).json({message: "error searching for recipe(s)"});
       res.render('search', {recipes: [], keywords: keywords});
    }
}

/**
 * Gets all recipes for the recipes page
 * @param {} req 
 * @param {array} res 
 */
const getAllRecipesController = async(req, res)=>{
    try{
        const response = await getAllRecipes(); 
        //res.status(200).json({response});
        
        res.render('recipes', {recipes: response});
     }catch(error){
        //res.status(500).json({message: "error searching for recipe(s)"});
        res.render('recipes', {recipes: []});
     }
}

/**
 * 
 * @param {int} req 
 * @param {object} res 
 * @returns recipe info based on id
 */
const getRecipeByIdController = async(req, res)=>{
    const {recipe_id} = req.params;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await getRecipeById(recipe_id);
        const recipeComments = await getRecipeComments(recipe_id);
        const creator = await getUserById(response[0].user_id); 
        
        //res.status(200).json({response});
        res.render('recipePage', {recipe: response[0], comments: recipeComments, creatorName: creator[0].username, creatorId: creator[0].user_id, user: req.session.user[0]});
     }catch(error){
        //res.status(500).json({message: "error searching for recipe(s)"});
        res.render('recipePage', {recipe: [], comments: [], creator: '', user: req.session.user[0]});
     }
}

/**
 * gets number of posted recipes by a user
 * @param {int} req 
 * @param {int} res 
 * @returns 
 */
const getNbOfRecipesController = async(req, res) =>{
    const { user_id } = req.params;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
       const response = await getNbOfRecipes(user_id); 
       res.status(200).json({response});
    }catch(error){
       res.status(500).json({message: "error getting number of recipes posted"});
    }
}

/**
 * 
 * @param {} req 
 * @param {array} res 
 * @returns array of popular recipes
 */
const getPopularRecipesController = async(req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await getPopularRecipes(); 
        res.status(200).json({response});
     }catch(error){
        res.status(500).json({message: "error getting popular recipes"});
     }
}

const getRecipeByFoodCategoryController = async(req, res) =>{
    const { food_category } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
       const response = await getRecipeByFoodCategory(food_category); 
       res.status(200).json({response});
    }catch(error){
       res.status(500).json({message: "error getting recipes by food category"});
    }
}

const getRecipeByCuisineTypeController = async(req, res) =>{
    const { cuisine_type } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
       const response = await getRecipeByCuisineType(cuisine_type); 
       res.status(200).json({response});
    }catch(error){
       res.status(500).json({message: "error getting recipe by cuisine type"});
    }
}

const getRecipeByDietTypeController = async(req, res) =>{
    const { diet_type } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
       const response = await getRecipeByDietType(diet_type); 
       res.status(200).json({response});
    }catch(error){
       res.status(500).json({message: "error getting recipe by diet type"});
    }
}


const getUserRecipesController = async(req, res) =>{
    const { user_id } = req.params;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
       const response = await getUserRecipes(user_id); 
       res.status(200).json({response});
    }catch(error){
       res.status(500).json({message: "error getting recipes posted"});
    }
}

/**
 * 
 * @param {*} req 
 * @param {string} res 
 */
const createRecipeController = async(req, res) =>{
    const {recipe_name, cuisine_type, nb_of_servings, recipe_picture_path, recipe_description,
        ingredients, instructions, prep_time, food_category, diet_type, calories_nb} = req.body; 
    const {user_id} = req.params;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        //return  res.status(400).json({errors: errors.array()});
        res.redirect(`/profile?message=${encodeURIComponent("Invalid Input")}`);
    }

    try{
        const response = await createRecipe(recipe_name, cuisine_type, nb_of_servings, recipe_picture_path, recipe_description,
            ingredients, instructions, prep_time, food_category, diet_type, calories_nb, user_id);
        //res.status(200).json({message: "recipe created successfully"});
        res.redirect(`/profile?message=${encodeURIComponent("recipe created successfully")}`);
    }catch(error){
       //res.status(500).json({message: "error creating a recipe"});
       res.redirect(`/profile?message=${encodeURIComponent("error creating recipe")}`);
    }
}

/**
 * 
 * @param {*} req 
 * @param {string} res 
 * @returns success or error message
 */
const updateRecipeController = async(req, res) =>{
    const {recipe_name, cuisine_type, nb_of_servings, recipe_picture_path,
        ingredients, instructions, prep_time, food_category, diet_type, calories_nb, user_description} = req.body;
        const {recipe_id} = req.params;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await updateRecipe(recipe_id, recipe_name, cuisine_type, nb_of_servings, recipe_picture_path,
            ingredients, instructions, prep_time, food_category, diet_type, calories_nb, user_description);
        res.status(200).json({message: "recipe updated"});
    }catch(error){
        res.status(500).json({message: "error updating a recipe"});
    }
}

/**
 * 
 * @param {int} req 
 * @param {string} res 
 * @returns success or error message
 */
const deleteRecipeController = async(req, res) =>{
    const {recipe_id} = req.params;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await deleteRecipe(recipe_id);
        res.status(200).json({message: "recipe deleted successfully"});
    }catch(error){
        res.status(500).json({message: "error deleting recipe"});
    }
}

/**
 * 
 * @param {int} req 
 * @param {array} res 
 * @returns array of recipes by followed users
 */
const getRecipesOfFollowingsController = async(req, res) =>{
    const {user_id} = req.params;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await getRecipesOfFollowings(user_id);
        //res.status(200).json({response});
        res.render('following', {recipes: response});
    }catch(error){
        //res.status(500).json({message: "error getting recipes"});
        res.render('following', {recipes: []});
    }
}

/**
 * 
 * @param {} req 
 * @param {array} res 
 */
const getHomeRecipesController = async(req, res)=>{
    try{
        const popular = await getPopularRecipes();
        const diet = await getRecipeByDietType("vegetarian");
        const food = await getRecipeByFoodCategory("dessert");
        
        res.render('index', { user: req.session.user[0], popular: popular, diet: diet, food: food});
    }catch(error){
        //res.status(500).json({message: "error getting recipes"});
        res.render('index', {recipes: [], popular: [], food: [], diet: []});
    }

}

module.exports = {
    getHomeRecipesController,
    getAllRecipesController,
    searchRecipeController, 
    createRecipeController,
    updateRecipeController,
    deleteRecipeController,
    getUserRecipesController,
    getNbOfRecipesController,
    getPopularRecipesController,
    getRecipeByFoodCategoryController,
    getRecipeByCuisineTypeController,
    getRecipeByDietTypeController,
    getRecipesOfFollowingsController,
    getRecipeByIdController,
}