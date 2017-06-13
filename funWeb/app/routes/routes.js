const express = require('express');
const router = express.Router();
const player = require('./playerRoutes');
const competition = require('./compRoutes');
const game = require('./gameRoutes');
const bet = require('./betRoutes');
const better = require('./betterRoutes');


module.exports = (app, passport) => {

    // Handle for the player routes
    router.use('/', player);

    // Handle for the competition routes
    router.use('/', competition);

    // Handle for the game routes
    router.use('/', game);

     // Handle for the bet routes
    router.use('/', bet);

    // Handle for the better routes
    router.use('/', better);

    // Expose them to the rest of the application
    app.use('/', router);

   /* // Default route 
    app.get('/', isLoggedIn, (req, res) => {
        res.sendFile(__dirname + '/public/views/profile.html');
    });*/
    
    // =====================================
        // HOME PAGE (with login links) ========
        // =====================================
        app.get('/', function(req, res, next) {
            //res.render('index'); // load the index.ejs file
            if (!req.user) res.render('home',{
                username : '' ,
                userEmail: '',
                userScore: '0',
                userLevel: '0'
                
            }); //
            else res.render('home', {
                user : req.user, // get the user out of session and pass to template
                username : req.user.local.username ,
                userEmail: req.user.local.email,
                userScore: req.user.local.score,
                userLevel: req.user.local.level
            });
        });

        // =====================================
        // LOGIN ===============================
        // =====================================
        // show the login form
        app.get('/login', function(req, res) {

            // render the page and pass in any flash data if it exists
            res.render('login', { message: req.flash('loginMessage') }); 
        });

        // process the login form
        // app.post('/login', do all our passport stuff here);

        // =====================================
        // SIGNUP ==============================
        // =====================================
        // show the signup form
        app.get('/signup', function(req, res) {

            // render the page and pass in any flash data if it exists
            res.render('signup', { message: req.flash('signupMessage') });
        });

        // process the signup form
        // app.post('/signup', do all our passport stuff here);

        // =====================================
        // PROFILE SECTION =====================
        // =====================================
        // we will want this protected so you have to be logged in to visit
        // we will use route middleware to verify this (the isLoggedIn function)
       /* app.get('/profile', isLoggedIn, function(req, res) {
            res.render('profile', {
                user : req.user // get the user out of session and pass to template
            });
        });*/

        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
               //successRedirect : '/profile', // redirect to the secure profile section
               successRedirect : '/', // redirect to the secure profile section
               failureRedirect : '/signup', // redirect back to the signup page if there is an error
               failureFlash : true // allow flash messages
           }));
          /* app.post('/signup', function(req, res, next ){
               passport.authenticate('local-signup', function(err, user, info) {
                 if (err) { return next(err) }
                 if (!user) { return res.json( { message: info.message }) }
                 res.json(user);
               })(req, res, next);   
           });*/

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
                  //successRedirect : '/profile', // redirect to the secure profile section
                  successRedirect : '/', // redirect to the secure profile section
                  failureRedirect : '/login', // redirect back to the signup page if there is an error
                  failureFlash : true // allow flash messages
              }));
    };

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

