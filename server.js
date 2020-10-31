//import modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Models
const db = require('./app/models')

// initial use
const app = express()

// clien can access 
let whitelist = [
    'http://localhost:8081',
];
let corsOption = {
    origin: function ( origin, callback) {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed By Cors'))
        }
    }
}


app.use(cors(corsOption));

//parse request application/json x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Sync database (untuk membuat tabel otomatis)
db.sequelize.sync()

//routes
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Express SQL"
    })
})

// Import Post Router
require('./app/routes/post.route')(app)

// Port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`)
})