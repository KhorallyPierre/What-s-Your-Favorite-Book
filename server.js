const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var multer = require('multer');
var ObjectId = require('mongodb').ObjectID;

var db, collection;

const url = "mongodb+srv://khorally:pierre@cluster0.ny8ci.mongodb.net/demo?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(3300, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('books').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {books: result})
  })
})

app.put('/heart', (req, res) => {
  db.collection('books')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $inc: {
      heart: 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.put('/thumbDown', (req, res) => {
  db.collection('books')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $inc: {
      heart: - 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/books', (req, res) => {
  console.log(req.body.name,"name")
  db.collection('books').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})


app.post('/books', (req, res) => {
  console.log('HELLOO')
  db.collection('books').insertOne({name: req.body.name, msg: req.body.msg , heart: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
