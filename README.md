# Recipe Corner API

Welcome to the Recipe Corner repository! This repository contains the code and resources for the backend and frontend of the web application Recipe Corner. This project is built using Node.js, Express, EJS, Bootstrap, and uses Native SQL to provide the necessary server and API functionality.


## Table of Contents

- [Getting Started](#getting-started)
- [About the Project](#about-the-project)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [API Endpoints](#api-endpoints)
- [Database Schema](#databse-schema)
- [How to Run and Test Using Postman](#how-to-run-and-test-using-postman)


## Getting Started

Follow these steps to get your Node.js API Backend up and running:

1. Clone this repository to your local development environment:

   ```bash
   git clone https://github.com/maysam-mtr/recipe-corner.git
   ```

2. Run 

```bash 
npm install 
``` 
on the root directory to install all dependencies.
3. Run 
```bash
npm run dev
``` 
to listen to the API on port 3001


# About The Project

Recipe Corner offers a seamless platform for culinary enthusiasts to share, discover, and connect over delectable recipes. Create your profile, showcase your culinary creations, and explore a diverse array of dishes curated by fellow food enthusiasts. Save your favorite recipes, and engage with the community through interactive comments. Receive real-time updates with push notifications, and easily search for recipes based on your preferences. 

 **Key Features**

    User-Centric Profiles: Members can create personalized profiles, showcasing their culinary skills, favorite recipes, and cooking styles.

    Recipe Sharing: Users can effortlessly upload, format, and share their original recipes, complete with captivating visuals and step-by-step instructions.

    Recipe Saving: Users can save favorite recipes.

    Interactive Commenting: Foster a dynamic culinary conversation by leaving comments, feedback, and tips on recipes shared by others.

    Intuitive Search & Filter: Discover recipes based on cuisine, dietary preferences, ingredients, and difficulty level.


# Project Structure

This project follows a typical Node.js project structure:

- `node_modules/`: Contains all the npm packages necessary for the project. This directory is created when you run `npm install`.
- `routes/`: Contains files that define the routes of the application. It specifies what should happen when a user visits a certain endpoint.
- `controllers/`: Contains files that define the application's routing logic. Controllers take in HTTP requests and send back HTTP responses.
- `services/`: Contains business logic, such as data validation and database operations. Services are used by controllers.
- `validators/`: Contains validation logic. Validators are used to check the data in HTTP requests.
- `index.js`: The entry point into the application. This file defines the express server, requires the necessary npm packages, and specifies the middleware to use.
- `package.json`: Lists the package dependencies for the project. When you run `npm install`, npm looks at `package.json` and downloads all the listed dependencies.
- `package-lock.json` (or `yarn.lock`): Automatically generated for any operations where npm modifies either the `node_modules` directory or `package.json`.
- `.gitignore`: This file tells git which files it should not track or maintain a version history for. In this project `node_modules` is put
- `README.md`: A reference file that provides information about the project. This is where you can document how to run and test your application, the endpoints your application provides, etc.


# Dependencies

This project uses the following libraries:

- **Express:** A fast, unopinionated, minimalist web framework for Node.js.
- **Body-parser:** Node.js body parsing middleware.
- **Dotenv:** A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **Express-Validator:** A set of express.js middlewares that wraps validator.js validator and sanitizer functions.
- **CORS:** CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **Config:** A lightweight configuration for your Node.js modules.
- **MySQL:** This is a node.js driver for mysql.

**Tools**
- `Nodemon`: A utility that will monitor for any changes in your source and automatically restart your server.

To install these dependencies, run the following command in the root directory of the project:

```bash
npm install express body-parser dotenv express-validator cors config mysql nodemon
```

# API Endpoints

1. **User**

- GET Path:
Get a user by user id
```/api/user/getUserByID``` Input: property user id through path Response: 200 and user Object

- POST Path:
Register User
```/api/user/createUser``` Input: JSON with property first name, last name, username and password 

Login User
```/api/user/authenticateUser``` Input: JSON with property username and password Response: 200 and Object with properties, username and userId

- PUT Path:
Update user profile picture or/and bio
```/api/user/updateUser``` Input: property user_id through path, profile picture path or user description through JSON

- DELETE Path:
Delete user profile
```/api/user/deleteUser``` Input: property user id through path

2. **Recipe**

- GET Path:
Search for recipe using name or ingredient or cuising type or food category
```/api/recipe/searchRecipe``` Input: JSON with property recipe_name, ingredients, cuisine_type, or food_category Response: 200 and recipe Object

Get Posted Recipes for a user
```/api/recipe/getUserRecipes``` Input: property user id through path Response: 200 and recipe objects

Get Number of Posted Recipes By a User
```/api/recipe/getNbOfRecipesPosted```Input: property user id through path Response: 200 and integer(number of posted recipes)

- POST Path:
Register User
```/api/recipe/createRecipe``` Input: JSON with property recipe_name, cuisine_type, nb_of_servings, recipe_description, ingredients, instructions, prep_time, food_category, diet_type, calories_nb, user_id (recipe description and picture are optional)

Get Recipe by food category
```/api/recipe/getRecipeByFoodCategory``` Input: JSON with property food category Response: 200 and recipe objects

Get Recipe by cuisine type
```/api/recipe/getRecipeByCuisineType``` Input: JSON with property cuisine type Response: 200 and recipe objects

Get Recipe by diet type
```/api/recipe/getRecipeByDietType```Input: JSON with property diet type Response: 200 and recipe objects

- PUT Path:
Update any property of a recipe
```/api/recipe/updateRecipe``` Input: JSON with updated properties user_description, user_profile_pic_path, and user_id through path

- DELETE Path:
Delete Recipe
```/api/recipe/deleteRecipe``` Input: JSON with property recipe id

3. **Saved Recipes**

- GET Path:
Get Saved Recipes for a User
```/api/saves/getSavedRecipes``` Input: property user id through path Response: 200 and recipe Objects

Get Number of Saves
```/api/saves/getNbOfSaves``` Input: property user id through path Response: 200 and integer(number of saves)

- POST Path:
Save Recipe
```/api/saves/saveRecipe``` Input: JSON with property recipe id and user id

- DELETE Path:
Delete Recipe
```/api/saves/unsaveRecipe``` Input: JSON with property recipe id and user id

4. **Recipe Likes and Dislikes**

- GET Path:
Get Number of Likes of a Recipe
```/api/likes/getNbOfLikes``` Input: property recipe id through path Response: 200 and integer of number of likes

Get Number of Dislikes of a Recipe
```/api/likes/getNbOfDislikes``` Input: property recipe id through path Response: 200 and integer of number of dislikes

- POST Path:
Like a Recipe
```/api/likes/addLike``` Input: JSON with property recipe id 

Dislike a Recipe
```/api/likes/addDislike``` Input: JSON with property recipe id 

- DELETE Path:
Delete a like on a Recipe
```/api/likes/removeLike``` Input: JSON with property recipe id and user id

Delete a dislike on a Recipe
```/api/likes/removeDisike``` Input: JSON with property recipe id and user id

5. **Comments**

- GET Path:
Get Comments for a Recipes
```/api/comments/getRecipeComments``` Input: property recipe id through path Response: 200 and comments Objects

Count Number of comments under a recipe
```/api/comments/countComments``` Input: property recipe id through path Response: 200 and integer(number of comments)

- POST Path:
Add Comment
```/api/comments/addComment``` Input: JSON with property recipe id, user id, and comment_text

- DELETE Path:
Delete Comment
```/api/comments/deleteComment``` Input: property comment id through path

6. **Followers and Followings**

- GET Path:
Get Nummber of Followers
```/api/followlist/countFollowers``` Input: property user id through path Response: 200 and integer(number of followers)

Count Number of comments under a recipe
```/api/followlist/countFollowings``` Input: property user id through path Response: 200 and integer(number of followings)

- POST Path:
Follow User
```/api/followlist/followUser``` Input: JSON with property user id and followed user id

- DELETE Path:
Delete Comment
```/api/followlist/unfollowUser``` Input: JSON with property user id and followed user id


# Database Schema

1. **Users Table**
This table stores information of the users of Recipe Corner
```Columns```
 - `user_id`: user id that is set to auto increment
 - `user_first_name`: user's first name
 - `user_last_name`: user's last name
 - `username`: unique username for the user used to log in
 - `user_password`: password used to log in
 - `user_description`: user's profile bio
 - `user_profile_picture_path`: profile picture of a user stored as a path

2. **Recipe Table**
This table stores information about the recipes
```Columns```
- `recipe_id`: recipe id that is set to auto increment
- `recipe_name`: recipe's title
- `user_id`: founder of the recipe
- `cuisine type`: the type of cuisine of the recipe
- `nb_of_servings`: number of servings the recipe makes
- `recipe_picture_path`: picture of the food 
- `ingredients`: ingredients of the recipe
- `instructions`: instructions on how to execute the recipe
- `prep_time`: the time needed to do the recipe
- `posted_at`: post date of the recipe
- `food_category`: type of meal (dessert-breakfast-beverage...)
- `diet_type`: diet restrictions the recipe follows(vegetarian-glutenfree...)
- `calories_nb`: number of calories consumed
- `recipe_description`: a brief description of the food

3. **Likes Table**
This table stores the likes of users under recipes
```Columns```
- `like_id`: like id that is set to auto increment
- `user_id`: the user that liked 
- `recipe_id`: the liked recipe's id

4. **Dislikes Table**
This table stores the dislikes of users under recipes
```Columns```
- `dislike id`: dislike id that is set to auto increment
- `user_id`: the user that disliked
- `recipe_id`: the disliked recipe's id

5. **Saves Table**
This table stores the saved recipes by users
```Columns```
- `save_id`: save id that is set to auto increment
- `user_id`: the user that saved a recipe
- `recipe_id`: the saved recipe's id

6. **Followlist Table**
This table stores the followings of users
```Columns```
- `follow_id`: follow id that is set to auto increment
- `user_id`: the user that followed another user
- `followed_user_id`: the followed user

7. **Comments Table**
This table stores the comments under recipes
```Columns```
- `comment_id`: comment id that is set to auto increment
- `user_id`: the user that commented
- `recipe_id`: the recipe being commented on
- `comment_text`: the comment content
- `comment_date`: the post date of the comment

# How to Run and Test using Postman

1. **Running the Application**
Install Dependencies: Run ```npm install``` in the root directory of your project to install all necessary dependencies.

Start the Server: Run ```npm start``` to start the server. You should see a message indicating that the server is running and listening for requests on a specific port.

2. **Testing the endpoints with Postman**
Install Postman: If you haven’t already, download and install Postman from their website.

Create a New Request: Open Postman and click on the ‘+’ button to create a new tab.

Set the Request Method: In the new tab, click on the dropdown menu to the left of the URL bar (it will likely say ‘GET’ by default) and select the method for the request you want to test (GET, POST, PUT, DELETE).

Enter the Request URL: In the URL bar, enter the URL for the endpoint you want to test. For example, if you’re testing the ‘createUser’ endpoint, you would enter ```http://localhost:3001/createUser``` (replace ‘3001’ with the port your server is running on).

Add Request Body (for POST and PUT requests): If you’re testing a POST or PUT request, you’ll need to add a body to the request. To do this, click on the ‘Body’ tab below the URL bar, select ‘raw’, and choose ‘JSON’ from the dropdown menu. Then, enter the JSON data you want to send in the request.

Send the Request: Click on the ‘Send’ button to send the request. The response will be displayed in the section below.

Save the Request (Optional): If you want to save the request for future use, click on the ‘Save’ button to the right of the ‘Send’ button.
