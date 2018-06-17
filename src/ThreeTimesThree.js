import React, {Component} from 'react';

import ThreeTimesThreeBoard from './ThreeTimesThreeBoard';

export default class ThreeTimesThree extends Component {

  render(){
    return (
      <div style={{display:'flex'}}>
        <div>
        <h1>Simple 3*3 tic-tac-toe</h1>
        </div>
        <ThreeTimesThreeBoard />
      </div>
    );
  }
}
