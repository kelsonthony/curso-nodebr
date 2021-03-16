const BaseRoute = require('./base/baseRoute')

module.exports = class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    //const query = request.query
                    const { 
                        skip, 
                        limit, 
                        nome
                    } = request.query

                    //console.log('skip', typeof skip)
                    console.log('limit', limit)
    
                    let query = {}
                    if(nome) {
                        query.nome = nome
                    }

                    if(isNaN(skip))
                        throw Error('O tipo do skip é incorreto')
                    if(isNaN(limit))
                        throw Error('O tipo do limit é incorreto')
                    

                    return this.db.read(query, parseInt(skip), parseInt(limit))
                    
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

