import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home.js';
import TTT from './ttt.js';
import ThreeTimesThree from './threeTimesThree/ThreeTimesThree';
import SixTimesSix from './sixTimesSix/sixTimesSix';
import Canvas from './Canvas';
import Infinite from './infinite/Infinite';
import './App.css';

const App = () => (
  <Router>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={TTT} />
      <Route path='/3times3' component={ThreeTimesThree} />
      <Route path='/6times6' component={SixTimesSix} />
      <Route path = '/canvas' component={Canvas} />
      <Route path='/infinite' component={Infinite} />
    </div>
  </Router>
)

export default App;
