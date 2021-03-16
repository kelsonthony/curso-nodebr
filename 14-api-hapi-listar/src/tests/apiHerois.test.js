const assert = require('assert')
const api = require('./../api')

let app = {}

describe('Suite de testes da API Herois', function() {
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

    it('Listar a Rota /herois deve retornar somente 10 registros', async () => {
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

        //const statusCode = result.statusCode
        //assert.notDeepStrictEqual(statusCode, 500)
        assert.deepStrictEqual(result.payload, 'Erro interno no Servidor')
        
    })

    it('Listar a Rota /herois deve filtrar um item', async () => {
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
        //assert.deepStrictEqual(dados[0].nome, NAME)
        
    })
})