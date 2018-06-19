// @flow
import React, {Component} from 'react';

import ThreeTimesThreeBoard from './ThreeTimesThreeBoard';

type State = {
    board: Array<Array<string>>,
    round: number,
}
type Props = {

};

function checkDirection(x, y, dx, dy, board) {
  let sign = board[x][y]
  for (let i=0; i<3; i++){
    if(![0,1,2].includes(x) || ![0, 1, 2].includes(y) || board[x][y] !== sign) {
      return false;
    }
    x += dx;
    y += dy;
  }
  return true;
}

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

    const isFinished = this.isFinished(newBoard)
    if (isFinished) {
      this.setState({board:newBoard, isFinished})
    } else {
      round++;
      this.setState({board:newBoard,round});
    }
  }

  restart = () => {
    this.setState({round: 0, board: [['','',''],['','',''],['','','']]})
  }

  isFinished = (board) => {
    const directions = [ [0, 1], [1, 0], [1, 1], [-1, 1]];
    for (let j = 0; j < board.length; j++) {
        for (let k=0; k< directions.length; k++) {
          let [dx, dy] = directions[k];
          if(board[0][j]&&checkDirection(0,j,dx,dy, board)) {
            return true;
          }

          if(board[j][0]&&checkDirection(j, 0, dx,dy, board)) {
            return true;
          }
        }
    }
    return false;
  }

  stateOfTheGame = () => {
    const { isFinished, round } = this.state;
    if (isFinished){
      return `${round%2===0?'X':'O'} won the game!`;
    }
    if (round>8 && !isFinished){
      return `Game over! It is a tie!`
    }
    return `${round%2===0?'X':'O'}'s turn!`;
  }

  render(){
    return (
      <div >
        <div>
        <h1>Simple 3*3 tic-tac-toe</h1>
        </div>
        <ThreeTimesThreeBoard setTile={this.setTile} board={this.state.board} />
        <h3>{this.stateOfTheGame()}</h3>
        <button onClick={this.restart}>Restart game</button>
      </div>
    );
  }
}
