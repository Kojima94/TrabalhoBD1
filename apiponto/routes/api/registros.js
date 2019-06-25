//dependencies
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const fb  = require('firebird');

//functions
const verifyToken = require('../../functions/verifyToken');
const reportError = require('../../functions/reportError');
const reorderString = require('../../functions/reorder');

router.get('/registros', (req, res) => {
    var con = fb.createConnection();
    var json = [];
    con.connect('test.fdb', 'sysdba', 'dsat', 'admn', function(err) {
        if (reportError(res, err)) return;
        else var sql = `select r.ctps, r.dia, r.hora, r.tipo, u.login
        from registro r, usuario u
        where r.ctps=u.ctps and r.status <> 'I' and r.dia='${req.query.data}'`;
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

router.get('/registro', (req, res) => {
    var con = fb.createConnection();
    var json = [];
    var query = req.query;
    con.connect('test.fdb', 'sysdba', 'dsat', 'admn', function(err) {
        if (reportError(res, err)) return;
        var sql = `select r.dia, r.hora, r.ctps, r.tipo, u.login 
        from registro r, usuario u
        where r.status <> 'I' and r.ctps=u.ctps `
        if (query.user) sql = sql + `and u.login = '${query.user}' `;
        if (!query.periodo) {
            if (query.inicio) sql = sql + `and r.dia = '${query.inicio}' `;
        }
        if (query.periodo) sql = sql + `and r.dia between '${query.inicio}' AND '${query.fim}'`;
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

router.post('/registro', verifyToken, (req, res) => {
    var con = fb.createConnection();
    var body = req.body;
    var result = '';
    var atraso = '0';
    var count = 1;
    var msg = `${body.tiporeg} registrada ${body.hora} do dia ${reorderString(body.data)}`;
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json('Me parece que você não tem permissão para este tipo de ação! Redirecionando...');
        } else {
            con.connect('test.fdb','sysdba','dsat', 'adm', (err) => {
                if(reportError(res, err)) return;
                con.query(`SELECT FIRST 1 TIPO, DIA FROM REGISTRO WHERE CTPS='${authData.ctps}' ORDER BY ID DESC`, (err, qres) => {
                    if(reportError(res, err)) return;
                    qres.fetch('all', true, (obj) => {
                        result = obj;
                    }, (err) => {
                        if (result.TIPO == body.tiporeg) {
                            msg = `Erro: Seu último registro foi uma ${body.tiporeg}!`;
                            return res.json(msg);
                        }
                        if (reportError(res, err)) return;
                        con.query(`INSERT INTO REGISTRO (CTPS, TIPO, HORA, DIA) 
                        VALUES('${authData.ctps}', '${body.tiporeg}', '${body.hora}', '${body.data}')`, (err, qres) => {
                            if (reportError(res, err)) return;
                            con.commit((err) => {
                                if (reportError(res, err)) return;
                                res.json(msg);
                            });
                        });
                    });
                });
            });
        }
    });
});

router.patch('/registro', (req, res) => {
    var con = fb.createConnection();
    json = req.body;
    con.connect('test.fdb','sysdba','dsat', 'adm', (err) => {
        if (reportError(res, err)) return;
        con.query(`UPDATE REGISTRO SET HORA = '${json.hora}', DIA = '${json.data}', TIPO = '${json.tipo}' WHERE CTPS = '${json.ctps}'`,
        (err, qres) => {
            if (reportError(res, err)) return;
            con.commit((err) => {
                if (reportError(res, err)) return;
                res.send({msg: 'Atualizado!'});
            })
        });
    });
});

router.delete('/registro', (req, res) => {
    var con = fb.createConnection();
    json = req.query;
    con.connect('test.fdb','sysdba','dsat', 'adm', (err) => {
        if (reportError(res, err)) return;
        con.query(`UPDATE REGISTRO SET STATUS = 'I' WHERE CTPS = '${json.ctps}'`, (err, qres) => {
            if (reportError(res, err)) return;
            con.commit((err) => {
                if (reportError(res, err)) return;
                res.send({msg: 'Item removido!'});
            });
        });
    });
});

module.exports = router;