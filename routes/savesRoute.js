/**
 * this file contains routes for the recipe saves of a user
 */

var express = require("express");

const { userIdValidation, recipeUserValidation } = require("../validations/commonValidator");
const { saveRecipeController, unsaveRecipeController, getNbOfSavesController, 
        getSavedRecipesController } = require("../controllers/savesController");

const router = express.Router(); 

//route to save a recipe
router.post('/saveRecipe/:user_id/:recipe_id', recipeUserValidation, saveRecipeController);

//route to delete a save or unsave
router.delete('/unsaveRecipe/:user_id/:recipe_id', recipeUserValidation,  unsaveRecipeController);

//route to get number of saves of a user
router.get('/getNbOfSaves/:user_id', userIdValidation, getNbOfSavesController);

//route to get saved recipes of a user
router.get('/getSavedRecipes/:user_id', userIdValidation, getSavedRecipesController);


module.exports = router;