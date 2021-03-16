const service = require('./service')

async function main() {
    try {
        const result = await service.obterPessoas('a')
        //const names = []
        // console.time('forEach')
        // result.results.forEach(function(item) {
        //     names.push(item.name)
        // })
        // console.timeEnd('forEach')
        console.time('map')
        // const names = result.results.map(function(pessoa) {
        //     return pessoa.name
        // })
        const names = result.results.map((pessoa) => pessoa.name)
        console.timeEnd('map')
        console.log('names', names)

    } catch (error) {
        console.error('Deu erro', error)
    }
}
main()