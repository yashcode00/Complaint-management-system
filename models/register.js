const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  fathersname: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  rollno: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  dob: {
    type: Date,
  },
  state: {
    type: String,
  },
  gender: {
    type: String,
  }
}, { timestamps: true },{ collection: 'registers'});

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;
