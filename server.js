const express = require('express')
const app = express()
const sendMail = require('./mail')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', (process.env.PORT || 5000));

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

// app.listen(5000,  () => {
//     console.log('Server is listening on port ', app.get('port'))
// })