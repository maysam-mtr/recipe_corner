/**
 * this file contains the route for likes ad dislikes
 */

var express = require("express");

const { recipeUserValidation, recipeValidation } = require("../validations/commonValidator");
const { addLikeController, removeLikeController, getNbOfLikesController } = require("../controllers/likesController");
const { addDislikeController, removeDislikeController, getNbOfDislikesController } = require("../controllers/dislikesController");

const router = express.Router(); 

//route to add a like on a recipe
router.post('/addLike', recipeUserValidation, addLikeController);

//route to delete a like on a recipe
router.delete('/removeLike', recipeUserValidation, removeLikeController);

//route to get the number of likes of a recipe
router.get('/getNbOfLikes/:recipe_id', recipeValidation, getNbOfLikesController);

//route to add a dislike on a recipe
router.post('/addDislike', recipeUserValidation, addDislikeController);

//route to delete a dislike on a recipe
router.delete('/removeDislike', recipeUserValidation, removeDislikeController);

//route to get number of dislikes on a recipe
router.get('/getNbOfDislikes/:recipe_id', recipeValidation, getNbOfDislikesController);


module.exports = router;