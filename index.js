var express = require("express");
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const session = require('express-session');

const { query } = require("./database/db");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({origin: '*'}));
app.set('view engine', 'ejs');
app.use(express.static('assets'));

//requiring the routes files
const userRoute = require("./routes/userRoute");
const commentsRoute = require("./routes/commentsRoute");
const followlistRoute = require("./routes/followlistRoute");
const recipeRoute = require("./routes/recipeRoute");
const savesRoute = require("./routes/savesRoute");
const likesRoute = require("./routes/likesRoute");


//User session
app.use(session({
    secret: 'yoursecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 3600000),
        sameSite: 'none'
    },
}));

//for tracking the session
//app.use((req, res, next) => {
    //console.log(req.session);
    //next();
//});

//path routes
app.use('/api/user', userRoute);
app.use('/api/recipe', recipeRoute);
app.use('/api/saves', savesRoute);
app.use('/api/followlist', followlistRoute);
app.use('/api/comments', commentsRoute);
app.use('/api/likes', likesRoute);

//Profile page
app.get('/profile', function(req, res){
    const message = req.query.message || '';
    if(!req.session.authorized){
        res.redirect(`/SignIn?message=${encodeURIComponent("session expired")}`);
    }
    else{
       res.redirect(`/api/user/getUserInfo/${req.session.user[0].user_id}?message=${encodeURIComponent(message)}`);
    }

});

//Profile Page for other users 
app.get('/otherUser/:user_id', function(req, res){
    const message = req.query.message || '';
    const {user_id} = req.params;
    if(!req.session.authorized){
        res.redirect(`/SignIn?message=${encodeURIComponent("session expired")}`);
    }
    else{
       res.redirect(`/api/user/getUserInfo/${user_id}?message=${encodeURIComponent(message)}`);
    }

});

//Recipe search and discovery page
app.get('/recipes', function(req, res){
    if(!req.session.authorized){
        res.redirect(`/SignIn?message=${encodeURIComponent("session expired")}`);

    }
    else{
        res.redirect('/api/recipe/getAllRecipes');
    }
});

//Followings page
app.get('/following', function(req, res){
    if (req.session.authorized) {
        // User is authenticated, render the view
        res.redirect(`/api/recipe/getRecipesOfFollowings/${req.session.user[0].user_id}`);
    } else {
        // User is not authenticated, redirect to login page
        res.redirect(`/SignIn?message=${encodeURIComponent("session expired")}`);
    }
});

//Saved recipes page
app.get('/savedRecipes', function(req, res){
    if (req.session.authorized) {
        // User is authenticated, render the view
        res.redirect(`/api/saves/getSavedRecipes/${req.session.user[0].user_id}`);
    } else {
        // User is not authenticated, redirect to login page
        res.redirect(`/SignIn?message=${encodeURIComponent("session expired")}`);
    }
});

//Home Page
app.get('/home', function(req, res){
    if(!req.session.authorized){
        res.redirect(`/SignIn?message=${encodeURIComponent("session expired")}`);

    }
    else{
        res.redirect('/api/recipe/homeRecipes');
        
    }

});

//Sign in Page
app.get('/', async(req, res) =>{
    const message = req.query.message || '';
    if(req.session.authorized){
        res.redirect('/api/recipe/homeRecipes');
    }
    else{
        res.render('SignIn', {message: message});
    }
});

//Logout route
app.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/');
});

//Sign up page
app.get('/signUp', async(req, res)=>{
    const message = req.query.message || '';
    res.render('SignUp', {message: message});
});

//Sign in page
app.get('/signIn', async(req, res)=>{
    const message = req.query.message || '';
    res.render('SignIn', {message: message});
});


app.listen(PORT);

console.log(`Your application is running on port ${PORT}`);

