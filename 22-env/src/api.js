const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const Postgres = require('./db/strategies/postgres/postgres')
const UserSchema = require('./db/strategies/postgres/schema/userSchema')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = 'MINHA_CHAVE_123'

const app = new Hapi.Server({
    port: 4000
}) 

function mapRoutes(instance, methods) {
    
    return methods.map(method => instance[method]())
}

async function main() {

    const connectionMongoDB = MongoDb.connect()
    const contextMongoDB = new Context(new MongoDb(connectionMongoDB, HeroiSchema))
    
    const connectionPostgres = await Postgres.connect()

    const model = await Postgres.defineModel(connectionPostgres, UserSchema)
    const contextPostgres = new Context(new Postgres(connectionPostgres, model))

    const swaggerOptions = {
        info: {
            title: 'API Herois',
            version: 'v1.0'
        },
        lang: 'pt'
    }

    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expirenIn: 20
        // }
        validate: async (dado, request) => {
            
            const [result] = await contextPostgres.read({
                username: dado.username.toLowerCase()
                //id: dado.id
            })

            //console.log('api result', result)

            if(!result) {
                return {
                    isValid: false
                }
            }
            //verficar no bnaco se usuário continua ativo
            //console.log('api dado', dado)
            return {
                isValid: true //caso não válido é false
            }
        }
    })

    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new HeroRoute(contextMongoDB), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods())
    ])

    await app.start()
    console.log('Server rodando na porta', app.info.port)

    return app

}
module.exports = main()