const mongoose = require('mongoose')
const TeenyID = require('shortid') //A really useful package that generates a short ID
require('dotenv').config()

//Create simple schema containg full url, shorter url, and number of clicks on shorter url
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true //required to be filled when adding to db
  },
  short: {
    type: String,
    required: true, //required to be filled when adding to db
    default: TeenyID.generate //Default value calls shortid package places into 'short' colummn
  },
  
  clicks: {
    type: Number,
    required: true, //required to be filled when adding to db
    default: 0
  }
})

module.exports = mongoose.model('TeenyURL', shortUrlSchema) //export our schema for app.js