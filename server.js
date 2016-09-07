var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection" , function(socket){
	console.log("we have a connection");
	socket.on("new-message", function(msg){
		console.log(msg);
		io.emit("receive-message",msg);
	})	
});

http.listen("8080", function(){
	console.log("we are connected")
});
