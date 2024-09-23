const mongoose = require('mongoose')

const ContaSchema = new mongoose.Schema({
  value: {
    type: Number,
  },
  name: {
    type: String,
  },
  pending: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
  }
})


module.exports = mongoose.model('conta', ContaSchema)