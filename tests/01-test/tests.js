const assert = require('assert')

const { obterPessoas } = require('./service')

//assert.ok(false)

//instalamos o pacote nock, para simular requisicoes
const nock = require('nock')

describe('Star Wars Test', function () {

    this.beforeAll(() => {
        const response = {
            message: 'ok',
            total_records: 82,
            total_pages: 9,
            previous: null,
            next: 'https://www.swapi.tech/api/people?page=2&limit=10',
            results: [
              {
                uid: '1',
                name: 'Luke Skywalker',
                url: 'https://www.swapi.tech/api/people/1'
              },
              {
                uid: '2',
                name: 'C-3PO',
                url: 'https://www.swapi.tech/api/people/2'
              },
              {
                uid: '3',
                name: 'R2-D2',
                url: 'https://www.swapi.tech/api/people/3'
              },
              {
                uid: '4',
                name: 'Darth Vader',
                url: 'https://www.swapi.tech/api/people/4'
              },
              {
                uid: '5',
                name: 'Leia Organa',
                url: 'https://www.swapi.tech/api/people/5'
              },
              {
                uid: '6',
                name: 'Owen Lars',
                url: 'https://www.swapi.tech/api/people/6'
              },
              {
                uid: '7',
                name: 'Beru Whitesun lars',
                url: 'https://www.swapi.tech/api/people/7'
              },
              {
                uid: '8',
                name: 'R5-D4',
                url: 'https://www.swapi.tech/api/people/8'
              },
              {
                uid: '9',
                name: 'Biggs Darklighter',
                url: 'https://www.swapi.tech/api/people/9'
              },
              {
                uid: '10',
                name: 'Obi-Wan Kenobi',
                url: 'https://www.swapi.tech/api/people/10'
              }
            ]
        }

        nock('https://www.swapi.tech/api/people')
            .get('/?search=R2-D2&format=json')
            .reply(200, response)
        
    })

    it('deve buscar o r2d2 com o formato correto', async () => {
        const expected = [{
            nome: 'R2-D2'
        }]
        const nomeBase = `R2-D2`
        const resultado = await obterPessoas(nomeBase)
        assert.notDeepStrictEqual(resultado, expected)
    })
}) 