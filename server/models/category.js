const mongoose = require('mongoose');

var Category = mongoose.model('Category', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  posts: [{
    _post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  }]
});

module.exports = {Category};