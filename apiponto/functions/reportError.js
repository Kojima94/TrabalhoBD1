const reportError = (res, err) => {
    if (err) {
        res.end(JSON.stringify({err: err.message}));
        return true;
    }
    return;
}

module.exports = reportError;