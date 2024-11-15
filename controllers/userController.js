const { createUser, updateUser, deleteUser, authenticateUser, getUserById, getUsernameById } = require("../services/userServices")
const {validationResult} = require("express-validator");
const { countFollowings, countFollowers } = require("../services/followlistService");
const { getUserRecipes, getNbOfRecipes } = require("../services/recipeService");

/**
 * 
 * @param {int} req 
 * @param {object} res 
 * @returns user info 
 */
const getUserByIdController = async(req, res) =>{
    const { user_id } = req.params;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
       const response = await getUserById(user_id); 
       res.status(200).json({response});
    }catch(error){
       res.status(500).json({message: "error getting user by id"});
    }
}

/**
 * 
 * @param {strring, string, string, string, string, string} req 
 * @param {*} res 
 */
const createUserController = async(req, res) =>{
    const {user_first_name, user_last_name, username, user_password, user_description, 
        user_profile_pic} = req.body;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        // Concatenate the error messages into a single string
        const message = errorMessages.join('. ');
        // Render the view with the error message
        res.redirect(`/signUp?message=${encodeURIComponent(message)}`);
        //return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await createUser(user_first_name, user_last_name, username, user_password, 
            user_description, user_profile_pic);

        //res.status(200).json({message: "user created successfully"});
        // Redirect to the 'signIn' route with a success message
        res.redirect(`/signIn?message=${encodeURIComponent("User created successfully")}`);
    }catch(error){
        // Redirect to the 'signIn' route with an error message
        res.redirect(`/signIn?message=${encodeURIComponent("Error creating user")}`);
       //res.status(500).json({message: "error creating user"});
    }
}

/**
 * 
 * @param {int} req 
 * @param {string} res 
 * @returns success or error message
 */
const deleteUserController = async(req, res) =>{
    const {user_id} = req.params;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await deleteUser(user_id);
        res.status(200).json({message: "user deleted successfully"});
    }catch(error){
        res.status(500).json({message: "error deleting user"});
    }
}

/**
 * 
 * @param {int} req 
 * @param {string} res 
 * @returns success or error message
 */
const updateUserController = async(req, res) =>{
    const {user_description, user_profile_pic_path} = req.body;
    const {user_id} = req.params;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    if (!user_description && !user_profile_pic_path) {
        return res.status(400).send('No changes were made');
    }

    try{
        const response = await updateUser(user_id, user_description, user_profile_pic_path);
        //res.status(200).json({message: "user info updated successfully"});
        res.render('user', {message: "user info updated"});
    }catch(error){
        //res.status(500).json({message: "error updating user information"});
        res.render('user', {message: "error updating user info"});
    }
}

/**
 * 
 * @param {string, string} req 
 * @param {string} res 
 * @returns success or error message
 */
const authenticateUserController = async(req, res) =>{
    const {username, user_password } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await authenticateUser(username, user_password);
        if(response){
            req.session.user = response.user;
            req.session.authorized = true;
            res.redirect('/home');
        }
        else{
            //res.status(200).json({response});
            res.render('Signin', {message: response.message});
            //res.redirect(`/api/user/authenticateUser?message=${encodeURIComponent(response.message)}`);
        }

    }catch(error){
        //res.status(500).json({message: "error authenticating user"});
        res.render('Signin', {message: "error in authentication"});
    }
}

const getUsernameByIdController = async(req, res) =>{
    const {user_id} = req.params;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await getUsernameById(user_id);
        res.status(200).json({response});
    }catch(error){
        res.status(500).json({message: "error getting username"});
    }
}

/**
 * gets all user information to be displayed in the home page
 * @param {int} req 
 * @param {object} res 
 */
const getAllUserInfoController = async(req, res) =>{
    const {user_id} = req.params;
    const message = req.query.message;

    if(message === 'undefined'){
        message = '';
    }

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        //return  res.status(400).json({errors: errors.array()});
        res.render('user', {user: req.session.user[0], followers: 0, followings: 0, posts: [], postsnb: 0, message: "invalid id"});
    }

    try{
        const following =  await countFollowings(user_id);
        const followers =  await countFollowers(user_id);
        const posts =  await getUserRecipes(user_id);
        const nbofposts =  await getNbOfRecipes(user_id);
        

        if(user_id != req.session.user[0].user_id){
            const user = await getUserById(user_id);
            res.render('otherUser', {user: user[0], followers: followers[0], followings: following[0], posts: posts, postsnb: nbofposts[0], message: message});
        }

        res.render('user', {user: req.session.user[0], followers: followers[0], followings: following[0], posts: posts, postsnb: nbofposts[0], message: message});
    }catch(error){
        res.render('user', {user: req.session.user[0], followers: 0, followings: 0, posts: [], postsnb: 0, message: "error opening page"});
    } 
}

module.exports = {
    getAllUserInfoController,
    updateUserController,
    deleteUserController,
    createUserController,
    authenticateUserController,
    getUserByIdController,
    getUsernameByIdController,
}