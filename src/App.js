// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import TodoManager from './components/TodoManager';


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
