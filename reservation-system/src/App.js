import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Main />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
   
  );
}

export default App;
