//install a node package globally via terminal, without adding it to a specific project
// npm i nodemon -g
// i == install or add
// g == global
// package is nodemon. This monitors files, and as you save, it automatically restarts the server
//  so we dont have to type 'node filename' now we type nodemon in the terminal, and dont have to type the filename IF the 
//file is named index.js as that is the default.
//or we could 
// install nodemon as a dev dependency, npm i nodemon -D


//now lets add a package to our project. Before we do that, we need to initialize npm for our project
// npm init
// use npm init -y to accept all defaults
// this creates a package.json file. Package.json is important bc it tells npm reads what packages to install for our project,
//this file will stay with our repository if we send it to github, but it wont send the packages itself

//npm i date-fns 
//date functions package will be installed as a dependancy and will be seen in our package.json file. Also, we now see node_modules
//directory and a package-lock.json


//if i was to pull down this repository, I would run
//npm install
// as this would read the package.json and install required dependencies

const {format} = require('date-fns');
const {v4:uuid} = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))
//replace scripts in package.json with this.
//    "scripts": {
//     "start": "node index",
//     "dev": "nodemon index" 
//  },
//start the project in dev mode with 'npm run dev'
//install another dependency 'npm i uuid' this allows us to generate IDs which are different for each entry.

console.log(uuid())