import React from 'react';
import './App.css';
import Insurance from './components/InsurancePage'
import Navbar from './components/Navbar'
import UserInput from './components/UserInput'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (

      <React.Fragment>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={UserInput}></Route>
          <Route path="/admin" component={Insurance}></Route>
        </Switch>
      </React.Fragment>
  );
}

export default App;
