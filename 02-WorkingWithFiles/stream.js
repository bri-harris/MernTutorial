const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf-8' });

const ws = fs.createWriteStream('./files/lorem-copy.txt');

// rs.on('data', (dataChunk)=>{
//     ws.write(dataChunk);
// })

//more efficient version of the above
rs.pipe(ws);