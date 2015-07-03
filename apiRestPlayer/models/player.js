var mongoose = require('mongoose');
  Schema = mongoose.Schema;

var playerSchema = new Schema({
  codigo:      { type: String },
  puntos:      { type: Number}
});

module.exports = mongoose.model('Player', playerSchema);
