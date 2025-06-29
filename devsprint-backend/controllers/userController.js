const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'Email já está em uso' });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({ nome, email, senha: hashedSenha });
    await novoUsuario.save();
    res.status(201).json({ msg: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao criar usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json({ msg: 'Credenciais inválidas' });

    const isSenhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!isSenhaValida) return res.status(401).json({ msg: 'Credenciais inválidas' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Erro no login' });
  }
};
