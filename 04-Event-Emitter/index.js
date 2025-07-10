const logEvents = require('./logEvents');

//work with the events common coure module
const EventEmitter = require('events');

//define an EventEmitter class
class MyEmitter extends EventEmitter {};

//initialize an instance of our class
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on('log',(msg)=> logEvents(msg));

//emmit the event to test this out, set a timeout for our understanding
setTimeout(()=>{
    //emit event
    myEmitter.emit('log', 'log event emitted!');
}, 2000);