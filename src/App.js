import React from 'react';
import './App.css';
import Insurance from './components/InsurancePage'
import Navbar from './components/Navbar'
import UserInput from './components/UserInput'
import AdminLogin from './components/login/Admin'
import UserLogin from './components/login/User'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (

      <React.Fragment>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={UserInput}></Route>
          <Route path="/admin" component={Insurance}></Route>
          <Route path="/login/admin" component={AdminLogin}></Route>
          <Route path="/login/user" component={UserLogin}></Route>
        </Switch>
      </React.Fragment>
      
  );
}

export default App;
