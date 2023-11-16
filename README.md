# Backend-Nodejs
YT Playlist: https://www.youtube.com/playlist?list=PL-Jc9J83PIiEnK1q9tuVrrORqKBexcE_J

### Routes
* `/`, GET : returns 'this is home page'
* `/user`, GET, POST, PATCH, DELETE : returns all registered users
* `/user/setCookies`, GET : sets cookies in browser (cookies names -> isLoggedIn, 2ndcookie, temp)  
* `/user/getCookies`, GET : returns cookies set on browser
* `/user/:id`, GET : returns a perticular user with _id=':id'
* `/auth/signup`, GET : returns a signup page
* `/auth/signup`, POST : registers a user in database
* `/auth/login`, GET : returns a login page
* `/auth/login`, POST : logs in a user based on his email and password 
* `/auth/logout`, GET : logs out the user (removes isLoggedIn cookie)

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
        * can not maintain ACID properties (atomicity, consistency, isolation, and durability)
        * not used in banking systems
#### lecture 14:
* mongoDB Atlas
* schema
* model
* creating a new document in mongoDB Atlas using ```modelname.create()```
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
#### lecture 18:
* cookies -
    * used to store data in users browser
    * this will be sent in every req object from browser
    * value of 'expires' key is by default 'session'
    * if key 'expires' is set to 'session' in browsers inspect->applicatoin->cookies it means that the cookie will not expire until the tab is closed
    * cookie-parser( 3rd party npm library )
    * maxAge property is in miliseconds
    ```js
    res.cookie('isLoggedIn', true, {maxAge:24*60*60*1000, secure:true, httpOnly:true});
    // 1st parameter : cookie name
    // 2nd parameter : cookie value
    // 3rd parameter : params
        // maxAge: it tell when the cookie will expire ( default to 'session' )
        // secure: if true then we can access only through 'https' and not from 'http'
        // we can access our cookie from frontend by using 'document.cookie'
        // httpOnly: if this is set to true then we cannot access cookies from frontend it will be accessable to backend only
    ```
* cookie-parser ( 3rd party npm library )
    * don't forget to put this line at top when working with cookies
    * `app.use(require('cookie-parser'))`

#### lecture 19:
* creating login function
* refactoring the code

### lecture 20:
* protecting routes using middleware
    * checking if the user is logged-in in the middleware if the user is logged-in then dummy secret key will be shown to user, else the user will be redirected to login page
    * if the user is logged in then `next()` function will be called in middleware else the user will be redirected to `/auth/login` in the middleware itself

### lecture 21:
#### JWT : Json Web Tokens
* Only backend contains a secret key
* JWT consist of 3 things
    * Header : Contains Encyption Algorithm
    * Payload : Unique id (UID) ( we can set this ID )
    * signature : Secret key + UID + Encryption Algorithm
* JWT is present in frontend, The frontend sends the JWT to the backend at the time of user login
* Backend receives the JWT and uses the Header and Payload from the JWT sent by the frontend and a Secret key which is present only on backend and creates a signature and sends the JWT back to the frontend which consists -> Header (previous) + Payload (previous) + Signature (created by backend)
* Frontend receives the JWT sent by the backend after user logs in and stores that JWT in the browser
* This JWT will be sent to the backend everytime a user request to access a route which is accessable to only logged in users
* After user Logs in:
    * Let's say user logged in and requests a url which is accessable to only logged in users, at this time frontend will send the JWT to the backend
    * Backend will receive that JWT and use Header and Payload of JWT and it will use Secret key present in backend to create a signature
    * If the newly created signature on the backend and the signature present in received JWT are same, it means that the user is authentic, then the backend will send the response to the user
    * If the signatures doesn't match, it means that the user is not authentic or the user is not logged in, backend will respond with a message like 'You are not allowed to access this route'

##### summary
* Backend -> contains a Secret Key
* Frontend -> contains JWT (Header, Payload, Signature (will be created by backend))
* login request:
    * Frontend sends JWT (Header, Payload, Signature (will be created afterwards))
    * Backend receives JWT and creates a signature (Header+Payload+Secret key(present only on Backend))
    * Backend attaches the created signature and send the JWT back to frontend
    * Frontend stores the received JWT on browser
* requests after login:
    * Frontend sends JWT (Header, Payload, Signature(created by Backend))
    * Backend uses JWT received by frontend and make a new signature
    * Backend compares newly created signature and signature present in JWT and authenticate the user if both signatures are same
* <i>you can see payload and header inside a token on [jwt.io](jwt.io)</i>

### lecture 22:
<i>Note: will be working in `app` folder now onwards<i>
#### MVC Architecture ( software architecture )
* Model : stores and manages data
* View : GUI related
* Controller (Brain of Application) : connects Model and View
* Breaked the code in MVC Architecture in `app` folder
