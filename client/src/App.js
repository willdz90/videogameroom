import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import NotFound from './components/NotFound.jsx';
import Home from './components/Home.jsx';
import Form from './components/Form.jsx';

// import GameDetail from './components/GameDetail.jsx';
// import Modal from './components/Modal';



function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/videogames' element={<Home/>}/>
        {/* <Route path='/videogames/:idVideogame' element={<GameDetail/>}/> */}
        {/* <Route path='/videogames/:idVideogame' element={<Modal/>}/> */}
        <Route path='/register' element={<Form/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
