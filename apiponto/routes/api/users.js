//dependencies
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fb  = require('firebird');

//functions
const verifyToken = require('../../functions/verifyToken');
const reportError = require('../../functions/reportError');

router.get('/user', verifyToken, (req, res) => {
    var con = fb.createConnection();
    var json = [];
    con.connect('test.fdb', 'sysdba', 'dsat', 'admn', function(err) {
        if (reportError(res, err)) return;
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (reportError(res, err)) return;
            var sql = `SELECT * FROM REGISTRO WHERE CTPS = '${authData.ctps}' AND STATUS <> 'I'`;
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
});

router.post('/reguser', verifyToken, (req, res) => {
    var con = fb.createConnection();
    var json = [];
    var body = req.body;
    
    con.connect('test.fdb', 'sysdba', 'dsat', 'admn', function(err) {
        if (reportError(res, err)) return;
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (reportError(res, err)) return;
            var sql = `SELECT * FROM REGISTRO WHERE CTPS = '${authData.ctps}' AND STATUS <> 'I'`
            if (body.inicio) {
                sql = sql + ` AND DIA >= '${body.inicio}'`;
            }
            if (body.fim) {
                sql = sql + ` AND DIA <= '${body.fim}'`;
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
});

module.exports = router;