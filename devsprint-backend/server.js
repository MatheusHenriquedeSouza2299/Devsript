const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const tarefaRoutes = require('./routes/tarefaRoutes');
const sprintRoutes = require('./routes/sprintRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/sprints', sprintRoutes);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado com sucesso!'))
  .catch((err) => console.error('❌ Erro na conexão com MongoDB:', err));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/tarefas', tarefaRoutes);

// Inicialização
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
