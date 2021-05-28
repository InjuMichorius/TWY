const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')

const port = process.env.PORT || 3000

app.use(express.static('src/public'));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/public/views'))

app.get('/', function(req, res) {
    res.render("chatbot")
});

server.listen(port, () => {
    console.log('listening on port ', 'http://localhost:' + port)
})