const service = require('./service')

Array.prototype.meuMap = function(callback) {
    const novoArrayMapeado = []
    for ( let indice = 0; indice <= this.length -1; indice++ ) {
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado
}

async function main() {
    try {
        const result = await service.obterPessoas('a')
        //const names = []
        // console.time('forEach')
        // result.results.forEach(function(item) {
        //     names.push(item.name)
        // })
        // console.timeEnd('forEach')
        // console.time('map')
        // const names = result.results.map(function(pessoa) {
        //     return pessoa.name
        // })
        // const names = result.results.map((pessoa) => pessoa.name)
        // console.timeEnd('map')
        console.time('meuMap')
        const names = result.results.meuMap(function(pessoa, indice) {
            //return pessoa.name
            return `[${indice} - ${pessoa.name}]`
        })
        console.timeEnd('meuMap')
        console.log('names', names)

    } catch (error) {
        console.error('Deu erro', error)
    }
}
main()