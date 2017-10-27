const jsonServer = require('json-server')
const jwt = require('jsonwebtoken');
const path = require('path');
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.set('superSecret', 'thisismysupersecretstring'); // secret variable

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
server.use(jsonServer.bodyParser)

// login
server.post('/authenticate', (req, res) => {
    debugger;
    if (req.body.userName === 'bob' && req.body.password === 'password') {
        let user = {
            userName: req.body.userName
        }
        var token = jwt.sign(user, server.get('superSecret'), {
            expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    } else {
        res.sendStatus(400).send({
            success: false,
            message: 'Please provide valid details...'
        });
    }
})


const isAuthorized = function (req) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['token'];
    // decode token
    if (token) {
        return true;
    } else {
        return false;
    }
}


server.use((req, res, next) => {
    if (isAuthorized(req)) {

        var token = req.body.token || req.query.token || req.headers['token'];
        // verifies secret and checks exp
        jwt.verify(token, server.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
            }
        });

        next(); // continue to JSON Server router
    } else {
        res.send({
            status: '401',
            success: false,
            message: 'No token provided.'
        });
    }
})

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})