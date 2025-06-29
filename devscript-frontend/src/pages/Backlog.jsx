import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/dashboard.css'; // pode reaproveitar o mesmo CSS

function Backlog() {
  const [tarefas, setTarefas] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const carregarTarefas = async () => {
    try {
      const res = await api.get('/api/tarefas', headers);
      setTarefas(res.data);
    } catch (err) {
      console.error('Erro ao carregar backlog:', err);
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <div className="dashboard-kanban">
      <div className="topo">
  <h2>Gestão do Backlog</h2>
  <div className="topo-buttons">
    <button onClick={() => navigate('/dashboard')}>Voltar para Dashboard</button>
  </div>
</div>

      <div className="kanban-board">
        <div className="kanban-coluna">
          <h3>Todas as Tarefas</h3>
          {tarefas.map((tarefa) => (
            <div className="kanban-card" key={tarefa._id}>
              <strong>{tarefa.nome}</strong>
              <p>{tarefa.descricao}</p>
              <p><em>Status: {tarefa.status}</em></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Backlog;
