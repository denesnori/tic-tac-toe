import React, { Component } from 'react';

export default class Infinite extends Component {

  constructor(props){
    super(props);
    this.state = {
      height: window.innerHeight,
      h: Math.round(window.height/60)+1,
      width: window.innerWidth,
      w: Math.round(window.innerWidth/60)+1,
    }
  }

  render() {
    return (
      <div style={{height: `${this.state.height}px`, width: `${this.state.width}px`}}>
        <h1>I will be infinite</h1>
        <div>
        <button>Up</button>
        <button>Down</button>
        </div>
        <div style={{display: 'flex', 'justifyContent': 'space-between'}}>
        <button>Left</button>
        <button>Right</button>
        </div>
      </div>);
  }
}
