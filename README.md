# SectorJBackEnd
this is the API for wizduds corp it will have endpoints for product database, inventory, and stripe payments  
# to install locally 
1. navigate to ``` cd sector-j-back-end-app ```
2. run ``` npm install ```
3. generate keys:
    --this does not really work--
    ssh-keygen -t rsa -P "" -b 4096 -m PEM -f jwtRS256.key
    --this gave me some idea of how the keys should be formated--
    http://travistidwell.com/jsencrypt/demo/
4. place keys in validation folder 
5. create a db in mongo DB: 
   1. run ``` use somedb ```
6. create a user for db:
    ``` db.createUser(
        {
        user: "someuser",
        pwd:  "somepassword",   // or cleartext password
        roles: [ { role: "readWrite", db: "somedb" } ]
        }
    ) ```
7. in the config folder edit database.config.js: 
   ```module.exports = {
    url: 'mongodb://someuser:somepassword!@localhost:27017/somedb',
} ```
8. create an adminKey.properties file in validation folder with the following
   ``` adminKey= ```
9.  add a user in mongo 
   ``` db.products.insert( { name: "some username", email: "someemail@gmail.com", password: "somepassword" } ) ```
10. gather the id created in mongo db for that user and place in adminKey.properties
    ``` {
  acknowledged: true,
  insertedIds: { '0': ObjectId("somekey12345") }
} ```
place in adminKey.properties:
``` adminKey=somekey12345 ```