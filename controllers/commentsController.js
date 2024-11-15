const {validationResult} = require("express-validator");
const { addComment, deleteComment, countComments, getRecipeComments } = require("../services/commentsService");

/**
 * 
 * @param {int} req 
 * @param {array} res 
 * @returns array of recipe comments under a recipe
 */
const getRecipeCommentsController = async(req, res) =>{
    const {recipe_id} = req.params;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await getRecipeComments(recipe_id);
        res.status(200).json({response});
    }catch(error){
       res.status(500).json({message: "error getting recipe comments"});
    }
}

/**
 * 
 * @param {int} req 
 * @param {string} res 
 * @returns success or error message
 */
const addCommentController = async(req, res) =>{
    const {user_id, recipe_id, comment_text} = req.body; 

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        //return  res.status(400).json({errors: errors.array()});
        res.render('recipePage', {message: "Invalid id"});
    }

    try{
        const response = await addComment(user_id, recipe_id, comment_text);
        //res.status(200).json({message: "comment added"});
        res.render('recipePage', {message: "Comment added"});
    }catch(error){
       //res.status(500).json({message: "error adding comment"});
       res.render('recipePage', {message: "error adding comment"});
    }
}

/**
 * 
 * @param {int, int} req 
 * @param {string} res 
 * @returns success or error message
 */
const deleteCommentController = async(req, res) =>{
    const {comment_id} = req.params;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        //return  res.status(400).json({errors: errors.array()});
        res.render('recipePage', {message: "Invalid id"});
    }

    try{
        const response = await deleteComment(comment_id);
        //res.status(200).json({message: "comment deleted"});
        res.render('recipePage', {message: "Comment deleted"});
    }catch(error){
        //res.status(500).json({message: "error deleting comment"});
        res.render('recipePage', {message: "error deleteing comment"});
    }
}

/**
 * 
 * @param {int} req 
 * @param {int} res 
 * @returns number of comments under a recipe
 */
const countCommentsController = async(req, res) =>{
    const {recipe_id} = req.params;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await countComments(recipe_id);
        //res.status(200).json({response});
        res.render('recipePage', {nbofcomments: response});
    }catch(error){
        res.status(500).json({message: "error getting number of comments for a recipe"});
    }
}

module.exports = {
    addCommentController,
    deleteCommentController,
    countCommentsController,
    getRecipeCommentsController,
}