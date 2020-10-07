const mongoose = require('mongoose')
const TeenyID = require('shortid')

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: TeenyID.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('TeenyURL', shortUrlSchema)