const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')
async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Herói")
        .option('-p, --poder [value]', "Poder do Herói")
        .option('-i, --id [value]', "ID do Herói")
        .option('-c, --cadastrar', "Cadastrar um heroi")
        .option('-l, --listar', "Listar um heroi")
        .option('-r, --remover', "Remover um heroi pelo ID")
        .option('-a, --atualizar [value]', "Atualizar um heroi pelo ID")
        .parse(process.argv)

    const heroi = new Heroi(Commander)

    
    try {

        if(Commander.cadastrar) {
            //console.log(heroi)
            delete heroi.id
            const resultado = await Database.cadastrar(heroi)
            if(!resultado) {
                console.error('Heroi não foi cadastrado')
                return;
            }
            console.log('Heroi Castrado com sucesso :)')
        }

        if(Commander.listar) {
            const resultado = await Database.listar()
            console.log('resultado', resultado)
            return;
        }
        if(Commander.remover) {
            const resultado = await Database.remover(heroi.id)
            if(!resultado) {
                console.error('Não foi possivel remover o herói')
            }
            console.log('Herói removido com sucesso')
            console.log('resultado', resultado)
            return;
        }

        if(Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar)
            //remoer todas as chaves que estão com undefined ou null
            const dado = JSON.stringify(heroi)

            const heroiAtualiar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualiar)

            if(!resultado) {
                console.error('Não foi possivel atualizar o herói')
                return
            }
            console.log('Heroi Atualizado com sucesso!')

        }
        
    } catch (error) {
        console.error('Deu Ruim', error)
    }
}

main()