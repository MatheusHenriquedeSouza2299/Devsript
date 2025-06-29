import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom'; // Adiciona o Link
import '../styles/register.css';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', { nome, email, senha });
      alert('Usuário cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.msg || 'Erro no cadastro');
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <p className="login-link">
        Já tem uma conta? <Link to="/">Voltar para o login</Link>
      </p>
    </div>
  );
}

export default Register;
