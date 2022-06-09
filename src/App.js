
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipeListPage from './pages/RecipeListPage';
import IsAnon from './components/IsAnon';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/api" element={<HomePage />} />
        <Route path="/api/auth/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/api/auth/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/api/recipes" element={<RecipeListPage />} />
      </Routes>
    </div>
  );
}

export default App;
