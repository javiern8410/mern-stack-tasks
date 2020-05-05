const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/task.routes');
const path = require('path');

const { mongoose } = require('./database');

const app = express();

// Settings 
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/tasks', routes);
// console.log(path.join(__dirname, 'public'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${app.get('port')}`);
});
