const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelpers')

const SENHA = '@kelsonthony123'

const HASH = '$2b$04$kykqZWMrE4oYhVyYXeh1b.ub9TL/h/tlrN5y8XMLV4shLBHk4GfXy'

describe('UserHelper test suite', function() {
    
    it('Deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)
        
        //console.log('result my hash', result)
        
        assert.ok(result.length > 10)
    });

    it('Deve comparar uma senha e o seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)

        //console.log('my result compare', result)
        assert.ok(result)
    });
});