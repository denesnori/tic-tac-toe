import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {



  render (){

    return (
      <div>
        <h1>Welcome to my tic-tac-toe</h1>
        <button><Link to={`/3Times3`}>3x3 tic-tac-toe</Link></button>
        <button><Link to={`/6Times6`}>6x6 tic-tac-toe</Link></button>
        <button><Link to={`/about`}>1 Player</Link></button>
        <button><Link to={`/about`}>2 Players</Link></button>
        <button><Link to={`/about`}>Computer vs Computer</Link>r</button>
        <button><Link to={'/canvas'}> Canvas</Link></button>
        <button><Link to={'/infinite'}>Infinite</Link></button>
      </div>);
  }
}
