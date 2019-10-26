var http = require("http");

http.createServer(function(recq,resp){
    resp.end("<h1>Bem vindo ao site</h1><br><h4>Guia do programador.com</h4>");    
}).listen(8181);

console.log("Server running!");
console.log("Input on browser=> localhost:8181");
