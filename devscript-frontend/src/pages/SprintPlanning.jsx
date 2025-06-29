import { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/sprint.css';
import { useNavigate } from 'react-router-dom';

function SprintPlanning() {
  const [nome, setNome] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [sprints, setSprints] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const carregarSprints = async () => {
    try {
      const res = await api.get('/sprints', headers);
      setSprints(res.data);
    } catch (err) {
      console.error('Erro ao carregar sprints:', err);
    }
  };

  const handleCriarSprint = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sprints', { nome, dataInicio, dataFim }, headers);
      setNome('');
      setDataInicio('');
      setDataFim('');
      carregarSprints();
    } catch (err) {
      console.error('Erro ao criar sprint:', err);
    }
  };

  useEffect(() => {
    carregarSprints();
  }, []);

  return (
    <div className="sprint-container">
      <h2>Planejamento de Sprint</h2>

      <form onSubmit={handleCriarSprint} className="sprint-form">
        <input type="text" placeholder="Nome da Sprint" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />
        <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} required />
        <button type="submit">Criar Sprint</button>
      </form>

      <button className="voltar-btn" onClick={() => navigate('/dashboard')}>Voltar ao Dashboard</button>

      <ul className="sprint-lista">
        {sprints.map((sprint) => (
          <li key={sprint._id}>
            <strong>{sprint.nome}</strong> <br />
            Início: {new Date(sprint.dataInicio).toLocaleDateString()} <br />
            Fim: {new Date(sprint.dataFim).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SprintPlanning;
