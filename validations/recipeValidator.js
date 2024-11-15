const {check} = require("express-validator");
const { recipeIsValid } = require("../services/recipeService");

/**
 *  this file contain validators for the recipes services
*/

//search recipe validator
const searchRecipeValidator = [
    check('keywords').notEmpty().withMessage("No keywords entered")
];

//get recipe by food category validator
const getRecipeByFoodCategoryValidation = [
  check('food_category').notEmpty().withMessage("Meal type is required"),
]

//get recipes by cuisine type validator
const getRecipeByCuisineTypeValidation = [
  check('cuisine_type').notEmpty().withMessage("Cuisine type is required"),
]

//get recipes by diet type validator
const getRecipeByDietTypeValidation = [
  check('diet_type').notEmpty().withMessage("Diet type is required"),
]

//validator for create recipe service
const createRecipeValidation =[
    check('recipe_name').notEmpty().withMessage("Recipe title is required"),
    check('cuisine_type').notEmpty().withMessage("Cuisine type specification is required"),
    check('nb_of_servings').notEmpty().withMessage("Number of servings specification is required"),
    check('nb_of_servings').isNumeric().withMessage('Number of servings must be a number'),
    check('ingredients').notEmpty().withMessage("Ingredients are required"),
    check('instructions').notEmpty().withMessage("Instructions are required"),
    check('prep_time').notEmpty().withMessage("Preparation time specification is required"),
    check('food_category').notEmpty().withMessage("Food category specification is required"),
    check('diet_type').notEmpty().withMessage("Diet type specification is required"),
    check('calories_nb').notEmpty().withMessage("Calories number specification is required"),
    check('calories_nb').isInt({ gt: 0 }).withMessage('Number of calories must be a positive integer'),
    check('calories_nb').isNumeric().withMessage('Number of calories must be a number'),
    check('recipe_picture_path').optional().custom(value => {
      const picturePathRegex = /\.(jpeg|jpg|gif|png)$/i;
      if (!picturePathRegex.test(value)) {
          throw new Error('Invalid picture format');
      }
  }),
];

//validator for update recipe service
const updateRecipeValidation = [
    check('recipe_name').notEmpty().withMessage("Recipe title is required"),
    check('cuisine_type').notEmpty().withMessage("Cuisine type specification is required"),
    check('nb_of_servings').notEmpty().withMessage("Number of servings specification is required"),
    check('nb_of_servings').isNumeric().withMessage('Number of servings must be a number'),
    check('ingredients').notEmpty().withMessage("Ingredients are required"),
    check('instructions').notEmpty().withMessage("Instructions are required"),
    check('prep_time').notEmpty().withMessage("Preparation time specification is required"),
    check('food_category').notEmpty().withMessage("Food category specification is required"),
    check('diet_type').notEmpty().withMessage("Diet type specification is required"),
    check('calories_nb').notEmpty().withMessage("Calories number specification is required"),
    check('calories_nb').isInt({ gt: 0 }).withMessage('Number of calories must be a positive integer'),
    check('calories_nb').isNumeric().withMessage('Number of calories must be a number'),
    check('recipe_picture_path').optional().custom(value => {
      const picturePathRegex = /\.(jpeg|jpg|gif|png)$/i;
      if (!picturePathRegex.test(value)) {
          throw new Error('Invalid picture format');
      }
  }),

      check('recipe_id').custom(async (value) => {
        const result = await recipeIsValid(value);
        if (result[0].count === 0) {
          throw new Error('Invalid recipe ID');
        }
      }),

];

//validator for delete recipe service
const deleteRecipeValidation=[
    check('recipe_id').notEmpty().withMessage("Recipe id is empty"),
    check('recipe_id').custom(async (value) => {
        const result = await recipeIsValid(value);
        if (result[0].count === 0) {
          throw new Error('Invalid recipe ID');
        }
      }),
];


module.exports = {
   createRecipeValidation,
   updateRecipeValidation,
   deleteRecipeValidation,
   searchRecipeValidator,
   getRecipeByFoodCategoryValidation,
   getRecipeByCuisineTypeValidation,
   getRecipeByDietTypeValidation,
}