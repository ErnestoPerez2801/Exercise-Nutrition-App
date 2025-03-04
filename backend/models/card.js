const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  UserId: { type: Number, required: true },
  Card: { type: String, required: true }
});

module.exports = mongoose.model('Card', CardSchema);
