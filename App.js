const express = require('express')
const mongoose = require('mongoose')
const TeenyURL = require('./db/TeenyURL')
const app = express()

var str1 = "Hello ";

mongoose.connect('mongodb://localhost/TeenyURL', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shorURL = await TeenyURL.find()
  res.render('index', { shorURL: shorURL })
})

app.use(express.static(__dirname + '/public'));

app.post('/shorURL', async (req, res) => {
  await TeenyURL.create({ full: req.body.fullUrl })

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await TeenyURL.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 3000);