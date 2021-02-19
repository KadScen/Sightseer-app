import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Header from './Components/Header';
import MainBody from './Components/MainBody';
import SignInUp from './Components/SignInUp';
import Card from './Components/Card';
import MyAccount from './Components/MyAccount';
import AddDeal from './Components/AddDeal';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" component={MainBody} />
        <Route path="/signInUp" component={SignInUp} />
        <Route path="/card" component={Card} />
        <Route path="/myAccount" component={MyAccount} />
        <Route path="/addDeal" component={AddDeal} />
      </div>
    </Router>
  );
}

export default App;
