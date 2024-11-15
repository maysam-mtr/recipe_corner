const { query } = require("../database/db");

/**
 * 
 * this class represents the CRUD of followlist table
 * 
*/


/**
 * Function to add a following
 * @param {int} user_id 
 * @param {int} followed_user_id 
 * @returns none
 */
const followUser = async(user_id, followed_user_id) =>{
    try{

        let sql = `INSERT INTO followlist(user_id, followed_user_id) VALUES (?, ?)`;
        const response = await query(sql, [user_id, followed_user_id]);
        return response;

    }catch(error){
        throw new Error(error);
    } 
    
}


/**
 * Function to remove a following
 * @param {int} user_id 
 * @param {int} followed_user_id 
 * @returns none
 */
const unfollowUser = async (user_id, followed_user_id) => {
    try {

        let sql = `DELETE FROM followlist WHERE user_id = ? AND followed_user_id = ?`;
        const response = await query(sql, [user_id, followed_user_id]);
        return response;

    } catch (error) {
        throw new Error(error);
    }
}


/**
 * Function to count followings
 * @param {int} user_id 
 * @returns number of followings of a user
 */
const countFollowings = async(user_id) =>{
    try{
        let sql = `SELECT COUNT(*) AS followings FROM followlist WHERE user_id = ?`;
        const response = await query(sql, [user_id]);
        return response;

    }catch(error){
        throw new Error(error);
    } 
}

/**
 * Function to count followers
 * @param {int} user_id 
 * @returns number of followers for a user
 */
const countFollowers = async(user_id) =>{
    try{

        let sql = `SELECT COUNT(*) AS followers FROM followlist WHERE followed_user_id = ?`;
        const users = await query(sql, [user_id]);
        return users;

    }catch(error){
        throw new Error(error);
    } 
}

/**
 * 
 * @param {int} user_id 
 * @returns array of usernames of followers of a user
 */
const getFollowers = async(user_id) =>{
    try{

        let sql = `SELECT username from users where user_id IN (SELECT user_id AS followers FROM followlist WHERE followed_user_id = ?)`;
        const users = await query(sql, [user_id]);
        return users;

    }catch(error){
        throw new Error(error);
    } 
}

/**
 * 
 * @param {int} user_id 
 * @returns array of usernames of followings of a user
 */
const getFollowings = async(user_id) =>{
    try{

        let sql = `SELECT username from users where user_id IN (SELECT followed_user_id AS followings FROM followlist WHERE user_id = ?)`;
        const users = await query(sql, [user_id]);
        return users;

    }catch(error){
        throw new Error(error);
    } 
}

module.exports = {
    followUser,
    unfollowUser,
    countFollowers,
    countFollowings,
    getFollowers,
    getFollowings,
}