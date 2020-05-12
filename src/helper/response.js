
module.exports = {
    ok: (res, status, data) => {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.write(data);
        res.end();
    },
    okCreate: (res, status, data) => {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.write(data);
        res.end();
    },
    error: (res, status, message, err = null) => {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write(message, err);
        res.end();
    }
}

