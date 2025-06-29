import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/dashboard.css';

function Dashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const carregarTarefas = async () => {
    try {
      const res = await api.get('/tarefas', headers);
      setTarefas(res.data);
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err);
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  const handleCriarTarefa = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tarefas', { nome, descricao }, headers);
      setNome('');
      setDescricao('');
      carregarTarefas();
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
    }
  };

  const avancarStatus = async (id, statusAtual) => {
    const proximo = {
      'Pendente': 'Em andamento',
      'Em andamento': 'Concluído',
    };
    const novoStatus = proximo[statusAtual];
    if (!novoStatus) return;

    try {
      await api.put(`/tarefas/${id}`, { status: novoStatus }, headers);
      carregarTarefas();
    } catch (err) {
      console.error('Erro ao avançar status:', err);
    }
  };

  const excluirTarefa = async (id) => {
    try {
      await api.delete(`/tarefas/${id}`, headers);
      carregarTarefas();
    } catch (err) {
      console.error('Erro ao excluir tarefa:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const renderColuna = (status, titulo) => (
    <div className="kanban-coluna">
      <h3>{titulo}</h3>
      {tarefas
        .filter((tarefa) => tarefa.status === status)
        .map((tarefa) => (
          <div className="kanban-card" key={tarefa._id}>
            <strong>{tarefa.nome}</strong>
            <p>{tarefa.descricao}</p>
            <div className="acoes">
              {status !== 'Concluído' && (
                <button onClick={() => avancarStatus(tarefa._id, status)}>Avançar</button>
              )}
              <button onClick={() => excluirTarefa(tarefa._id)}>Excluir</button>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="dashboard-kanban">
      <div className="topo">
  <h2>Dashboard de Tarefas</h2>
  <div className="topo-buttons">
    <button onClick={() => navigate('/backlog')}>Ir para Backlog</button>
    <button onClick={handleLogout}>Sair</button>
  </div>
</div>

      <form onSubmit={handleCriarTarefa} className="criar-tarefa">
        <label>
          Nome da Tarefa
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <label>
          Descrição
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>
        <button type="submit">Criar</button>
      </form>

      <div className="kanban-board">
        {renderColuna('Pendente', 'Pendente')}
        {renderColuna('Em andamento', 'Em Andamento')}
        {renderColuna('Concluído', 'Concluído')}
      </div>
    </div>
  );
}

export default Dashboard;
