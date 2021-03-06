const EventEmitter = require("events");
const http = require('http')
// Sales <- EventEmitter <- events
class Sales extends EventEmitter{
    constructor(){
        super();
    }
}
const myEmitter = new EventEmitter();

myEmitter.on('newSale', ()=>{
    console.log('There was a new sale');
});

myEmitter.on('newSale', ()=>{
    console.log('Customer name: Jonas');
});

myEmitter.on('newSale', stock=>{
    console.log(`There are ${stock} items left is stock.`);
});
myEmitter.emit('newSale', 10);

/////////////////////////////////////////////////////////////
const server = http.createServer();

server.on("request", (req, res)=>{
    console.log("Request received!");
    console.log(req.url);
    res.end("Request received!");
});

server.on("request", (req, res)=>{
    console.log("Another Request received!");
});

server.on("close", ()=>{
    console.log("Server closed!");
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log('Server running at 8000');
})
