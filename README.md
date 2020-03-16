# Assignment Three
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8563903f4cb8aa441198#?env%5Bhw3%5D=W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6IkpXVCBleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalZsTm1VNFl6SXhNekkxTkdaak1EQXdOR1ppWkdJeE1pSXNJblZ6WlhKdVlXMWxJam9pWkdWMmFXNGlMQ0pwWVhRaU9qRTFPRFF6TURNME9UUjkuUWJMWnJfeExFY3NhbG5vZEdaOVVRdndEa1B3OWNGLWMzbG1TcVNNMncxUSIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibmFtZSIsInZhbHVlIjoiUk9CRVJULUNIUklTVE9QSEVSLVJJQ0hBUkQtIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ1c2VybmFtZSIsInZhbHVlIjoiUk9CRVJULUNIUklTVE9QSEVSLVJJQ0hBUkQtIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJwYXNzd29yZCIsInZhbHVlIjoidmxyNTFoaW16N2N5d3ZheGFtZmw3IiwiZW5hYmxlZCI6dHJ1ZX1d)
# Purpose

The purpose of this assignment is to get comfortable working with a NoSQL database (MongoDB).

For this assignment you will create a Users collection to store users for your signup and signin
methods. You will pass Username, Name and Password as part of signup. To get a token you will
call SingIn with username and password only. The token should include the Name and UserName
(not password)

You will also create Movies collection to store information about movies. All endpoints will be
protected with the JWT token received by a signin call.

# Requirements

Create a collection in MongoDB to hold information about movies

- Each entry should contain the following
    - Title
    - Year released
    - Genre (Action, Adventure, Comedy, Drama, Fantasy, Horror, Mystery, Thriller,
       Western)
    - Array of three actors that were in the film
       - ActorName
       - CharacterName
    - The movie collection should have at least five movies
- Create a NodeJS Web API to interact with your database
    - Follow best practices (e.g. /movies collection)
    - Your API should support all CRUD operations (through HTTP POST, PUT, DELETE, GET)
    - Ensure incoming entities contain the necessary information. For example if the movie
       does not contain actors, the entity should not be created and an error should be
       returned
- All endpoints should be protected with a JWT token (implement signup, and signin)
    - For this assignment you must implement a User database in Mongo
       - Password should be hashed
       - Name
       - Username
    - If username exists the endpoint should return an error that the user already exists
    - JWT secret needs to be stored in an environment variable
- Update the Pre-React CSC3916_HW5 placeholder project to support /signup and /signin
    methods. The React Single Page App should use your Assignment 3 API to support those two
    operations.

# Acceptance Criteria

- API Deployed to Heroku and Database deployed to Atlas
- React Website that allows user to signup and singin (we did this in class)
- PostMan test collection that
    - Signs Up a user (create a random user name and random password in your pre-test)
    - SignIn a User – parse token and store in postman environment variable
    - A separate call for each endpoint (save a movie, update a movie, delete a movie and
       get a movie)
    - Test error conditions (user already exists)
       - SignUp (user already exist)
       - Save Movie (missing information like actors (must be at least three), title,
          year or Genre)


# Resources

- [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a Free Subscription *Amazon
