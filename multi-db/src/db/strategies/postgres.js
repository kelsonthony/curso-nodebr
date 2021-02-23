const Icrud = require('./interfaces/interfaceCrud')

class Postgres extends Icrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em Postgres')
    }
}

module.exports = Postgres