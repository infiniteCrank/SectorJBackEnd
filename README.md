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
   1. run ``` use sectorJ ```
6. create a user for db:
    ``` db.createUser(
        {
        user: "julianduranmt",
        pwd:  "Bmwilk0422!",   // or cleartext password
        roles: [ { role: "readWrite", db: "sectorJ" } ]
        }
    ) ```