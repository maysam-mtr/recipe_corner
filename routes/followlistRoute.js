/**
 * this file contains the routes for followers and followings (followlist)
 */

var express = require("express");

const { followUserController, unfollowUserController, countFollowingsController, countFollowersController, getFollowersController, getFollowingsController } = require("../controllers/followlistController");
const { userIdValidation, followUserValidation } = require("../validations/commonValidator");

const router = express.Router(); 

//route to follow a user
router.post('/followUser', followUserValidation , followUserController);

//route to unfollow a user or delete a follow
router.delete('/unfollowUser', followUserValidation, unfollowUserController);

//route to get number of followings of a user
router.get('/countFollowings/:user_id', userIdValidation, countFollowingsController);

//route to get number of followers of a user
router.get('/countFollowers/:user_id', userIdValidation, countFollowersController);

router.get('/getFollowers/:user_id', userIdValidation, getFollowersController);

router.get('/getFollowigs/:user_id', userIdValidation, getFollowingsController);

module.exports = router;