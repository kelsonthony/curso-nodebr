const Mongoose = require('mongoose')
Mongoose.connect('mongodb://kelson:minhasenhasecreta@localhost:27017/herois', 
    { useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
        if(!error) return;
        console.log('Falha na conexão!', error)
    })

const connection = Mongoose.connection

connection.once('open', () => console.log('database rodando!!'))

// setTimeout(()=> {
//     const state = connection.readyState
//     console.log('state', state)
// }, 1000)

/**
 * Estados
 * 0: Desconectado
 * 1: Conectado
 * 2: Conectando
 * 3: Desconectando
 */

const heroisSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroisSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('resultado cadastrar', resultCadastrar)

    const listItens = await model.find()

    console.log('Listar items', listItens)
}   

main()
