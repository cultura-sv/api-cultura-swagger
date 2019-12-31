const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const basicAuth = require('express-basic-auth');
const http = require('http');

const ip = process.env.IP || '0.0.0.0'
const port = process.env.PORT || 5000

const app = express();
const server = http.createServer(app)
let user = {}
user[process.env.APP_USER] = process.env.APP_PASSWORD
 
app.use(basicAuth({
    users: user,
    unauthorizedResponse: getUnauthorizedResponse,
    challenge: true
}))

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

setImmediate(() => {
    server.listen(port, ip, () => {
      console.log(`| SWAGGER | Online`)
    })
})