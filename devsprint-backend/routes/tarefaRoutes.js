const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const tarefaController = require('../controllers/tarefaController');

router.post('/', auth, tarefaController.criarTarefa);
router.get('/', auth, tarefaController.listarTarefas);
router.put('/:id', auth, tarefaController.atualizarStatus);
router.delete('/:id', auth, tarefaController.deletarTarefa);

module.exports = router;
