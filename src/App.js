import { Routes, Route } from 'react-router';
import AdminPage from 'pages/AdminPage';
import TempPreview from 'components/Preview/TempPreview';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TempPreview />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
