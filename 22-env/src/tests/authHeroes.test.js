const assert = require('assert')
const api = require('../api')
const Context = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres/postgres')
const UserSchema = require('./../db/strategies/postgres/schema/userSchema')

let app = {}

const USER = {
        username: 'joaosilva',
        password: '123'
}

const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '$2b$04$nx5TUB89omC1xABiP9mM4OTtkNO2myd.L8z1hTnoBedV8HY5e2wkK'
}

describe('Auth Test', function() {

    this.beforeAll( async () => {
        app = await api

        const connectionPostgres = await Postgres.connect()
        const model = await Postgres.defineModel(connectionPostgres, UserSchema)
        const postgres = new Context(new Postgres(connectionPostgres, model))
        //const result = await postgres.update(null, USER_DB, true)
        await postgres.update(null, USER_DB, true)
    })

    it('Deve obter um Token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
            
        })

        //console.log('result', result)

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        //console.log('dados auth', dados)

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })

    it('Deve retornar não autorizado ao tentar obeter um login errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'kelson',
                password: '123'
            }
            
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        //console.log('dados', dados)

        assert.deepStrictEqual(statusCode, 401)
        assert.deepStrictEqual(dados.error, 'Unauthorized')


    });



})
