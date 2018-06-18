import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home.js';
import TTT from './ttt.js';
import ThreeTimesThree from './ThreeTimesThree';
import './App.css';

const App = () => (
  <Router>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={TTT} />
      <Route path='/3times3' component={ThreeTimesThree} />
    </div>
  </Router>
)

export default App;
