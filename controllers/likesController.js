const {validationResult} = require("express-validator");
const { addLike, removeLike, getNbOfLikes } = require("../services/likesService");

const addLikeController = async(req, res) =>{
    const {recipe_id, user_id} = req.body;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await addLike(user_id, recipe_id);
        res.status(200).json({message: "like added"});
    }catch(error){
       res.status(500).json({message: "error adding the like"});
    }
}

const removeLikeController = async(req, res) =>{
    const {recipe_id, user_id} = req.body;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await removeLike(user_id, recipe_id);
        res.status(200).json({message: "like removed"});
    }catch(error){
       res.status(500).json({message: "error removing the like"});
    }
}

const getNbOfLikesController = async(req, res) =>{
    const {recipe_id} = req.params;
    
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array()});
    }

    try{
        const response = await getNbOfLikes(recipe_id);
        res.status(200).json({response});
    }catch(error){
       res.status(500).json({message: "error getting number of likes"});
    }
}


module.exports = {
    addLikeController,
    removeLikeController,
    getNbOfLikesController,
}