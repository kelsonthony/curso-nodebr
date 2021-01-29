const { obterPessoas } = require('./service')

/**
 * const item = { 
 *      nome: 'Mchilanny',
 *      idade: 39
 *      genero: 'feminino'
 * }
 * const { nome, idade } = item
 * console..log(nome, idade)
 */

Array.prototype.meuFilter = function(callback) {
    const lista = []
    for( index in this) {
        const item = this[index]
        const resultado = callback(item, index, this)
        // o, "", null, undefined === false
        if(!resultado) continue;
        lista.push(item)
    }

    return lista
}

async function main() {
    try {
        const { results } = await obterPessoas("a");

        console.time('filter')
        const familaLars = results.filter(function (item) {
        //por padrão precisa retornar um booleano
        //para informar se deve manter ou remover da lista
        // fase > remove da lista se
        // true > mantem
        // não encontrou = -1
        // encontrou = posicaoNoArray
        const result = item.name.toLowerCase().indexOf(`lars`) !== -1;

        return result;
        });
        console.timeEnd('filter')
        console.time('meuFilter')
        const familaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })

        const names = familaLars.map((pessoa) => pessoa.name);
        console.timeEnd('meuFilter')
        console.log(names);
    } catch (error) {
        console.error("error", error)
    }
}
main();

