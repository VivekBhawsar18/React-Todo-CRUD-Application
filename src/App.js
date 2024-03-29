// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

import Header from './myComponents/Header';
import Home from './myComponents/Home';
import About from './myComponents/About'
import SignUp from './myComponents/SignUp';
import SignIn from './myComponents/SignIn';
import TodoManager from './myComponents/TodoManager';

function App() {
  return (

    <Router>
      <Header/>
    <Routes>
      <Route exact path='/' element = {<Home/>}/>
      <Route exact path='/todos' element = {<TodoManager/>}/>
      <Route exact path='/about' element = {<About/>}/>
      <Route exact path='/sign-up' element= {<SignUp/>} />
      <Route exact path='/sign-in' element= {<SignIn/>}/>
    </Routes>

    </Router>


  );
}

export default App;
