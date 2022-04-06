# SectorJBackEnd
this is the API for my indie comic book review site  
# To generate JWT keys you run the following 
    --this does not really work--
    ssh-keygen -t rsa -P "" -b 4096 -m PEM -f jwtRS256.key
    --this gave me some idea of how the keys should be formated--
    http://travistidwell.com/jsencrypt/demo/
# to add the DB user run the following 
    db.createUser(
        {
        user: "julianduranmt",
        pwd:  "Bmwilk0422!",   // or cleartext password
        roles: [ { role: "readWrite", db: "sectorJ" } ]
        }
    )