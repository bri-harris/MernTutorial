//now importing filesystem promises instead of just fs callback version
const fsPromise = require('fs').promises;
const path = require('path');

const fileOps = async () => {
  try {
    const data = await fsPromise.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8');//dont need the callback  (err, data) => {
        console.log(data);
        await fsPromise.unlink(path.join(__dirname, 'files', 'starter.txt'))
        
        await fsPromise.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromise.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you Bri');
        await fsPromise.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        const newData = await fsPromise.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf-8');
        console.log(data);
    }
  catch (err) {
    console.error(err);
  }
}

fileOps();

// fsPromise.readFile(path.join(__dirname, 'files', 'starter.txt'),'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// })