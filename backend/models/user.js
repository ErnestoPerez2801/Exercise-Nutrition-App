const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  UserId: { type: Number, unique: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Login: { type: String, required: true, unique: true },
  Password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
