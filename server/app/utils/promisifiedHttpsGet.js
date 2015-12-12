var https = require('https');
var http = require('http');
var Promise = require('bluebird');

function promisifiedHttpsGet(options) {
    return new Promise(function(resolve, reject) {
        console.log(1)
        https.get(options, function(res) {
            var body = '';
            res.on('data', function(data) {
                body += data;
            });
            res.on('end', function() {
                return resolve(body);
            })
            res.on('error', reject);
        }).end()
    });
}


function promisifiedHttpGet(url) {
    return new Promise(function(resolve, reject) {
        http.get(url, function(res) {
            var body = '';
            res.on('data', function(data) {
                body += data;
            });
            res.on('end', function() {
                return resolve(body);
            })
            res.on('error', reject);
        }).end()
    });
}

module.exports = {
    promisifiedHttpsGet: promisifiedHttpsGet,
    promisifiedHttpGet: promisifiedHttpGet
}
