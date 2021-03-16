const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function(callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for(let index = 0; index <= this.length -1; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }

    return valorFinal
}

async function main() {
    try {
        const { results } = await obterPessoas(`a`);

        // console.time('reduce')
        // const pesos = results.map(item => parseInt(item.height))
        // console.log('pesos', pesos)
        // // [50,5, 70,6, 56] = 0
        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo
        // }, 0)

        // console.log('total', total)
        // console.timeEnd('reduce')
        console.time('meuReduce')
        const pesos = results.map(item => parseInt(item.height))
        console.log('pesos', pesos)
        // [50,5, 70,6, 56] = 0
        const minhaLista = [
            ['Kelson', 'Anthony'],
            ['NodeBR', 'EBSCO']
        ]

        const total = minhaLista.reduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, [])
        .join(',')
        console.log('total', total)
        console.timeEnd('meuReduce')

    } catch (error) {
        console.error('Meu error', error)
    }
}
main()