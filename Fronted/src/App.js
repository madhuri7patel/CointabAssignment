import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from './Pages/HomePage';
import UserPage from './Pages/UserPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/user' element={<UserPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
