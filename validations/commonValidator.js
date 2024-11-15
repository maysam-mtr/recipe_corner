const {check} = require("express-validator");
const { recipeIsValid } = require("../services/recipeService");
const { userIdIsValid } = require("../services/userServices");

/**
 * The following are common validations to be used in the routes. They all mainly check validity of ids
*/

//check if both recipe and user id are valid
const recipeUserValidation = [
    check('user_id').notEmpty().withMessage("User Id of the recipe is required"),

    check('user_id').custom(async (value) => {
        const result = await userIdIsValid(value);
        if (result[0].count === 0) {
          throw new Error('Invalid user ID');
        }
      }),

    check('recipe_id').notEmpty().withMessage("Recipe Id of the recipe is required"),

    check('recipe_id').custom(async (value) => {
        const result = await recipeIsValid(value);
        if (result[0].count === 0) {
          throw new Error('Invalid recipe ID');
        }
      }),
];


//check if user id from the users table is valid
const userIdValidation = [
  check('user_id').notEmpty().withMessage("User Id of the recipe is required"),

  check('user_id').custom(async (value) => {
      const result = await userIdIsValid(value);
      if (result[0].count === 0) {
        throw new Error('Invalid user ID');
      }
    })
];

//check if recipe id from the recipes table is valid
const recipeValidation = [
  check('recipe_id').notEmpty().withMessage("Recipe Id of the recipe is required"),

  check('recipe_id').custom(async (value) => {
      const result = await recipeIsValid(value);
      if (result[0].count === 0) {
        throw new Error('Invalid recipe ID');
      }
    }),
];


//check if user and followed user id from the followlist table are valid
const followUserValidation = [
  check('user_id').notEmpty().withMessage("User id is required"),
  check('user_id').custom(async (value) => {
      const result = await userIdIsValid(value);
      if (result[0].count === 0) {
        throw new Error('Invalid user ID');
      }
    }),

  check('followed_user_id').notEmpty().withMessage("Followed User id is required"),
  check('followed_user_id').custom(async (value) => {
      const result = await userIdIsValid(value);
      if (result[0].count === 0) {
        throw new Error('Invalid followed user ID');
      }
    }),
];

module.exports = {
  recipeUserValidation,
  userIdValidation,
  recipeValidation,
  followUserValidation,
}