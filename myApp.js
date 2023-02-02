require('dotenv').config()
const bodyParser = require('body-parser')

let express = require('express');
let app = express();

// mount logger middleware
app.use(logger)
app.use(bodyParser.urlencoded({ extended: false }))



function logger(req, res, next) {
    const method = req.method;
    const path = req.path;
    const ip = req.ip;
    console.log(`${method} ${path} - ${ip} `)
    next()
}


// mount css styles to path 'public'
const cssPath = __dirname + '/public'
app.use('/public', express.static(cssPath))

// mount echo server that repeats the dynamic word in url
app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    res.json({ "echo": word })
})

// respond with parameters in url
app.route('/name')
    .get((req, res) => {
        const first = req.query.first
        const last = req.query.last
        const name = `${first} ${last}`
        res.json({ "name": name })
    })
    .post((req, res) => {
        const first = req.body.first
        const last = req.body.last
        const name = `${first} ${last}`
        res.json({ "name": name })
    })


// respond with index.html to path '/'
const indexPath = __dirname + '/views/index.html'
app.get('/', (req, res) => res.sendFile(indexPath))

// respond with json data to path 'json'
app.get('/json', (req, res) => {
    let msg = "Hello json"
    const isUppercase = (process.env.MESSAGE_STYLE === "uppercase")
    if (isUppercase) msg = msg.toUpperCase();

    res.json({ "message": msg })
})

// respond with current time to path '/now'
app.get('/now',
    (req, res, next) => {
        req.time = new Date().toString()
        next()
    },
    (req, res) => {
        res.json({ time: req.time })
    })









module.exports = app;
