const request = require("request");

function getJson(link, callback)
{
    request({url: link, json: true}, function(error, response, body)
    {
        if(!error && response.statusCode === 200){
           callback(body);
        } 
    });
}

