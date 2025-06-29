const Tarefa = require('../models/Tarefa');

exports.criarTarefa = async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ msg: 'O nome da tarefa é obrigatório.' });
    }

    const novaTarefa = new Tarefa({
      nome,                             // ⚠️ Aqui é nome
      descricao,
      status: 'Pendente',
      usuario: req.usuarioId,
    });

    await novaTarefa.save();
    res.status(201).json(novaTarefa);
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    res.status(500).json({ msg: 'Erro ao criar tarefa.' });
  }
};


exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find({ usuario: req.usuarioId });
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao listar tarefas.' });
  }
};

exports.atualizarStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const tarefa = await Tarefa.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      { status },
      { new: true }
    );
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao atualizar status da tarefa.' });
  }
};

exports.deletarTarefa = async (req, res) => {
  try {
    await Tarefa.findOneAndDelete({ _id: req.params.id, usuario: req.usuarioId });
    res.json({ msg: 'Tarefa deletada com sucesso.' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao deletar tarefa.' });
  }
};
