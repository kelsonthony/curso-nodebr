const assert = require('assert')
const Postgres = require('../db/strategies/postgres/postgres')
const heroisSchema = require('../db/strategies/postgres/schema/heroisSchema')
const Context = require('../db/strategies/base/contextStrategy')


const MOCK_HEROI_CADASTRAR = { 
    nome: 'Siperman',
    poder: 'Smart'
}

const MOCK_HEROI_ATUALIZAR = { 
    nome: 'Batman',
    poder: 'Dinheiro'
}

let context = {}

describe('Postgres Strategy Postgres', function() {
    this.timeout(Infinity)
    this.beforeAll(async function() {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, heroisSchema)
        context = new Context(new Postgres(connection, model))
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
        
    })
    it('Conexão PostgresSQL',  async function() {
        const result = await context.isConnected()
        assert.deepStrictEqual(result, true)
    })
    it('Cadastrar Heroi Postgres', async function() {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        //console.log('result', result)
        delete result.id
        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('Listar Herois Postgres', async () => {
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        delete result.id
        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
    });

    it('Atualizar o Heroi Postgres',  async () => {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id})
        assert.deepStrictEqual(result, 1)
        assert.deepStrictEqual(itemAtualizado.nome, novoItem.nome)
        
    });

    it('Remover Heori por Id Postgres', async () => {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepStrictEqual(result, 1)
    });
})