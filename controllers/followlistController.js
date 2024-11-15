const {validationResult} = require("express-validator");
const { followUser, unfollowUser, countFollowers, countFollowings, getFollowers, getFollowings,  } = require("../services/followlistService");

/**
 * 
 * @param {int, int} req 
 * @param {string} res 
 * @returns success or error message
 */
const followUserController = async(req, res) =>{
    const {user_id, followed_user_id} = req.body;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        //return  res.status(400).json({errors: errors.array()});
        res.render('otherUser', {message: "invalid"});
    }

    try{
        const response = await followUser(user_id, followed_user_id);
        //res.status(200).json({message: "user followed"});
        res.render('otherUser', {message: "user followed"});
    }catch(error){
       //res.status(500).json({message: "error following user"});
       res.render('otherUser', {message: "error following user"});
    }
}

/**
 * 
 * @param {int, int} req 
 * @param {string} res 
 * @returns success or error message
 */
const unfollowUserController = async(req, res) =>{
    const {user_id, followed_user_id} = req.body;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});

    }

    try{
        const response = await unfollowUser(user_id, followed_user_id);
        //res.status(200).json({message: "user unfollowed"});
        res.render('otherUser', {message: "user unfollowed"});
    }catch(error){
       //res.status(500).json({message: "error unfollowing user"});
       res.render('recipePage', {message: "error unfollowing user"});
    }
}

/**
 * 
 * @param {int} req 
 * @param {int} res 
 * @returns number of followers of a user
 */
const countFollowersController = async(req, res) =>{
    const {user_id} = req.params;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await countFollowers(user_id);
        //res.status(200).json({response});
        res.render('user', {followers: response});
    }catch(error){
       //res.status(500).json({message: "error getting number of followers"});
       res.render('user', {message: "error getting number of followers"});
    }
}

const countFollowingsController = async(req, res) =>{
    const {user_id} = req.params;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await countFollowings(user_id);
        //res.status(200).json({response});
        res.render('user', {followings: response});
    }catch(error){
       //res.status(500).json({message: "error getting number of followings"});
       res.render('user', {message: "error getting number of followings"});
    }
}

/**
 * 
 * @param {int} req 
 * @param {array} res 
 * @returns username array of followers
 */
const getFollowersController = async(req, res) =>{
    const {user_id} = req.params;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await getFollowers(user_id);
        //res.status(200).json({response});
        res.render('user', {followers: response});
    }catch(error){
       //res.status(500).json({message: "error getting followers"});
       res.render('user', {message: "error getting followers"});
    }
}

/**
 * 
 * @param {int} req 
 * @param {array} res 
 * @returns username array of followings
 */
const getFollowingsController = async(req, res) =>{
    const {user_id} = req.params;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await getFollowings(user_id);
        //res.status(200).json({response});
        res.render('user', {followings: response});
    }catch(error){
       //res.status(500).json({message: "error getting followings"});
       res.render('user', {message: "error getting followings"});
    }
}

module.exports = {
    followUserController,
    unfollowUserController,
    countFollowersController,
    countFollowingsController,
    getFollowersController,
    getFollowingsController,
}