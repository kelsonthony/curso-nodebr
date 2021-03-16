/**
 * docker ps
    docker exec -it c398f87ca38f mongo -u admin -p senhadmin --authenticationDatabase admin
    show dbs
    use herois
    show collections
    
 */
db.herois.insert({
    nome: 'Superman',
    poder: 'Força',
    dataNascimento: '1986-01-01'
})

for(let i = 0; i <= 100000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1986-01-01'
    })  
}

db.herois.find()
db.herois.find().pretty()
db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({nome: -1})
db.herois.find({}, {poder: 1, _id:0})

//create
db.herois.insert({
    nome: 'FLash',
    poder: 'Velocidade',
    dataNascimento: '1986-01-01'
})

//read
db.herois.find()

//update
db.herois.find({nome: 'FLash'})

db.herois.update(
    {_id: ObjectId("603690f60838005b9d0daaf0") }, 
    { nome: 'Wanda'}
    )

db.herois.update(
    {_id: ObjectId("6047ed237a55171be60a8d9f"), },
    { $set: { nome: 'Lanterna Verde', poder: 'Anel' } }
)


db.herois.update(
    {_id: ObjectId("603692110838005b9d0daaf1"), },
    { $set: { name: 'Lanterna Verde' } }
)

db.herois.update(
    { poder: 'Velocidade' },
    { $set: { poder: 'Super Força' } }
)

db.herois.findOne({_id: ObjectId("603692110838005b9d0daaf1")})

db.herois.find({poder: 'Super Força'}).limit(1000).sort({nome: -1})

//delete
db.herois.remove({})