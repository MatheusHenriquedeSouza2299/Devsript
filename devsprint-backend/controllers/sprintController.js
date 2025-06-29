const Sprint = require('../models/Sprint');

exports.criarSprint = async (req, res) => {
  try {
    const { nome, inicio, fim } = req.body;
    const nova = new Sprint({ nome, inicio, fim, usuario: req.usuarioId });
    await nova.save();
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao criar sprint.' });
  }
};

exports.listarSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find({ usuario: req.usuarioId });
    res.json(sprints);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao listar sprints.' });
  }
};
