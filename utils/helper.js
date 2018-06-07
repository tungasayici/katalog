var request = require('request');

exports.tokenControl = function (req, callback) {
    var username = req.session.AUTHEMAIL;
    var password = req.session.AUTHPASSWORD;
    if (req.session.tokenData == null) {
        getToken(req, function (res) {
            callback(res);
        });
    } else {
        var currentDate = new Date().getTime();
         console.log(req.session.tokenDataDate);
        var tokenDate = new Date(req.session.tokenDataDate).getTime();
        if ((currentDate - tokenDate) < 0) {
            getToken(req, function (res) {
                callback(res);
            });
        } else {
            callback(req.session.tokenData.token_type + " " + req.session.tokenData.access_token);
        }
    }
}

function getToken(req, callback) {
    var username = req.session.AUTHEMAIL;
    var password = req.session.AUTHPASSWORD;
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
            req.session.tokenData = JSON.parse(body);
            req.session.tokenDataDate = new Date();
            callback(req.session.tokenData.token_type + " " + req.session.tokenData.access_token);
        }
    })
}

exports.formatDate = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}