const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

const failAction = (request, headers, erro) => {
    throw erro;
}

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
                    }
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
                    return "Erro interno no Servidor"
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction,
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
                    return 'Internal Error :(!'
                }
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
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
                    if(result.nModified !== 1) return {
                        message: 'Nâo foi possível atualizar'
                    }

                    return {
                        message: 'Herói Atualizado com Sucesso'
                    }

                } catch (error) {
                    console.error('Deu Ruim', error)
                    return 'Erro Interno!'
                }
            }
        }
    }

}

