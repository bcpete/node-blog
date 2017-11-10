const mongoose = require('mongoose');

var Category = mongoose.model('Category', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
});

module.exports = {Category};