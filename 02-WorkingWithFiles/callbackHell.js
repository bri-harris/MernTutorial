// This is a demostration of CALLBACK HELL while working with read/writing files in Node
// filesystem modules
const fs = require('fs');

//path module so we dont have to hardcode paths
const path = require('path');

// fs.readFile('./files/starter.txt','utf-8', (err, data) => {
//   if (err) throw error;
//   console.log(data);
// })
fs.readFile(path.join(__dirname, 'files', 'starter.txt'),'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
})

//node is Asynchronous
console.log("Node is asynchronous! this is after initial readFile call");


fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you Bri',(err) => {
  if (err) throw err;
  console.log('Write complete.'); // This will not run until the file is written

  //calls are asynchronous, we dont want to overwrite the file if it already exists so use append in writeFile
  fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it',(err) => {
  if (err) throw err;
  console.log('Append complete.'); // This will not run until the file is written
})
})


//exit on oncaught error
process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); // Exit the process with a failure code
});