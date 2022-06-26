const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Router } = express;
const router = Router();
const { Server: HttpServer } = require('http')
const app = express();
const dotenv = require('dotenv');
const httpServer = new HttpServer(app)
const PORT = process.env.PORT || 5050
const homeRouter = require('./routes/homeRoute')
const serviceRouter = require('./routes/serviceRouter')
const responseRouter = require('./routes/responseRouter')



dotenv.config();

app.set('view engine', 'ejs')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/service', serviceRouter);
app.use('/response', responseRouter);




httpServer.listen(PORT, () => { console.log("Se inicio el servidor en el puerto N° " + PORT) })
