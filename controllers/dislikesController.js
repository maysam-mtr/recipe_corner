const {validationResult} = require("express-validator");
const { addDislike, removeDislike, getNbOfDislikes } = require("../services/dislikesService");

/**
 * 
 * @param {int, int} req 
 * @param {string} res 
 * @returns success or error message
 */
const addDislikeController = async(req, res) =>{
    const {user_id, recipe_id} = req.body;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        //return  res.status(400).json({errors: errors.array()});
        res.render('recipePage', {message: "invalid id"});
    }

    try{
        const response = await addDislike(user_id, recipe_id);
        //res.status(200).json({message: "dislike added"});
        res.render('recipePage', {message: "dislike added"});
    }catch(error){
       //res.status(500).json({message: "error adding a dislike"});
       res.render('recipePage', {message: "error adding dislike"});
    }
}

/**
 * 
 * @param {int, int} req 
 * @param {string} res 
 * @returns success or error message
 */
const removeDislikeController = async(req, res) =>{
    const {user_id, recipe_id} = req.body;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        //return  res.status(400).json({errors: errors.array()});
        res.render('recipePage', {message: "invalid id"});
    }

    try{
        const response = await removeDislike(user_id, recipe_id);
        //res.status(200).json({message: "dislike removed"});
        res.render('recipePage', {message: "dislike removed"});
    }catch(error){
       //res.status(500).json({message: "error removing dislike"});
       res.render('recipePage', {message: "error removing dislike"});
    }
}


/**
 * 
 * @param {int} req 
 * @param {int} res 
 * @returns number of dislikes under a recipe
 */
const getNbOfDislikesController = async(req, res) =>{
    const {recipe_id} = req.params;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        //return  res.status(400).json({errors: errors.array()});
        res.render('recipePage', {message: "invalid id"});
    }

    try{
        const response = await getNbOfDislikes(recipe_id);
        //res.status(200).json({response});
        res.render('recipePage', {nbofdislikes: response});
    }catch(error){
       //res.status(500).json({message: "error getting number of dislikes"});
       res.render('recipePage', {message: "error getting dislikes"});
    }
}


module.exports = {
    addDislikeController,
    removeDislikeController,
    getNbOfDislikesController,
}