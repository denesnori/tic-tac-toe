// @flow
import React, {Component} from 'react';

import ThreeTimesThreeBoard from './ThreeTimesThreeBoard';

type State = {
    board: Array<Array<string>>,
    round: number,
}
type Props = {

};

export default class ThreeTimesThree extends Component<Props, State>{

  constructor(props:Props){
    super(props);
    this.state={
      board:[['','',''],['','',''],['','','']],
      round: 0,
    }
  }

  setTile = (row:number, column:number)=>{
    let {board, round} = this.state;
    const newBoard = board.map(function(arr) {
      return arr.slice();
    });;
    // check it is empty TODO
    const symbol = round % 2 === 0 ? 'X' : 'O';
    newBoard[row][column] = symbol;
    round++;
    this.setState({board:newBoard,round})
  }

  render(){
    return (
      <div style={{display:'flex'}}>
        <div>
        <h1>Simple 3*3 tic-tac-toe</h1>
        </div>
        <ThreeTimesThreeBoard setTile={this.setTile} board={this.state.board} />
      </div>
    );
  }
}
