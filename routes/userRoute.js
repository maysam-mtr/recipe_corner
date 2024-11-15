/**
 * this file contains the routes for users
 */

var express = require("express");

const { createUserController, updateUserController, deleteUserController, authenticateUserController,
     getUserByIdController,
     getAllUserInfoController} = require("../controllers/userController");
const { createUserValidation, updateUserValidation, deleteUserValidation, 
    authenticateUserValidation } = require("../validations/userValidator");
const { userIdValidation } = require("../validations/commonValidator");

const router = express.Router(); 

//route to create or register a user
router.post('/createUser',createUserValidation, createUserController);

//route to update some user information
router.put('/updateUser/:user_id', updateUserValidation, updateUserController);

//route to delete a user
router.delete('/deleteUser/:user_id', deleteUserValidation, deleteUserController);

//route to get a user by id
router.get('/getUserById/:user_id', deleteUserValidation, getUserByIdController);

router.get('/getUsername/:user_id', userIdValidation, getUserByIdController);

//route to authenticate user for login
router.post('/authenticateUser', authenticateUserValidation, authenticateUserController);

router.get('/getUserInfo/:user_id', userIdValidation, getAllUserInfoController);

module.exports = router;