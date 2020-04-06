# Assignment Three + Assignment Four
#### Assignment 3 Postman:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8563903f4cb8aa441198#?env%5Bhw3%5D=W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6IkpXVCBleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalZsTm1VNFl6SXhNekkxTkdaak1EQXdOR1ppWkdJeE1pSXNJblZ6WlhKdVlXMWxJam9pWkdWMmFXNGlMQ0pwWVhRaU9qRTFPRFF6TURNME9UUjkuUWJMWnJfeExFY3NhbG5vZEdaOVVRdndEa1B3OWNGLWMzbG1TcVNNMncxUSIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibmFtZSIsInZhbHVlIjoiUk9CRVJULUNIUklTVE9QSEVSLVJJQ0hBUkQtIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ1c2VybmFtZSIsInZhbHVlIjoiUk9CRVJULUNIUklTVE9QSEVSLVJJQ0hBUkQtIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJwYXNzd29yZCIsInZhbHVlIjoidmxyNTFoaW16N2N5d3ZheGFtZmw3IiwiZW5hYmxlZCI6dHJ1ZX1d)

#### Assignment 4 Postman:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f742ae992105dd4db3c6#?env%5Bhw4%5D=W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6IkpXVCBleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalZsTm1VNFl6SXhNekkxTkdaak1EQXdOR1ppWkdJeE1pSXNJblZ6WlhKdVlXMWxJam9pWkdWMmFXNGlMQ0pwWVhRaU9qRTFPRFl3TXpjMU1EWjkuTS1zOWhCTEFOU2F2eHlSbElPbWZzbklQczNYZl9yVWxwbDFaeEJUN2tOMCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoidXNlcm5hbWUiLCJ2YWx1ZSI6IlNjb29ieSBEb28iLCJlbmFibGVkIjp0cnVlfV0=)

# Assigment 3
## Purpose

The purpose of this assignment is to get comfortable working with a NoSQL database (MongoDB).

For this assignment you will create a Users collection to store users for your signup and signin
methods. You will pass Username, Name and Password as part of signup. To get a token you will
call SingIn with username and password only. The token should include the Name and UserName
(not password)

You will also create Movies collection to store information about movies. All endpoints will be
protected with the JWT token received by a signin call.

## Requirements

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

## Acceptance Criteria

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


## Resources

- [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a Free Subscription *Amazon

# Assignment 4

## Purpose
The purpose of this assignment is to leverage Google’s analytics policies to gather 
information about the requests being sent in by users.

Using the information already entered to MongoDB for the previous assignment, you will 
add another collection of reviews that are tied to the movies. This way users can query the 
database and get the previous information (title, year released and actors) as well as 
the reviews. These two entities should remain separate! Do not append the reviews to 
the existing movie information.

Leverage the Async.js library or mongo $lookup aggregation capability to join the entities.

## Requirements

- Create a collection in MongoDB (Mongo Atlas) to hold reviews about existing movies.
    - A review contains the name of the reviewer, a small quote about what they thought
       about the movie, and their rating out of five stars.
    - The review collection should have at least one review for each movie. – The review
       can be a simple, fictitious review that you create.
- This proxy should build upon the previous proxy in assignment four.
    - If the user sends a response with the query parameter reviews=true, then the
       response should include the movie information as well as all the reviews for the
       movie. If they do not pass this in, the response should not show the reviews. – The
       review information should be appended to the response to the user.
    - Implement GET/POST (DELETE is optional for reviews)
       - POST needs to be secured with a JWT authorization token. The Username
          in the token should be stored with the review (indicating the user that
          submitted the review)
- Extra Credit: Add custom analytics to return information about which movies users are
querying.
    - Create a custom analytics policy that describes the number of times each movie has
       been reviewed. To do this, you will have to send a number of requests for each movie.
          - Custom Dimension: Movie Name
          - Custom Metric: Requested: Value 1 (it will aggregate)
    - Custom Dimension and Metric should be sent with an Event type
       - Event Category: Genre of Movie (e.g. Western)
       - Event Action: Url Path (e.g. post /reviews)
       - Event Label: API Request for Movie Review
       - Event Value: 1

## Acceptance Criteria
- Create a Postman test to test your proxy. You should include the following requests.
- All tests from HW4 and
- Valid request without the review query parameter.
- Invalid request (for a movie not in the database) without the review query parameter.
- Valid request with the review query parameter.
- Valid save review method that associates a review with a movie
- Invalid save review (movie missing from DB)
- Export a report from Google Analytics

## Resources
- [https://github.com/daxko/universal-ga](https://github.com/daxko/universal-ga)
- [https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets](https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets)
- [https://cloud.google.com/appengine/docs/flexible/nodejs/integrating-with-analytics](https://cloud.google.com/appengine/docs/flexible/nodejs/integrating-with-analytics)
- [https://caolan.github.io/async/index.html](https://caolan.github.io/async/index.html)
- [https://support.google.com/analytics/answer/](https://support.google.com/analytics/answer/)