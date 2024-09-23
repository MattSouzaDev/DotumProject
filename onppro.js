const express = require('express');
const app = express();
const rota = require('./routes/router');
const connectDB = require('./db/connect');
require('dotenv').config()


app.use(express.json())

app.use(express.static('./public'))
app.use('/', rota);

const port = 3000;

const startServer = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        if (connectDB){
            console.log('\n' + '       ----- Status do Servidor -----       '+'\n'+'\n'+
            '-- Connectado com MongoDb...')
            app.listen(port, console.log(`-- Servidor aberto no porto: ${port}...`))
        }

    } catch (error) {
        console.log(error)
    }
}

startServer();

