// @flow
import React, {Component} from 'react';

import ThreeTimesThreeBoard from './ThreeTimesThreeBoard';
import { findEmpty, isFinished, miniMax } from '../utils/helpers';
import styles from './ThreeTimesThree.css';

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
      isOver:false,
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
    const isOver = isFinished(newBoard, row, column)
    if (isOver||findEmpty(newBoard).length===0) {
      this.setState({board:newBoard, isOver})
    } else {
      const computer = miniMax(newBoard, 'O');
      const [x, y] = computer.move;
      newBoard[x][y]='O'
      round+=2;
      this.setState({board:newBoard,round, isOver:isFinished(newBoard, x,y)});
    }
  }

  restart = () => {
    this.setState({round: 0, board: [['','',''],['','',''],['','','']], isOver: false})
  }

  stateOfTheGame = () => {
    const { isOver, round, board } = this.state;

    if (isOver){
      return `${isOver} won the game!`;
    }
    if (findEmpty(board).length===0&&  !isOver){
      return `Game over! It is a tie!`
    }
    return `${round%2===0?'X':'O'}'s turn!`;
  }

  render(){
    const { board, isOver} = this.state;
    return (
      <div className={styles['game-container']}>
        <h1>Simple 3*3 tic-tac-toe</h1>
        <ThreeTimesThreeBoard setTile={this.setTile} board={board} isOver={isOver}/>
        <h3>{this.stateOfTheGame()}</h3>
        <button onClick={this.restart}>Restart game</button>
      </div>
    );
  }
}
