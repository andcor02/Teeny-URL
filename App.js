const express = require('express')
const mongoose = require('mongoose')
const TeenyURL = require('./db/TeenyURL')
const app = express()
require('dotenv').config()

TeenyURL.collection.deleteMany({}) //delete collection on start of app

app.set('view engine', 'ejs') //set view engine to ejs
app.use(express.urlencoded({ extended: false })) //needed for url formatting

app.get('/', async (req, res) => { //async operation
  const teenyget = await TeenyURL.find() //load collection
  res.render('index', { teenyget: teenyget }) //render collection for index
})

app.use(express.static(__dirname + '/public')); //route public files access

app.post('/teenyget', async (req, res) => {
  await TeenyURL.create({ full: req.body.fullUrl }) //create db entry from form input of long URL
  res.redirect('/') //return
})

app.get('/:teenyURL', async (req, res) => { 
  const teenyURL = await TeenyURL.findOne({ short: req.params.teenyURL }) 
  if (teenyURL == null) return res.sendStatus(404) //if collection returns no entries return 404

  teenyURL.clicks++ //increment db clicks if found
  teenyURL.save() //save to db

  res.redirect(teenyURL.full) //render and redirect to full link
})

app.listen(process.env.PORT || 3000); //listen on port 3000.