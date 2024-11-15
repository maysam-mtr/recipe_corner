const {check} = require("express-validator");
const { userIdIsValid } = require("../services/userServices");

/**
 * this file contains validators for the user servicess
 */
  

// validator for create user service
const createUserValidation =[
    check('user_first_name').notEmpty().withMessage("First Name is required"),
    check('user_last_name').notEmpty().withMessage("Last Name is required"),
    check('username').notEmpty().withMessage("Username is required"),
    check('user_password').notEmpty().withMessage("Password is required"),
    check('user_password').isLength({min: 6}).withMessage("Your password is too short"),
    check('user_password').isStrongPassword().withMessage("Your password is too simple"),
];

//validator for update user service
const updateUserValidation =[
    check('user_id').notEmpty().withMessage("User id is required"),
    check('user_id').custom(async (value) => {
        const result = await userIdIsValid(value);
        if (result[0].count === 0) {
          throw new Error('Invalid user ID');
        }
      }),
    
    check('user_description').optional().isLength({ max: 255 }).withMessage('Bio must be less than 255 characters'),
    check('user_profile_pic_path').optional().custom(value => {
        const picturePathRegex = /\.(jpeg|jpg|gif|png)$/i;
        if (!picturePathRegex.test(value)) {
            throw new Error('Invalid picture format');
        }
    }),

];

//validator for delete user service
const deleteUserValidation=[
    check('user_id').notEmpty().withMessage("User id is empty"),
    check('user_id').custom(async (value) => {
        const result = await userIdIsValid(value);
        if (result[0].count === 0) {
          throw new Error('Invalid user ID');
        }
      }),
];

//validator for authenticate user service
const authenticateUserValidation = [
    check('username').notEmpty().withMessage("Username is required"),
    check('user_password').notEmpty().withMessage("Password is required"),
];

module.exports = {
    createUserValidation,
    updateUserValidation,
    deleteUserValidation,
    authenticateUserValidation, 
}