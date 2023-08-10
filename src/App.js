


import { Routes, Route } from 'react-router';
import TempPreview from 'components/Preview/TempPreview';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TempPreview />} />
    </Routes>
  );
}

export default App;
