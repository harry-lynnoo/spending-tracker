import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Analytics from './pages/Analytics';
import Journal from './pages/Journal';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Analytics />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </Router>
  );
}