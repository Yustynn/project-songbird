var https = require('https');
var Promise = require('bluebird');

function promisifiedHttpsGet(url) {
    return new Promise(function(resolve, reject) {
        https.get(url, function(res) {
            var body = '';
            res.on('data', function() {
                body += data;
            });
            res.on('end', function() {
                resolve(body);
            })
            res.on('error', reject);
        })
    });
}

module.exports = promisifiedHttpsGet;
