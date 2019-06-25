//dependencies
const express = require('express');
const router = express.Router();
const fb  = require('firebird');

//functions
const reportError = require('../../functions/reportError');

router.get('/externos', (req, res) => {
    var con = fb.createConnection();
    var json = [];
    con.connect('test.fdb', 'sysdba', 'dsat', 'admn', function(err) {
        if (reportError(res, err)) return;
        else var sql = `SELECT NOME, DOCUMENTO, CONTATO FROM EXTERNO WHERE STATUS = 'A'`;
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

router.get('/externo', (req, res) => {
    var con = fb.createConnection();
    var json = [];
    con.connect('test.fdb', 'sysdba', 'dsat', 'admn', function(err) {
        if (reportError(res, err)) return;
        var sql = `SELECT NOME, DOCUMENTO, CONTATO, FROM EXTERNO WHERE STATUS = 'A'`;
        if (req.query.documento) {
            sql = sql + ` AND documento = '${req.query.documento}'`
        }
        if (req.query.nome) {
            sql = sql + ` AND nome = '${req.query.nome}'`
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

router.post('/externo', (req, res) => {
    var con = fb.createConnection();
    var body = req.body;
    con.connect('test.fdb','sysdba','dsat', 'adm', (err) => {
        if (reportError(res, err)) return;
        con.query(`INSERT INTO EXTERNO (DOCUMENTO, NOME, CONTATO) 
        VALUES('${body.documento}', '${body.nome}', '${body.contato}')`, 
        (err, qres) => {
            if (reportError(res, err)) return;
            con.commit((err) => {
                if (reportError(res, err)) return;
                res.send({msg: 'Externo cadastrado!'});
            })
        });
    }); 
});

router.patch('/externo', (req, res) => {
    var con = fb.createConnection();
    var json = req.body;
    con.connect('test.fdb','sysdba','dsat', 'adm', (err) => {
        if (reportError(res, err)) return;
        var sql = `UPDATE EXTERNO SET NOME = '${json.nome}', CONTATO = '${json.contato}' WHERE DOCUMENTO = '${json.DOCUMENTO}'`;
        con.query(sql, (err, qres) => {
            if (reportError(res, err)) return;
            con.commit((err) => {
                if (reportError(res, err)) return;
                res.send({msg: 'Atualizado!'});
            })
        });
    });
});

router.delete('/externo', (req, res) => {
    var con = fb.createConnection();
    json = req.query;
    con.connect('test.fdb','sysdba','dsat', 'adm', (err) => {
        if (reportError(res, err)) return;
        con.query(`UPDATE EXTERNO SET STATUS = 'I' WHERE documento = '${json.documento}'`, (err, qres) => {
            if (reportError(res, err)) return;
            con.commit((err) => {
                if (reportError(res, err)) return;
                res.send({msg: 'Externo removido!'});
            });
        });
    });
});


module.exports = router;