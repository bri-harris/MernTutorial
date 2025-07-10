const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//cross origin resource sharing
app.use(cors(corsOptions));

//built-in middleare to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json, supplied to all routes as it comes in
app.use(express.json());

//Serve static files with middleware
app.use(express.static(path.join(__dirname, '/public')));

//router created and used for specified folders
app.use('/',require('./routes/root'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth '));
app.use('/employees', require('./routes/api/employees'));

app.use((req, res) => {
  res.status(404);
  if(req.accepts('html')){
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  }
  else if(req.accepts('json')){
      res.json({error: "404 Not Found"});
  } else {
      res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));