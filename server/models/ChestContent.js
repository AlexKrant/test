const mongoose = require('mongoose');

const ChestContentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ChestContent', ChestContentSchema);