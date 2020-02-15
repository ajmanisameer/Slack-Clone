var mongoose = require('mongoose');
const schema = mongoose.Schema;


var UserSchema = new schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  // course: {
  //   type: schema.Types.ObjectId,
  //   ref: 'Course',
  //   required: true
  // },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);