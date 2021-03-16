const axios = require('axios')
const URL = `https://www.swapi.tech/api/people`

async function obterPessoas(nome) {
    const url =`${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}

// obterPessoas(1)
//     .then(function (resultado) {
//         console.log('resultado', resultado)
//     })
//     .catch(function (error) {
//         console.error('erro:', error);
//     })
module.exports = {
    //obterPessoas: obterPessoas
    obterPessoas
}