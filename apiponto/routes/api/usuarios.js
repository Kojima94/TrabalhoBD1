//dependencies
const express = require('express');
const router = express.Router();
const fb  = require('firebird');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//functions
const reportError = require('../../functions/reportError');

router.get('/usuarios', (req, res) => {
    var con = fb.createConnection();
    var json = [];
    con.connect('test.fdb', 'sysdba', 'dsat', 'admn', function(err) {
        if (reportError(res, err)) return;
        else var sql = `SELECT NOME, LOGIN, CTPS, ROLE, CARGAHR FROM USUARIO WHERE STATUS = 'A'`;
        con.query(sql, (err, qres) => {
            if (reportError(res, err)) return;
            qres.fetch('all', true, (obj) => {
                json.push(obj);
            }, (err) => {
                if (reportError(res, err)) return;
                res.send(json);
            });
        });
    });
})

router.get('/usuario', (req, res) => {
    var con = fb.createConnection();
    var json = [];
    con.connect('test.fdb', 'sysdba', 'dsat', 'admn', function(err) {
        if (reportError(res, err)) return;
        var sql = `SELECT NOME, CTPS, LOGIN, ROLE, CARGAHR FROM USUARIO WHERE STATUS = 'A'`;
        if (req.query.ctps) {
            sql = sql + ` AND ctps = '${req.query.ctps}'`
        }
        if (req.query.nome) {
            sql = sql + ` AND LOGIN = '${req.query.nome}'`
        }
        con.query(sql, (err, qres) => {
            if (reportError(res, err)) return;
            qres.fetch('all', true, (obj) => {
                json.push(obj);
            }, (err) => {
                if (reportError(res, err)) return;
                res.send(json);
            });
        });
    });
});


router.post('/usuario', (req, res) => {
    var con = fb.createConnection();
    var body = req.body;
    var pass = body.senha;
    bcrypt.hash(pass, saltRounds, (err, hash) => {
        if (reportError(res, err)) return;
        con.connect('test.fdb','sysdba','dsat', 'adm', (err) => {
            if (reportError(res, err)) return;
            con.query(`INSERT INTO USUARIO (NOME, LOGIN, CTPS, ROLE, SENHA, CARGAHR) 
            VALUES('${body.nome}', '${body.login}', '${body.ctps}', '${body.role}', '${hash}', '${body.cargahr}')`, 
            (err, qres) => {
                if (reportError(res, err)) return;
                con.commit((err) => {
                    if (reportError(res, err)) return;
                    res.send({msg: 'Usuário criado!'});
                })
            });
        }); 
    });
})

router.patch('/usuario', (req, res) => {
    var con = fb.createConnection();
    var json = req.body;
    if (req.body.senha) {
        var pass = req.body.senha;
    }
    console.log(json);
    con.connect('test.fdb','sysdba','dsat', 'adm', (err) => {
        if (reportError(res, err)) return;
        var sql = `UPDATE USUARIO SET NOME = '${json.nome}', LOGIN = '${json.login}', ROLE = '${json.role}', CARGAHR = '${json.cargahr}' WHERE CTPS = '${json.ctps}'`;
        con.query(sql, (err, qres) => {
            if (reportError(res, err)) return;
            con.commit((err) => {
                if (reportError(res, err)) return;
                if (pass) {
                    bcrypt.hash(pass, saltRounds, (err, hash) => {
                        if (reportError(res, err)) return;
                        sql = `UPDATE USUARIO SET SENHA = '${hash}' WHERE CTPS = '${json.ctps}'`;
                        con.query(sql, (err, qres) => {
                            if (reportError(res, err)) return;
                            con.commit((err) => {
                                if (reportError(res, err)) return;
                            })
                        });
                    });
                }
                res.send({msg: 'Atualizado!'});
            })
        });
    });
})

router.delete('/usuario', (req, res) => {
    var con = fb.createConnection();
    json = req.query;
    con.connect('test.fdb','sysdba','dsat', 'adm', (err) => {
        if (reportError(res, err)) return;
        con.query(`UPDATE USUARIO SET STATUS = 'I' WHERE ctps = '${json.ctps}'`, (err, qres) => {
            if (reportError(res, err)) return;
            con.commit((err) => {
                if (reportError(res, err)) return;
                res.send({msg: 'Usuário removido!'});
            });
        });
    });
})

module.exports = router;