# Docker

# comandos
$ docker ps
firewall-cmd ––permanent ––add-port=80/tcp

docker run --name some-postgres -e POSTGRES_USER=root -e POSTGRES_PASSWORD=kyxxp2 -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

docker run \
    --name postgres \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=kyxxp2 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker ps

docker exec -it postgres /bin/bash


docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer  

http://localhost:8080/


## ---- MONGODB
 
firewall-cmd --zone=public --add-port=27017/tcp --permanent

docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhadmin \
    -d \
    mongo:4
## Start MongoDB
docker run -p 27017:27017 mongodb

## Mongo Client
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

http://localhost:3000/

docker container exec -it mongodb \
    mongo --host localhost -u admin -p senhadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'kelson', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois'}]})"

docker exec -it mongodb \
    mongo --host localhost -u admin -p senhadmin --authenticationDatabase herois \
    --eval "db.getSiblingDB('herois').createUser({user: 'kelson', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois'}]})"


Teste com o Mocha mocha *.test.js

Run Test
npm run test:watch