import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Home from './Components/Home';
import { ToastContainer } from 'react-toastify';

import './App.css';


function App() {
  return (
    <div>
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <Router>
        <Routes>
                  <Route path="/login" element={<LoginForm/>}></Route>
                  <Route path="/" element={<Home/>}></Route>
                  
        </Routes>

      </Router>
      

    </div>
    
  );
}

export default App;
