const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const sprintController = require('../controllers/sprintController');

router.post('/', auth, sprintController.criarSprint);
router.get('/', auth, sprintController.listarSprints);

module.exports = router;
