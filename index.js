/**
 * Obter um usuário
 * 1 Obter o número de telefone de um usuário a partir de seu ID
 * 2 Obter o endereço do usuári pelo ID
 */
//importamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    /**
     * quando der algum problema -> reject(ERRO)
     * quando success -> resolve
     */
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            //return reject(new Error('DEU error com o Reject'))
            return resolve({
                id: 1,
                nome: 'Mchilanny Bussinguer',
                dataNacimento: new Date()
            })
        }, 1000)

    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout( () => {
        
            return resolve({
                numero: '123456',
                ddd: 61
            })
        }, 2000)
    })
   
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'rua dos bobos',
            numero: 0
        })
    }, 2000)
}

const usuarioPromise = obterUsuario()
//para manipular com sucesso .then
//para manipular erros, usamos o .catch
// usuario -> telefone ->  a última função é o telefone
usuarioPromise
    .then(function(usuario) {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function(resultadoAnterior) {
        const endereco = obterEnderecoAsync(resultadoAnterior.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultadoAnterior.usuario,
                telefone: resultadoAnterior.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado) {
        //console.log('resultado', resultado)
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
        `)
    })
    .catch(function (error) {
        console.error('DEU ERRO', error)
    })


// obterUsuario(function resolverUsuario(error, usuario) {
//     // null || "" | 0 === false
//     if(error) {
//         console.error('Deu ruim em USUARIO', error)
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error1) {
//             console.error('Deu ruim em Telefone', error1)
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error2) {
//                 console.error('Deu ruim em Telefone', error2)
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereco: ${endereco.rua},${endereco.numero},
//                 Telefone: (${telefone.ddd}),${telefone.numero}
//             `)
//         })
//     })
// })
//const telefone = obterTelefone(usuario.id)

//console.log('telefone', telefone)
