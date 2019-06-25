//dependencies
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//functions
const verifyToken = require('../../functions/verifyToken');

router.post('/admin', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json('Me parece que você não tem permissão para este tipo de ação! Redirecionando...');
        } else {
            res.json(authData);
        }
    });
})

module.exports = router;