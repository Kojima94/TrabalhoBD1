// Dependencias
const express = require('express');
const app = express();
const fb  = require('firebird');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');
sys = require('util');

app.use(cors());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/dist/timectrl'));

// Middlewares
const verifyToken = require('./functions/verifyToken');
const reportError = require('./functions/reportError');

// Rotas
app.use('/api/', require('./routes/api/registros'));
app.use('/api/', require('./routes/api/extras'));
app.use('/api/', require('./routes/api/login'));
app.use('/api/', require('./routes/api/admin'));
app.use('/api/', require('./routes/api/users'));
app.use('/api/', require('./routes/api/usuarios'));
app.use('/api/', require('./routes/api/externos'));

// Inicializando...
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));