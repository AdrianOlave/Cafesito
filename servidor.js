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
const { Server: IOServer } = require('socket.io')
const io = new IOServer(httpServer)


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

app.use('/login', (req, res) => {
    res.render("login")
});

app.use('/register', (req, res) => {
    res.render("register")
});

io.on('connection',(socket) => {
    console.log('Un cliente se ha conectado')
    socket.on('message', data => console.log(data))
})





httpServer.listen(PORT, () => { console.log("Se inicio el servidor en el puerto N° " + PORT) })
