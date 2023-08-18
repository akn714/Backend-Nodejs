# Backend-Nodejs

### Tracker
* lecture 00, lecture 01, lecture 02, lecture 03, lecture 04, lecture 05, lecture 06:
    * Basics
    * Status code helps in SEO
* lecture 07:
    * HTTP methods
        * GET - Getting data from server
        * POST - Sending data to server
        * PATCH - Updating data on server
        * DELETE - Deleting data on server
    * Postman
* lecture 08:
    * URL parameters - 'http://localhost:3000/product/:id'
    * Queries in express - 'http://localhost:3000/?iphone=13&GB=128'
* lecture 09:
    * APIs
    * REST APIs
        * If APIs follow some rules then they will be called REST APIs
        * rules:
        * 1. response should be same, irrespective of platform from which frontend is sending req.
        * 2. routes should be on the basis of nouns (name, place, animal, thing). eg. '/user', '/users', '/auth'
        * 3. http methods should be used for doing operations on these routes (using http verbs - get, post, patch, delete)
            * use ```app.get('/users')``` instead of ```app.get('/getusers')```
            * use ```app.post('/users')``` instead of ```app.get('/postusers')```
            * use ```app.patch('/users')``` instead of ```app.get('/updateusers')```
            * use ```app.delete('/users')``` instead of ```app.get('/deleteusers')```
        * 4. response should always be in JSON formate
        * 5. API should be stateless
* lecture 10:
    * mounting in express
    * express.Router() - used to make mini app
* lecture 11:
    * creating post request from frontend to backend using axios
* lecture 12:
    * middleware -
        * works between getting request and sending response
        * runs in a sequence
        * global middleware - app.use()
        * specific middleware - app.get(), app.post(), etc.
        * ex.
        ```js
            function(req, res, next){
                ...
                next();
            }
        ```
    * ending the request and response cycle in middleware
* lecture 13:
    * mongoDB:
        * pros
            * open source
            * load balancing
            * sharding
            * flexible
            * scalable
        * cons:
            * unable to do complex transactions
            * can not maintain ACID properties (atomicity, consistency, isolation, and durabilityh)
            * not used in banking systems
* lecture 14:
    * mongoDB Atlas
    * schema
    * model
    * creating a new document in mongoDB Atlas usin ```model.create()```