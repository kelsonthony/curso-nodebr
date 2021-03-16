const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')


const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Teia'
}

const MOCK_HEROI_UPDATE = {
    nome: `Patolino-${Date.now()}`,
    poder: 'Velocidade'
}


let MOCK_HEROI_ID = ''


const context = new Context(new MongoDB())

describe('MongoDB Suíte de testes', function () {
    this.beforeAll( async () => {
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_UPDATE)
        MOCK_HEROI_ID = result._id;
    });
    
    it('Verificar Conexão MongoDB', async () => {
        const result = await context.isConnected()
        
        const expected = 'Conectado'

        assert.deepStrictEqual(result, expected)
        console.log('result Conexão MongoDB', result)
        console.log('expected Conexão MongoDB', expected)
    })

    it('Cadastrar Herói MongoDB', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepStrictEqual({nome: nome, poder: poder}, MOCK_HEROI_CADASTRAR)
        console.log('Resultado Cadastrar', { nome, poder })
    })

    it('Listar Herois MongoDB', async () => {
        // const result = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
        // console.log('result', result)
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
        const result = {
            nome, poder
        }
        assert.deepStrictEqual(result, MOCK_HEROI_DEFAULT)
        console.log('Resultado Listar', result)
    })

    it('Atualizar Herói MongoDB', async () => {
        
        //console.log('MOCK_HEROI_ID', MOCK_HEROI_ID)

        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
        })

        assert.deepStrictEqual(result.nModified, 1)

        console.log('Atualizar Heroi Resultado MongoDB', result)
        console.log('MOCK_HEROI_ID', MOCK_HEROI_UPDATE)
    })

    it('Remover o Heroi MongoDB',  async () => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepStrictEqual(result.n, 1)
        console.log('Resultado Remover Heroi', result)
    });
});