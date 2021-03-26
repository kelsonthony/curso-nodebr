const assert = require('assert')
const api = require('../api')
let app = {}


describe('Auth Test', function() {

    this.beforeAll( async () => {
        app = await api
    })

    it('Deve obter um Token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'joaosilva',
                password: '123'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        //console.log('dados auth', dados)

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })

})
