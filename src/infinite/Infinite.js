import React, { Component } from 'react';
import InfiniteBoard from './InfiniteBoard';

export default class Infinite extends Component {

  constructor(props){
    super(props);
    this.state = {
      height: window.innerHeight,
      h: Math.round(window.innerHeight/60)+1,
      width: window.innerWidth,
      w: Math.round(window.innerWidth/60)+1,
    }
  }

  render() {
    return (
      <div style={{height: `${this.state.height}px`, width: `${this.state.width}px`}}>
        <InfiniteBoard  w={this.state.w} h={this.state.h}/>
      </div>);
  }
}
