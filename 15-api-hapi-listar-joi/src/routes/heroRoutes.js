const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

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
                    failAction: (request, headers, erro) => {
                        throw erro;
                    },
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

    // create() {
    //     return {
    //         path: '/herois',
    //         method: 'POST',
    //         handler: (request, headers) => {
    //             return this.db.read()
    //         }
    //     }
    // }
}

