const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res)=>{
    console.log('this is server')

    console.log(req.method)
    console.log(req.url)

    res.setHeader('Content-Type', 'text/html')

    fs.readFile('./index.html', (err, data)=>{
        if(err){
            console.log(err.toString())
            res.write(err.toString())
        }
        else{
            res.write(data.toString())
        }
        res.end()
    })

    // res.write('hello\n')
    // res.write('hello again')

    // res.end('hi')
})

server.listen(3000, 'localhost', ()=>{
    console.log('server running on 3000')
})