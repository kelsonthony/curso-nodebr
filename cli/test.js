const { deepStrictEqual, notDeepStrictEqual, ok } = require('assert')
const database = require('./database')
//const { exception } = require('console')



const DEFAULT_ITEM_CADASTRAR = { 
    id: 1,
    nome: 'Superman', 
    poder: 'Force'
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
}

describe('Bem-vindo à Suíte de manipulação de Herois', () => {

    before(async () => {
       //await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
       //await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it.only('01. Deve listar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        //const posicaoUm = resultado[0]

        deepStrictEqual(resultado, expected)
        console.log('expected: ', expected)
        console.log('resultado: ', resultado)
    })
    
    it('02. Deve cadastrar um heroi, usando arquivos', async () => {

        const expected = DEFAULT_ITEM_CADASTRAR
        // const expected = {
        //     ...DEFAULT_ITEM_CADASTRAR,
        //     id: 2,
        //     nome: 'Batman'
        // }
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepStrictEqual(actual, expected)
        console.log('actual: ', actual)
        console.log('expected: ', expected)
        console.log('resultado: ', resultado)

    })

    it.only('03. Deve remover o heroi por id', async() => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepStrictEqual(resultado, expected)
        console.log('expected: ', expected)
        console.log('resultado: ', resultado)
    })

    it.only('04. Deve Atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        const novoDado = {
            nome: 'Batman',
            poder: 'Money'
        }

        //const resultado = await database.atualizar(DEFAULT_ITEM_ATUALIZAR,id, novoDado)
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        console.log('resultado', resultado)
        deepStrictEqual(resultado, expected)
    })
})