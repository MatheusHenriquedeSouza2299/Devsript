const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  status: { type: String, default: 'Pendente' },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
});

module.exports = mongoose.model('Tarefa', tarefaSchema);
