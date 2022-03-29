# SectorJBackEnd
this is the API for my indie comic book review site  
# To generate JWT keys you run the following 
    ssh-keygen -t rsa -P "" -b 4096 -m PEM -f jwtRS256.key
# to add the DB user run the following 
    db.createUser(
        {
        user: "julianduranmt",
        pwd:  "Bmwilk0422!",   // or cleartext password
        roles: [ { role: "readWrite", db: "sectorJ" } ]
        }
    )