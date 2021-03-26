const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')

const app = new Hapi.Server({
    port: 4000
}) 

function mapRoutes(instance, methods) {
    
    return methods.map(method => instance[method]())
}

async function main() {

    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    //console.log('MapRoutes', mapRoutes(new HeroRoute(context), HeroRoute.methods()))


    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])

    await app.start()
    console.log('Server rodando na porta', app.info.port)

    return app

}
module.exports = main()