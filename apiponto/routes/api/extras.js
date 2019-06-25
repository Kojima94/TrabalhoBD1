//dependencies
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fb  = require('firebird');

//functions
const verifyToken = require('../../functions/verifyToken');
const reportError = require('../../functions/reportError');


router.post('/extra', (req, res) => {
    var con = fb.createConnection();
    var body = req.body;
    var result = [];
    con.connect('test.fdb','sysdba','dsat', 'adm', (err) => {
        if(reportError(res, err)) return;
        con.query(`SELECT DOCUMENTO FROM EXTERNO WHERE DOCUMENTO = ${body.documento}`, (err, qres) => {
            if (reportError(res, err)) return;
            qres.fetch('all', true, (obj) => {
                result.push(obj);
            }, (err) => {
                if (reportError(res, err)) return;
                if (result[0].DOCUMENTO) {
                    con.query(`INSERT INTO EXTRA (DOCUMENTO, HORAINI, HORAFIM, DIAINI, DIAFIM) 
                    VALUES('${body.documento}', '${body.inicio}', '${body.fim}', '${body.dataini}', '${body.datafim}')`, (err, qres) => {
                        if (reportError(res, err)) return;
                        con.commit((err) => {
                            if (reportError(res, err)) return;
                            res.send({msg: `Serviços/horas extras registrados com sucesso!`});
                        });
                    });
                } else {
                    res.send({msg: `Este documento não está cadastrado!`});
                }
            });
        });
    });
});

router.get('/extras', (req, res) => {
    var con = fb.createConnection();
    var json = [];
    con.connect('test.fdb', 'sysdba', 'dsat', 'admn', function(err) {
        if (reportError(res, err)) return;
        else var sql = `select e.documento, e.horaini, e.horafim, e.diaini, e.diafim
        from extra e
        where e.status <> 'I' and e.diaini = '${req.query.data}'`;
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

router.get('/extra', (req, res) => {
    var con = fb.createConnection();
    var json = [];
    var query = req.query;
    con.connect('test.fdb', 'sysdba', 'dsat', 'admn', function(err) {
        if (reportError(res, err)) return;
        var sql = `select e.diaini, e.horaini, e.diafim, e.horafim, e.documento
        from extra e
        where e.status <> 'I' `
        if (query.user) sql = sql + `and e.documento = '${query.user}'`;
        if (!query.periodo) {
            if (query.inicio) sql = sql + `and e.diaini = '${query.inicio}'`;
        }
        if (query.periodo) sql = sql + `and e.diaini between '${query.inicio}' and '${query.fim}'`;
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

module.exports = router;