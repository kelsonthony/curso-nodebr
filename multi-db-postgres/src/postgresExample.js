//npm install --save sequelize
//npm install pg-hstore pg
const Sequelize = require('sequelize')
const driver = new Sequelize(
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

async function main() {
    const heroes = driver.define('heroes', {
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
    await heroes.sync()
    // await heroes.create({
    //     nome: 'Superman',
    //     poder: 'Force'
    // })
    const result = await heroes.findAll({
        raw: true,
        attributes: ['nome']
    })
    console.log('result', result)
}
main()