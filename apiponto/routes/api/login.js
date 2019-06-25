//dependencies
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fb  = require('firebird');
const bcrypt = require('bcrypt');

//functions
const reportError = require('../../functions/reportError');

router.get('/login', (req, res) => {
    var con = fb.createConnection();
    var qreturn = [];
    var resposta = [];
    con.connect('test.fdb', 'sysdba', 'dsat', 'admn', function(err) {
        if (reportError(res, err)) return;
        var sql = `SELECT ROLE, CTPS, SENHA FROM USUARIO WHERE LOGIN='${req.query.login}'`;
        con.query(sql, (err, qres) => {
            if (reportError(res, err)) return;
            qres.fetch('all', true, (obj) => {
                qreturn.push(obj);
            }, (err) => {
                if (reportError(res, err)) return;
                try {
                    bcrypt.compare(req.query.senha, qreturn[0].SENHA, (err, resp) => {
                        if (resp == true) {
                            const dataAuth = {
                                ctps: qreturn[0].CTPS,
                                role: qreturn[0].ROLE,
                                user: req.query.login
                            };
                            jwt.sign(dataAuth, 'secretkey', (err, token) => {
                                if (reportError(res, err)) return;
                                resposta.push({
                                    msg: 'OK',
                                    token,
                                    dataAuth
                                });
                                res.send(resposta);
                            });
                        } else {
                            resposta.push({
                                msg: 'ERRO'
                            });
                            res.send(resposta);
                        }
                    });
                } catch {
                    res.json('Erro ao checar informações do usuário. Tente um usuário/senha válidos!');
                }
            });
        });
    });
});

module.exports = router;