var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var fs = require("fs");
var impala = require("node-impala")
app.use( bodyParser.json() ); 

app.get('/getSample', function (req, res) {

    const client = impala.createClient();
    client.connect({
    host: 'zmaq-3.vpc.cloudera.com',
    port: 21000,
    resultType: 'json-array'
    }); 

    client.query('SELECT * FROM kudu_users limit 5;').then(function(data) {
  	console.log(data);
  	res.send(data)})
    .catch(function(err) {console.error(err)})
    .done(function(){client.close()});

})


app.post('/getUser', function(req, res) {

    if (req.query.ip || (req.body.ip)) {

        const client = impala.createClient();
        
        client.connect({
        host: 'zmaq-3.vpc.cloudera.com',
        port: 21000,
        resultType: 'json-array'
        }) 

        var req_ip = req.body.ip
        var queryString = 'SELECT * FROM kudu_users where ip=\"'+req_ip+'\"limit 5;'
        
        client.query(queryString)
        .then(function(data) {

           if (data.length == 0){
            console.log(data)
            var replyMessage = "Ip address passed belongs to a valid user"
            res.send({status:200, body: replyMessage, user: data, blacklisted: false})
           }else{
            console.log(data)
            var replyMessage = 'Ip address passed belongs to a blacklisted user :'
            res.send({status:200, body: replyMessage, user: data, blacklisted: true})

           }
        })
        .catch(function(err) {console.error(err)})
        .done(function(){client.close()})    
    } 
    else {
        res.send({
          status: 400,
          body: "Please pass a proper uid or ip address on the query string or in the request body"
        });
    }

})


var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})
