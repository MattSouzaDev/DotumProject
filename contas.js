const express = require('express');
const app = express();
const rota = require('./routes/router');
const connectDB = require('./db/connect');


app.use(express.json())

app.use(express.static('./public'))
app.use('/', rota);

const port = 3000;

const startServer = async() => {
    try {
        await connectDB('mongodb+srv://allUsers:Y9ETTga0Sjjp5Jr6@nodeexpressprojects.5tt391l.mongodb.net/dotumProject?retryWrites=true&w=majority&appName=NodeExpressProjects')
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

