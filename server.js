const express = require('express')
const app = express()
const sendMail = require('./mail')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.send('Hello World')
})


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

app.listen(8080,  () => {
    console.log('Server is listening on port ', PORT)
})