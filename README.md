# NodifyImpala
A sample application that demonstrates using Nodejs to build a rest api that uses node-impala package to query Impala datasets


### Installation Instructions - MacOS

Install node.js and npm using homebrew. For further instructions, check out the following link - https://changelog.com/install-node-js-with-homebrew-on-os-x/

```
brew install node
```

Install the following packages using node.js package manager - npm

```
npm install --save node-impala
npm install --save express
npm install --save body-parser
```

### User Guide

To start the server running server.js, run the following command for the root directory of the project.
```
gmedasani-mac:NodifyImpala gmedasani$ node server.js
Example app listening at http://:::8081
```

If the server starts successfully, you will see the message that app is listening at the port specified in server.js. When you want to shutdown the server, simply type 'ctrl-c'.

** Get a sample of 5 blacklisted users **
```
gmedasani-mac:~ gmedasani$ curl http://127.0.0.1:8081/getSample
[{"ip":"1.126.108.138","uid":"20271"},
{"ip":"1.131.161.64","uid":"36412"},
{"ip":"1.165.44.11","uid":"99558"},
{"ip":"1.17.63.100","uid":"28338"},
{"ip":"1.229.247.161","uid":"8380"}]
gmedasani-mac:~ gmedasani$
```

** Make a request without passing in the IP address to be verified**
```
gmedasani-mac:~ gmedasani$ curl -H "Content-Type: application/json" -X POST -d '{ }' http://127.0.0.1:8081/getUser
{ "status":400,
  "body":"Please pass a proper uid or ip address on the query string or in the request body"
}
gmedasani-mac:~ gmedasani$
```

** Make a request with passing a blacklisted ip address**
```
gmedasani-mac:~ gmedasani$ curl -H "Content-Type: application/json" -X POST -d '{ "ip": "1.229.247.161"}' http://127.0.0.1:8081/getUser
{"status":200,
 "body":"Ip address passed belongs to a blacklisted user :",
 "user":[{"ip":"1.229.247.161","uid":"8380"}],
 "blacklisted":true
}
gmedasani-mac:~ gmedasani$
```

** Make a request with passing a non blacklisted ip address**
```
gmedasani-mac:~ gmedasani$ curl -H "Content-Type: application/json" -X POST -d '{ "ip": "1.229.247.141"}' http://127.0.0.1:8081/getUser
{"status":200,
 "body":"Ip address passed belongs to a valid user",
 "user":[],
 "blacklisted":false
}
gmedasani-mac:~ gmedasani$
```