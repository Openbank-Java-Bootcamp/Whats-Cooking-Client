
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipeListPage from './pages/RecipeListPage';
import IsAnon from './components/IsAnon';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsPrivate from './components/IsPrivate';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import CookbookDetailsPage from './pages/CookbookDetailsPage';
import AddRecipePage from './pages/AddRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div className="App">
      <Navbar />
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/recipes" element={<IsPrivate><RecipeListPage /></IsPrivate>} />
        <Route path="/recipes/:recipeId" element={<IsPrivate><RecipeDetailsPage /></IsPrivate>} />
        <Route path="/cookbooks/:cookbookId" element={<IsPrivate><CookbookDetailsPage /></IsPrivate>} />
        <Route path="/recipes/new" element={<IsPrivate><AddRecipePage /></IsPrivate>} />
        <Route path="/recipes/edit/:recipeId" element={<IsPrivate><EditRecipePage /></IsPrivate>} />
        <Route path="*" element={<IsAnon><ErrorPage /></IsAnon>} />
      </Routes>
    </div>
  );
}

export default App;
