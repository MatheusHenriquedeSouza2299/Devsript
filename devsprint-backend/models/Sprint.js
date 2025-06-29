const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
  nome: String,
  inicio: Date,
  fim: Date,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
});

module.exports = mongoose.model('Sprint', sprintSchema);
