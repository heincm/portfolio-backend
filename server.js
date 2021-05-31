const express = require('express')
const app = express()
const sendMail = require('./mail')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', (process.env.PORT || 5000));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    const allowedOrigins = ['http://localhost:3000', 'https://aqueous-anchorage-00407.herokuapp.com']
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function(request, response) {
    let result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});


app.post('/email', (req, res) => {
    //send email
    const { subject, email, text } = req.body

    sendMail(email, subject, text, function (err, data) {
        if (err) {
            res.status(500).json({ message: "internal error " + err })
        } else {
            res.status(200).json({ message: 'Message received!' });
        }
    });
})
