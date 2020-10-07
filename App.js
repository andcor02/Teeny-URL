const express = require('express')
const mongoose = require('mongoose')
const TeenyURL = require('./db/TeenyURL')
const app = express()
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/TeenyURL', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const teenyget = await TeenyURL.find()
  res.render('index', { teenyget: teenyget })
})

app.use(express.static(__dirname + '/public'));

app.post('/teenyget', async (req, res) => {
  await TeenyURL.create({ full: req.body.fullUrl })

  res.redirect('/')
})

app.get('/:teenyURL', async (req, res) => {
  const teenyURL = await TeenyURL.findOne({ short: req.params.teenyURL })
  if (teenyURL == null) return res.sendStatus(404)

  teenyURL.clicks++
  teenyURL.save()

  res.redirect(teenyURL.full)
})

app.listen(process.env.PORT || 3000);