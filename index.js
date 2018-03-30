const express = require('express')
const app = express()
const config = require('./.config').DBConfig
const MongoClient = require('mongodb').MongoClient
const url = `mongodb://${config.user}:${encodeURIComponent(config.pwd)}@${config.host}:${config.port}/${config.db}`
const bodyParser = require('body-parser')
const assert = require('assert')

let DB = null

// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
  console.log('Connected correctly to server')
  DB = db
})
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/wedding/static/', express.static(__dirname  + '/static'))
app.listen(80)

// 获取最新位置
app.get('/wedding/api/update', function(req, res){
  let collection = DB.collection('data')
  collection.findOne({type: 'position'}, {sort: {$natural: -1}}, (err, data) => {
    assert.equal(null, err);
    if (data) {
      let lat = data.lat
      let lng = data.lng
      collection.findOne({type: 'status'}, (err, data) => {
        assert.equal(null, err);
        if (data) {
          res.status(201).send({status: 'ok',
            data: [{
              lat: lat,
              lng: lng,
              status: data.status
            }]
          })
        } else {
          res.status(404).send({status: 'failed'})
        }
      })
    } else {
      res.status(404).send({status: 'failed'})
    }
  })
  
})

// 添加新位置
app.post('/wedding/api/admin/update', function(req, res){
  let lat = req.body.lat
  let lng = req.body.lng
  let collection = DB.collection('data')
  collection.insertOne({
    type: 'position',
    lat: lat,
    lng: lng
  }, (err) => {
    assert.equal(null, err)
    res.send({status: 'ok'})
  })
})

// 修改状态
app.put('/wedding/api/admin/status', function(req, res){
  let status = req.body.status
  let collection = DB.collection('data')
  collection.findOneAndReplace({type: 'status'}, {
    type: 'status',
    status: status
  }, (err, data) => {
    assert.equal(null, err)
    if (!data.value) {
      collection.insertOne({
        type: 'status',
        status: '0'
      }, (err) => {
        assert.equal(null, err)
      })
    }
    res.send({status: 'ok'})
  })
})
