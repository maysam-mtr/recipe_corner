/**
 * this file contains routes for comments
 */

var express = require("express");

const { addCommentController, deleteCommentController, countCommentsController, 
        getRecipeCommentsController } = require("../controllers/commentsController");
const { recipeValidation } = require("../validations/commonValidator");
const { CommentIdValidation, addCommentValidation } = require("../validations/commentsValidator");

const router = express.Router(); 

//route to add a comment
router.post('/addComment', addCommentValidation, addCommentController);

//route to delete a comment
router.delete('/deleteComment/:comment_id', CommentIdValidation, deleteCommentController);

//route to get the number of comments under a recipe
router.get('/countComments/:recipe_id', recipeValidation, countCommentsController);

//route to get all comments under a recipe
router.get('/getRecipeComments/:recipe_id', recipeValidation, getRecipeCommentsController);

module.exports = router;