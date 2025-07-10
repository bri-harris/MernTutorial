//these are the only modules which required npm
const {format} = require('date-fns');
const {v4:uuid} = require('uuid');

//these are from common core 
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

//define a log events function we can export
const logEvents = async (message,logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName), logItem)
    }catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

//export our logEvents function so it can be imported in our index.js file
module.exports = {logEvents, logger };
