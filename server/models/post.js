const mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  body: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  createdAt: {
    type: Number,
  },
  _category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Post};