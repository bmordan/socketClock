var express = require('express')();
var http = require('http').createServer(express);
var io = require('socket.io')(http)

var timeModule = require('./timeModule')

express.set('views', __dirname + '/views');
express.set('view engine', 'ejs');

express.get('/', function(req, res) {
  res.send("Hello You")
})

express.get('/time', function(req, res){
  res.render('time')
})

http.listen(3000, function() {
  console.log("SERVER listening on :3000")
})

io.on('connection', function(socket) {
  setInterval(function(){
    socket.emit('updateTime', { updateTime: timeModule.theTime() });
  },1000)

  
})

