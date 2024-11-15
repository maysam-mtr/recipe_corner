const {check} = require("express-validator");
const { commentIdIsValid } = require("../services/commentsService");
const { userIdIsValid } = require("../services/userServices");
const { recipeIsValid } = require("../services/recipeService");

/**
 * this file contains validators for comments services
 */

//check if comment id from the comments table is valid
const CommentIdValidation = [
    check('comment_id').notEmpty().withMessage("Comment id is required"),
  
    check('comment_id').custom(async (value) => {
        const result = await commentIdIsValid(value);
        if (result[0].count === 0) {
          throw new Error('Invalid comment ID');
        }
      }),
];

// validator for add comment service
const addCommentValidation = [
    check('comment_text').notEmpty().withMessage("Comment should not be empty"),
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


module.exports = {
    CommentIdValidation,
    addCommentValidation,
}