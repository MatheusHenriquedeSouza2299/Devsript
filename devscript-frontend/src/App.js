import SprintPlanning from './pages/SprintPlanning';
import Backlog from './pages/Backlog'; // adicione essa linha
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/backlog" element={<Backlog />} />
        <Route path="/sprint-planning" element={<SprintPlanning />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
