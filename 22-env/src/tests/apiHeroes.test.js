const assert = require('assert')
const api = require('../api')

let app = {}

const MOCK_HEROI_CADATRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

const MOCK_HEROI_INICIAL = {
    nome: 'Gavião Negro',
    poder: 'Flechas'
}

let MOCK_ID = '' 

const TOKEN_TEST = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvYW9zaWx2YSIsImlkIjoxLCJpYXQiOjE2MTU5ODY1OTd9.K83233cDthy63e0ZajJVjftTqElNj4S3CaEqjyUKr_8'

const headers = {
    authorization: TOKEN_TEST
}


describe('Suite de testes da API Herois', function() {
    this.beforeAll( async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            headers,
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })

        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id


    })
    it('Listar Herois /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            headers,
            url: '/herois?skip=0&limit=10'
        })
        
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        
        //console.log('result Listar Herois /herois', result)

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('Listar a Rota /herois deve retornar somente 4 registros', async () => {
        const TAMANHO_LIMITE = 4
        const result =  await app.inject({
            method: 'GET',
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)

        //console.log('dados 10?', dados.length === 10)
        //console.log('dados 10?', dados.length)

        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('Listar a Rota /herois deve retornar um erro com o limite incorreto', async () => {
        const TAMANHO_LIMITE = 'Aeee'
        const result =  await app.inject({
            method: 'GET',
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const errorResult = {"statusCode":400,"error":"Bad Request","message":"child \"limit\" fails because [\"limit\" must be a number]","validation":{"source":"query","keys":["limit"]}}

        assert.deepStrictEqual(result.statusCode, 400)
        assert.deepStrictEqual(result.payload, JSON.stringify(errorResult))

        //console.log('result', result)
        //console.log('errorResult', errorResult)
        
    })

    it('Listar GET Rota /herois deve filtrar um item', async () => {


        const TAMANHO_LIMITE = 1000
        const NAME = MOCK_HEROI_INICIAL.nome
        const result =  await app.inject({
            method: 'GET',
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)

        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados[0].nome === NAME)
    
        
    })

    it('Cadatrar POST - /herois', async () => {

        const result =  await app.inject({
            method: 'POST',
            url: '/herois',
            headers,
            payload: JSON.stringify(MOCK_HEROI_CADATRAR)
        })

        const statusCode = result.statusCode

        //console.log('resultado', result.payload)

        const { message, _id } = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepStrictEqual(message, "Heroi Cadastrado com sucesso")
    })

    it('Atualizar PATCH - /herois/:id', async () => {
        const _id = MOCK_ID

        const expected = {
            poder: 'Super Mira'
        }

        const result =  await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            headers,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.deepStrictEqual(dados.message, 'Herói Atualizado com Sucesso')
    })

    it('Atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto', async () => {
        const _id = '604fbc3453506824c547c33b'

        const dataAtualizar = {
            poder: 'Super Mira'
        }

        const result =  await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            headers,
            payload: JSON.stringify(dataAtualizar)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        //console.log('dados', dados)

        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco'
        }
        assert.ok(statusCode === 412)
        assert.deepStrictEqual(dados, expected)
    })

    it('Remover DELETE - /herois/:id', async () => {
        const _id = MOCK_ID

        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })

        const statusCode = result.statusCode

        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepStrictEqual(dados.message, 'Herói Removido com sucesso')
    });

    it('Remover DELETE - /herois/:id não deve remover', async () => {
        const _id = '604fbc3453506824c547c33b'

        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })

        const statusCode = result.statusCode

        const dados = JSON.parse(result.payload)

        //console.log('dados', dados)

        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco'
        }
        
        assert.ok(statusCode === 412)
        assert.deepStrictEqual(dados, expected)
    });

    it('Remover DELETE - /herois/:id não deve remover com ID inválido', async () => {
        const _id = 'ID_INVALIDO'

        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })

        const statusCode = result.statusCode

        const dados = JSON.parse(result.payload)

        //console.log('dados do erro 500', dados)

        const expected =  {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred'
        }
        
        assert.ok(statusCode === 500)
        assert.deepStrictEqual(dados, expected)
    });

})