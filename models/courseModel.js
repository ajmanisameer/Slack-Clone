var mongoose = require('mongoose');
const schema = mongoose.Schema;

var CourseSchema = new schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,

  },
  price: {
    type: String,
    required: true,
    min: 6
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Course", CourseSchema);