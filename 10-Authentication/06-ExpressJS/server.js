const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

//define a route, any get request to the root can have a handle defined
//regex, begin with & end with / OR /index.html
app.get(/^\/$|\/index(.html)?/, (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname,'views','index.html'));
});

app.get(/new-page(.html)?/, (req, res) => {
    res.sendFile(path.join(__dirname,'views','new-page.html'));
});
app.get(/old-page(.html)?/, (req, res) => {
    res.redirect(301,'new-page.html'); //302 by default
});
//route Handlers
app.get(/hello(.html)?/, (req, res, next) => {
    console.log('attempted to load hello.html');
    next() //move on to the next relevant route /handler
},(req, res) => {
    res.send('Hello World!');
});

//chained route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

app.get(/chain(.html)?/, [one, two, three]);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));