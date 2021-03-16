const http = require('http')

http.createServer((resquest, response) => {
    response.end('Hello NodeJS')
})
.listen(4000, ()=> console.log('O servidor está rodando'))