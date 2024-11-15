const {validationResult} = require("express-validator");
const { saveRecipe, unsaveRecipe, getNbOfSaves, getSavedRecipes } = require("../services/savesService");

/**
 * 
 * @param {int, int} req 
 * @param {string} res 
 * @returns succes or error message
 */
const saveRecipeController = async(req, res) =>{
    const user_id = req.params.user_id;
    const recipe_id = req.params.recipe_id;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await saveRecipe(user_id, recipe_id);
        res.status(200).json({message: "recipe saved"});
    }catch(error){
       res.status(500).json({message: "error saving recipe"});
    }
}

/**
 * 
 * @param {int, int} req 
 * @param {string} res 
 * @returns succes or error message
 */
const unsaveRecipeController = async(req, res) =>{
    const user_id = req.params.user_id;
    const recipe_id = req.params.recipe_id; 

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await unsaveRecipe(user_id, recipe_id);
        res.status(200).json({message: "recipe unsaved"});
    }catch(error){
       res.status(500).json({message: "error unsaving recipe"});
    }
}

/**
 * 
 * @param {int} req 
 * @param {int} res 
 * @returns number of saves
 */
const getNbOfSavesController = async(req, res) =>{ 
    const { user_id } = req.params;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
       const response = await getNbOfSaves(user_id); 
       res.status(200).json({response});
    }catch(error){
       res.status(500).json({message: "error getting number of saves"});
    }
}

/**
 * 
 * @param {int} req 
 * @param {array} res 
 * @returns array of saved recipes
 */
const getSavedRecipesController = async(req, res) =>{
    const { user_id } = req.params;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
       const response = await getSavedRecipes(user_id); 
       //res.status(200).json({response});
       res.render('savedRecipes', {recipes: response});
    }catch(error){
       //res.status(500).json({message: "error getting saved recipes"});
       res.render('savedRecipes', {recipes: []});
    }
}

module.exports = {
    saveRecipeController,
    unsaveRecipeController,
    getNbOfSavesController,
    getSavedRecipesController,
}