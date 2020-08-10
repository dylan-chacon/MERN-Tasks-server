const express = require('express');
const conectarDB = require('./config/db');
//servidor
const app = express();
//conectar db
conectarDB();
//Habilitar express.json
app.use(express.json({ extended: true }));
//puerto
const PORT = process.env.PORT || 4000;
//importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
//arrancar
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})