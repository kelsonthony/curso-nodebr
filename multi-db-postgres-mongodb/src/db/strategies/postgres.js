const Icrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')


class Postgres extends Icrud {
    constructor() {
        super()
        this._driver = null
        this._heroes  = null
        //this._connect()
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true;
        } catch (error) {
            console.log('fail to postgres connect', error)
            return false;
        }
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'root',
            'kyxxp2',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
        await this.defineModel()
    }

    async defineModel() {

        this._heroes = this._driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
        await this._heroes.sync()
    }

    async create(item) {
        //console.log('O item foi salvo em Postgres')
        const {dataValues} = await this._heroes.create(item)
        return dataValues
    }

    async read(item = {}) {
        const result = await this._heroes.findAll({where: item, raw: true})
        
        return result;
    }
    async update(id, item) {
        console.log('item: ', item)
        const result = await this._heroes.update(item, {where: {id : id}})
        console.log('result: ', result)
        return result
    }

    async delete(id) {
        const query = id ? {id: id} : {}
        return this._heroes.destroy({where: query})
    }
}

module.exports = Postgres