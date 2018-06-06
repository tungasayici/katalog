var request = require('request');

exports.tokenControl = function (username, password, callback) {
    if (typeof token == 'undefined') {
        getToken(username, password, function (res) {
            callback(res);
        });
    } else {
        var currentDate = new Date().getTime();
        var tokenDate = token.date.getTime();
        if ((currentDate - tokenDate) < 0) {
            getToken(username, password, function (res) {
                callback(res);
            });
        } else {
            callback(token.token_type + " " + token.access_token);
        }
    }
}

function getToken(username, password, callback) {

    var options = {
        url: 'https://fundoopay:XY7kmzoNzl100@katalog-backend.herokuapp.com/oauth/token',
        method: 'POST',
        form: {
            'grant_type': 'password',
            'username': username,
            'pass': password
        }
    }
    
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            global.token = JSON.parse(body);
            global.token.date = new Date();
            callback(token.token_type + " " + token.access_token);
        }
    })
}