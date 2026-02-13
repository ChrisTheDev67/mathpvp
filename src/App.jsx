import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import MathPractice from './pages/MathPractice';
import PvB from './pages/PvB';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PvP from './pages/PvP';
import Leaderboard from './pages/Leaderboard';
import HelpWithMath from './pages/HelpWithMath';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="practice" element={<MathPractice />} />
            <Route path="pvb" element={<PvB />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="pvp" element={<PvP />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="help" element={<HelpWithMath />} />
          </Route>
        </Routes>
        <Analytics />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
