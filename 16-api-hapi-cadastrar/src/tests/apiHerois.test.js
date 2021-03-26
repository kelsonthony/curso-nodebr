const assert = require('assert')
const api = require('./../api')

let app = {}

const MOCK_HEROI_CADATRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

describe.only('Suite de testes da API Herois', function() {
    this.beforeAll( async () => {
        app = await api
    })
    it('Listar Herois /herois', async () => {
        const result = await app.inject({
            method: 'GET',
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
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)

        //console.log('dados 10?', dados.length === 10)
        console.log('dados 10?', dados.length)

        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('Listar a Rota /herois deve retornar um erro com o limite incorreto', async () => {
        const TAMANHO_LIMITE = 'Aeee'
        const result =  await app.inject({
            method: 'GET',
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
        const NAME = 'Homem Aranha-1615326499360'
        const result =  await app.inject({
            method: 'GET',
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
            payload: JSON.stringify(MOCK_HEROI_CADATRAR)
        })

        const statusCode = result.statusCode

        console.log('resultado', result.payload)

        const { message, _id } = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepStrictEqual(message, "Heroi Cadastrado com sucesso")
    })

})