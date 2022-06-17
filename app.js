const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
dotenv.config({ path: './config/config.env' });
const AppError = require('./utils/AppError');
const errorHandler = require('./controllers/error/errorhandler');
const db = require("./config/dbConnection");
require('./config/dbConnection')();//db Connection

//require routes
const createuser = require('./routes/createuserRoute');
const creategroup = require('./routes/creategroupRoute');
const splitbill = require('./routes/splitbillRoute.js');
const displayExpense = require('./routes/displayexpenseRoute');

const PORT = process.env.PORT || 5000; 
const app = express();

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use('/user', createuser);
app.use('/group', creategroup);
app.use('/splitbill', splitbill);
app.use('/displayexpense',displayExpense);

app.all('*', (req, res, next) =>
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
