const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//servidor
const app = express();
//conectar db
conectarDB();
//habilitar cors
app.use(cors());
//Habilitar express.json
app.use(express.json({ extended: true }));
//puerto
const port = process.env.PORT || 4000;
//importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
//arrancar
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
})