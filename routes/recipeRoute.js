/**
 * this file contains the routes for recipes
 */

var express = require("express");

const { updateRecipeValidation, createRecipeValidation, deleteRecipeValidation, searchRecipeValidator, getRecipeByFoodCategoryValidation, getRecipeByCuisineTypeValidation, getRecipeByDietTypeValidation } = require("../validations/recipeValidator");
const { searchRecipeController, createRecipeController, updateRecipeController, deleteRecipeController, 
        getUserRecipesController, getNbOfRecipesController, getPopularRecipesController, getRecipeByFoodCategoryController, getRecipeByCuisineTypeController, getRecipeByDietTypeController, getRecipesOfFollowingsController, getRecipeByIdController, getAllRecipesController, getHomeRecipesController } = require("../controllers/recipeController");
const { userIdValidation, recipeValidation } = require("../validations/commonValidator");

const router = express.Router(); 

//route to search for recipes based on keywords
router.post('/searchRecipe', searchRecipeValidator, searchRecipeController);

//route to create a new recipe
router.post('/createRecipe/:user_id', createRecipeValidation, createRecipeController);

//route to update information of a recipe
router.put('/updateRecipe/:recipe_id', updateRecipeValidation, updateRecipeController);

//route to delete a recipe
router.delete('/deleteRecipe/:recipe_id', deleteRecipeValidation, deleteRecipeController);

//route to get recipes posted by a certain user
router.get('/getUserRecipes/:user_id', userIdValidation, getUserRecipesController);

//route to get the number of posted recipes by a user
router.get('/getNbOfRecipesPosted/:user_id', userIdValidation, getNbOfRecipesController);

//route to get popular recipes
router.get('/getPopularRecipes', getPopularRecipesController);

router.get('/getRecipesOfFollowings/:user_id', userIdValidation, getRecipesOfFollowingsController);

//route to get recipes by food category(meal type)
router.post('/getRecipesByFoodCategory', getRecipeByFoodCategoryValidation, getRecipeByFoodCategoryController);

//route to get recipes by cuisine type
router.post('/getRecipesByCuisineType', getRecipeByCuisineTypeValidation, getRecipeByCuisineTypeController);

//route to get recipes by diet type
router.post('/getRecipesByDietType', getRecipeByDietTypeValidation, getRecipeByDietTypeController);

router.get('/getRecipeById/:recipe_id', recipeValidation, getRecipeByIdController);

router.get('/getAllRecipes', getAllRecipesController);

router.get('/homeRecipes', getHomeRecipesController);

module.exports = router;