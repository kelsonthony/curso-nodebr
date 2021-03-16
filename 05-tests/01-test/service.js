const { get } = require('axios')

const URL = `https://www.swapi.tech/api/people`

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const result = await get(url)
    console.log('result.data: ',result.data)
    return result.data.results.map(mapearPessoas)
}

function mapearPessoas(item) {
    return {
        nome: item.name
    }
}

module.exports = {
    obterPessoas
}