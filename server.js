var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var authJwtController = require('./auth_jwt');
var User = require('./Users');
var Movie = require('./Movies');
var cors = require("cors");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

var app = express();
module.exports = app; // for testing
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

router.route('/postjwt')
    .post(authJwtController.isAuthenticated, function (req, res) {
            console.log(req.body);
            res = res.status(200);
            if (req.get('Content-Type')) {
                console.log("Content-Type: " + req.get('Content-Type'));
                res = res.type(req.get('Content-Type'));
            }
            res.send(req.body);
        }
    );

router.route('/users/:userId')
    .get(authJwtController.isAuthenticated, function (req, res) {
        var id = req.params.userId;
        User.findById(id, function(err, user) {
            if (err) res.send(err);

            var userJson = JSON.stringify(user);
            // return that user
            res.json(user);
        });
    });

router.route('/users')
    .get(authJwtController.isAuthenticated, function (req, res) {
        User.find(function (err, users) {
            if (err) res.send(err);
            // return the users
            res.json(users);
        });
    });

router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, message: 'Please pass username and password.'});
    }
    else {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        // save the user
        user.save(function(err) {
            if (err) {
                // duplicate entry
                if (err.code == 11000)
                    return res.json({ success: false, message: 'A user with that username already exists. '});
                else
                    return res.send(err);
            }

            res.json({ success: true, message: 'User created!' });
        });
    }
});

router.post('/signin', function(req, res) {
    var userNew = new User();
    userNew.name = req.body.name;
    userNew.username = req.body.username;
    userNew.password = req.body.password;

    User.findOne({ username: userNew.username }).select('name username password').exec(function(err, user) {
        if (err) res.send(err);

        user.comparePassword(userNew.password, function(isMatch){
            if (isMatch) {
                var userToken = {id: user._id, username: user.username};
                var token = jwt.sign(userToken, process.env.SECRET_KEY);
                res.json({success: true, token: 'JWT ' + token});
            }
            else {
                res.status(401).send({success: false, message: 'Authentication failed.', name: req.body.username, password: req.body.password});
            }
        });


    });
});

router.get('/movies', authJwtController.isAuthenticated, function(req, res) {
    // res.json({
    //     status: 200,
    //     message: "GET movies",
    //     headers: req.headers,
    //     query: Object.keys(req.query).length === 0 ? null : req.query,
    //     env: process.env.SECRET_KEY
    // });
    var query = Object.keys(req.query).length === 0 ? null : req.query;

    var movies = new Movie();
    res.json(Movie.find(function(err, movies) {
        if (err) res.send(err);
        // return the users
        res.json(movies);
    }));

}).post('/movies', authJwtController.isAuthenticated, function(req, res) {
    // res.json({
    //     status: 200,
    //     message: "movie saved",
    //     headers: req.headers,
    //     query: Object.keys(req.query).length === 0 ? null : req.query,
    //     env: process.env.SECRET_KEY
    // });
    var query = Object.keys(req.query).length === 0 ? null : req.query;
    // res.json(query);

    if ( !query.hasOwnProperty("title") ) {
        res.send({ success: false, message: "Must include movie title" });
    }
    else if ( !query.hasOwnProperty("genre") ) {
        res.send({ success: false, message: "Must include movie genre" });
    }
    else if ( !query.hasOwnProperty("releasedate") ) {
        res.send({ success: false, message: "Must include movie release date" });
    }
    else if ( !query.hasOwnProperty("actor") ) {
        res.send({ success: false, message: "Must include movie actors" });
    }
    else if ( !query.hasOwnProperty("character") ) {
        res.send({ success: false, message: "Must include movie characters" });
    }

    var movie = new Movie();
    movie.title = query.title;
    movie.genre = query.genre;
    movie.releasedate = new Date(query.releasedate);

    for ( let i = 0; i < query.actors.length; ++i ) {
        movie.actors.push({ actor: query.actors[i], character: query.characters[i] })
    }

    movie.save(function(err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000)
                return res.json({ success: false, message: 'A user with that username already exists. '});
            else
                return res.send(err);
        }

        res.json({ success: true, message: movie.title + ' Added!' });
    });

}).put('/movies', authJwtController.isAuthenticated, function(req, res) {
    res.json({
        status: 200,
        message: "movie updated",
        headers: req.headers,
        query: Object.keys(req.query).length === 0 ? null : req.query,
        env: process.env.SECRET_KEY
    });
}).delete('/movies', authJwtController.isAuthenticated, function(req, res) {
    res.json({
        status: 200,
        message: "movie deleted",
        headers: req.headers,
        query: Object.keys(req.query).length === 0 ? null : req.query,
        env: process.env.SECRET_KEY
    });
});

app.use('/', router);
app.listen(process.env.PORT || 8080);
