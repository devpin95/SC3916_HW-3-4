var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var authJwtController = require('./auth_jwt');
var User = require('./Users');
var Movie = require('./Movies');
var Review = require('./Review');
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

    if ( query ) {
        if ( query.hasOwnProperty("title") ) {
            Movie.find({title: query.title}, function (err, movies) {
                if (err) res.send(err);

                // return the users
                if ( movies.length === 0 ) {
                    res.status(404);
                    res.json({success: false, message: query.title + ' could not be found.'});
                }
                else {
                    var json = movies;
                    var reviews = null;

                    if ( query.hasOwnProperty("reviews") ) {
                        if ( query.reviews == true ) {
                            reviews = Movie.aggregate([
                                {
                                    $lookup:
                                        {
                                            from: "reviews",
                                            localField: "title",
                                            foreignField: "movietitle",
                                            as: "movie_reviews"
                                        }
                                }
                            ])
                        }

                        movies.reviews = reviews;
                    }

                    res.status(200);
                    res.json(movies);
                }
            });
        }
    } else {
        Movie.find(function(err, movies) {
            if (err) res.send(err);
            // return the users
            res.json(movies);
        });
    }

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

    if ( query.hasOwnProperty("reviews") ) {
        if ( !req.body.hasOwnProperty("title") ) {
            res.status(400);
            return res.send({ success: false, message: "Must include movie title" });
        }
        else if ( !req.body.hasOwnProperty("rating") ) {
            res.status(400);
            return res.send({ success: false, message: "Must include movie rating" });
        }
        else if ( !req.body.hasOwnProperty("review") ) {
            res.status(400);
            return res.send({ success: false, message: "Must include movie review" });
        }
        else {
            Movie.findOne({title: req.body.title}, function (err, movies) {
                if (err) res.send(err);

                // return the users
                if ( movies.length === 0 ) {
                    res.status(404);
                    res.json({success: false, message: req.body.title + ' could not be found.', body: req.body});
                } else {
                    var review = new Review();
                    review.title = query.title;
                    review.username = query.username;
                    review.review = query.review;
                    review.rating = query.rating;

                    review.save(function(err) {
                        if (err) {
                            res.status(500);
                            return res.send(err);
                        }
                        return res.json({ success: true, message: 'Review added!', body: req.body });
                    })
                }
            });
        }
    }
    else {
        if ( !query.hasOwnProperty("title") ) {
            res.status(400);
            return res.send({ success: false, message: "Must include movie title" });
        }
        else if ( !query.hasOwnProperty("genre") ) {
            res.status(400);
            return res.send({ success: false, message: "Must include movie genre" });
        }
        else if ( !query.hasOwnProperty("releasedate") ) {
            res.status(400);
            return res.send({ success: false, message: "Must include movie release date" });
        }
        else if ( !query.hasOwnProperty("actor") || !query.hasOwnProperty("character") ) {
            res.status(400);
            return res.send({ success: false, message: "Must include movie actors and their character names" });
        }
        else if ( query.actor.length !== 3 || query.character.length !== 3 ) {
            res.status(400);
            return res.send({ success: false, message: "Must include at least 3 actors with their character name" });
        }

        var movie = new Movie();
        movie.title = query.title;
        movie.genre = query.genre;
        movie.releasedate = new Date(query.releasedate);

        for ( let i = 0; i < query.actor.length; ++i ) {
            var actor = {
                name: query.actor[i],
                character: query.character[i]
            };
            movie.actors.push(actor);
        }

        movie.save(function(err) {
            if (err) {
                // duplicate entry
                if (err.code == 11000) {
                    res.status(409);
                    return res.json({success: false, message: movie.title + ' is already in the database. '});
                }
                else {
                    res.status(500);
                    return res.send(err);
                }
            }

            return res.json({ success: true, message: movie.title + ' Added!' });
        });
    }

}).put('/movies', authJwtController.isAuthenticated, function(req, res) {
    var query = Object.keys(req.query).length === 0 ? null : req.query;

    if ( !query.hasOwnProperty("title") ) {
        res.status(400);
        return res.send({ success: false, message: "Must include movie title to be deleted" });
    }
    else {
        var diff = {};

        if ( query.hasOwnProperty("releasedate") ) {
            diff.releasedate = new Date(query.releasedate);
        }
        if ( query.hasOwnProperty("genre") ) {
            diff.genre = query.genre;
        }
        if ( query.hasOwnProperty("actor") && query.hasOwnProperty("character") ) {
            diff.actors = [];
            for ( let i = 0; i < query.actor.length; ++i ) {
                var actor = {
                    name: query.actor[i],
                    character: query.character[i]
                };
                diff.actors.push(actor);
            }
        }

        Movie.update({title: query.title}, diff, function( err ) {
            if (err) {
                res.status(500);
                return res.send(err);
            }

            res.status(200);
            return res.json({ success: true, message: query.title + ' updated!' });
        });
    }

}).delete('/movies', authJwtController.isAuthenticated, function(req, res) {
    var query = Object.keys(req.query).length === 0 ? null : req.query;

    if ( !query.hasOwnProperty("title") ) {
        res.status(400);
        return res.send({ success: false, message: "Must include movie title to be deleted" });
    }
    else {
        Movie.deleteOne({title: query.title}, function(err, json) {
            if (err) {
                res.status(500);
                return res.send(err);
            }

            // what should I return if the movie wasnt in the database? 204, 200, or 404?
            // Should we tell the user that their call was the one to delete the document?
            // or just that the delete was enacted and the document is no longer present
            res.status(204);
            //res.json({success: true, message: query.title + ' deleted!'});
        })
    }
});

app.use('/', router);
app.listen(process.env.PORT || 8080);
