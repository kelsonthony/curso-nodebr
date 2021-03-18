const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

const failAction = (request, headers, erro) => {
    throw erro;
}

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

module.exports = class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Deve listar Herois',
                notes: 'Pode paginar resultados e filtrar por nome',
                validate: {
                    //payload => body
                    //headers => header
                    //paramms => na URL :id
                    //query => ?skip=0&limit=100
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    },
                    headers,
                }
            },
            handler: (request, headers) => {
                try {
                    //const query = request.query
                    const { 
                        skip, 
                        limit, 
                        nome
                    } = request.query
                    //throw Error('Deu Ruim no list') // to check the boom
                    //const query = nome ? {nome: nome} : {}
                    const query = nome ? {
                        nome: {$regex: `.*${nome}*.`}
                    } : {}
                    // const query = {
                    //     nome: {$regex: `.*${nome || ""}*.`}
                    // }

                    return this.db.read(query, skip, limit)
                    
                } catch (error) {
                    console.log('Deu Erro', error)
                    return Boom.internal()
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Deve cadastrar Herois',
                notes: 'Pode cadastrar Heroi por nome e poder',
                validate: {
                    failAction,
                    headers,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { nome, poder } = request.payload
                    const result = await this.db.create({nome, poder})

                    //console.log('result', result)
                    return {
                        message: 'Heroi Cadastrado com sucesso',
                        _id: result._id
                    }

                } catch (error) {
                    console.log('Deu Erro no POST', error)
                    return Boom.internal()
                }
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Deve Atualizar o Herói por ID',
                notes: 'Pode Atualizar qualquer campo',
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    headers,
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params

                    const { payload } = request

                    const dadosString = JSON.stringify(payload)

                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)

                    console.log('result Atualizar', result) // { n: 1, nModified: 1, ok: 1 }
                    if(result.nModified !== 1) return Boom.preconditionFailed('Id não encontrado no banco')

                    return {
                        message: 'Herói Atualizado com Sucesso'
                    }

                } catch (error) {
                    console.error('Deu Ruim', error)
                    return Boom.internal()
                }
            }
        }
    }

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Deve Remover o Herói por ID',
                notes: 'O ID precisa ser válido',
                validate: {
                    failAction,
                    headers,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params
                    const result = await this.db.delete(id)

                    //console.log('result delete', result)

                    if(result.n !== 1) 
                        return Boom.preconditionFailed('Id não encontrado no banco')
                    return {
                        message: 'Herói Removido com sucesso'
                    }

                } catch (error) {
                    console.log('Deu Ruim', error)
                    return Boom.internal()
                }
            }
        }
    }

}

