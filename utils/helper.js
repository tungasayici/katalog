var request = require('request');
var localStorage = require('localStorage');

var tokenData = null

exports.tokenControl = function (username, password, callback) {
    console.log(tokenData);
    if (tokenData == null) {
        getToken(username, password, function (res) {
            callback(res);
        });
    } else {
        var currentDate = new Date().getTime();
        var tokenDate = tokenData.date.getTime();
        if ((currentDate - tokenDate) < 0) {
            getToken(username, password, function (res) {
                callback(res);
            });
        } else {
            callback(tokenData.token_type + " " + tokenData.access_token);
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
            console.log(body);
            tokenData = JSON.parse(body);
            tokenData['date'] = new Date();
            callback(tokenData.token_type + " " + tokenData.access_token);
        }
    })
}