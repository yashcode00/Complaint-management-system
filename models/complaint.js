const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  username: {
    type: String,
  },
  rollno: {
    type: String,
  },
  message: {
    type: String,
  },
  complaintcategory: {
      type: String,
  }
}, { timestamps: true },{ collection: 'complaints'});

const Complaint = mongoose.model('Complaint', registerSchema);
module.exports = Complaint;
