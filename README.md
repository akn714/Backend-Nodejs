# Backend-Nodejs

## Tracker
#### lecture 00, lecture 01, lecture 02, lecture 03, lecture 04, lecture 05, lecture 06:
* Basics
* Status code helps in SEO
#### lecture 07:
* HTTP methods
    * GET - Getting data from server
    * POST - Sending data to server
    * PATCH - Updating data on server
    * DELETE - Deleting data on server
* Postman
#### lecture 08:
* URL parameters - 'http://localhost:3000/product/:id'
* Queries in express - 'http://localhost:3000/?iphone=13&GB=128'
#### lecture 09:
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
#### lecture 10:
* mounting in express
* express.Router() - used to make mini app
#### lecture 11:
* creating post request from frontend to backend using axios
#### lecture 12:
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
#### lecture 13:
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
#### lecture 14:
* mongoDB Atlas
* schema
* model
* creating a new document in mongoDB Atlas usin ```modelname.create()```
#### lecture 15:
* CURD operations in MongoDB (https://mongoosejs.com/docs/queries.html)
    * C - create: ```modelname.create()```
    * R - read: ```modelname.find()```, ```modelname.findOne()```, etc.
    * U - update: ```modelname.findOneAndUpdate()```
    * D - delete: ```modelname.findOneAndDelete()```
#### lecture 16:
* Mongoose hooks - code which runs before saving or after saving the data in DB
    * pre-hooks - code runs before saving data
    ```js
    // all pre hooks run before all post hooks even if they are written below post hooks
    userSchema.pre('save', function(){
        console.log('befor saving in database', this) // this will print data that has been sent to mongoDB to save in DB
    })
    ```
    * note : if a hooks is of same type then they will run in a sequence ( top to bottom )
    ```js
    // first this hook will run ...
    userSchema.pre('save', function(){
        // do stuff
    })

    // ... then this hook will run
    userSchema.pre('save', function(){
        // do some more stuff
    })
    ```
    * post-hooks - code runs after saving data
    ```js
    userSchema.post('save', function(doc){
        console.log('after saving in database', doc)  // this will print the data that has been saved in DB
    })
    ```
* validation property in schema
    * email-validator ( 3rd party npm library )
* If a value of any field in document is ```undefined``` then mongoDB will not save that field
#### lecture 17:
* hashing
    * salt or sected key: this is mixed with actual password string before hashing
        * eg: 
        actual password - 1234
        salt - abc
        password to be hashed - a12b3c4 ( abc + 1234 )
        hashed password (abc1234) - o03be7ye8
    * bcrypt ( 3rd party npm library )
