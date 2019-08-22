let express = require('express');
let app = express();
let http = require('http');
let socketIo = require('socket.io');

var server = http.createServer(app);
var io = socketIo.listen(server);
server.listen(8000);
app.use(express.static(__dirname + '/public'));
console.log("ligado na porta 8000");

var dados = [];

io.on('connection', function (socket) {

    dados.forEach(element => socket.emit('client_risco', element));

    socket.on('serve_risco', function (data) {
        console.log(data.giz)
        dados.push(data.giz);
        io.emit('client_risco', data.giz);
    });
});