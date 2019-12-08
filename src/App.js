import React from 'react';
import './App.css';
import Insurance from './components/InsurancePage'
import Navbar from './components/Navbar'

function App() {
  return (

      <React.Fragment>
        <Navbar/>
        <Insurance/>
      </React.Fragment>
  );
}

export default App;
