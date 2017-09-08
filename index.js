let express = require('express')
let app = express()
let config = require('./.config').DBConfig
const MongoClient = require('mongodb').MongoClient
const url = `mongodb://${config.user}:${encodeURIComponent(config.pwd)}@${config.host}:${config.port}/${config.db}`

// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
  console.log('Connected correctly to server')
  exports.DB = db
})

app.use(express.static(__dirname  + '/static'))
app.listen(9200)
