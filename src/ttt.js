import React, { Component} from 'react';

export default class TTT extends Component{
  state={
    width: window.innerWidth,
    height: window.innerHeight,
  }

  render(){
    console.log(this)
    return (
      <div style={{backgroundColor:'red', height: `${this.state.height}px`, width:`${this.state.width}px`}}>
        <h1>I will be a game</h1>
        <p>{this.height} {this.width}</p>
      </div>
    );
  }
}
