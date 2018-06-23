// @flow
import React, {Component} from 'react';

import ThreeTimesThreeBoard from './ThreeTimesThreeBoard';

type State = {
    board: Array<Array<string>>,
    round: number,
}
type Props = {

};

let board = [['O', '', 'X'], ['X', '', 'X'], ['', 'O', 'O']];

function findEmpty(board){
  let empty = [];
  board.forEach((row, x) => {
    row.forEach((item, y) => {
      if(!board[x][y]){
        empty.push([x, y]);
      }
    });
  });
  return empty;
}

function deepEqual(arr1, arr2){
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++){
      if (arr1[i][j] != arr2[i][j]) return false;
    }
  }
  return true;
}

function checkDirection(x, y, dx, dy, board) {
  let sign = board[x][y]
  for (let i=0; i<3; i++){
    if(![0,1,2].includes(x) || ![0, 1, 2].includes(y) || board[x][y] !== sign) {
      return false;
    }
    x += dx;
    y += dy;
  }
  return sign;
}

  function isFinished(board) {
    const directions = [ [0, 1], [1, 0], [1, 1], [-1, 1]];
    for (let j = 0; j < board.length; j++) {
        for (let k=0; k< directions.length; k++) {
          let [dx, dy] = directions[k];
          let win1= checkDirection(0,j,dx,dy, board)
          if(board[0][j]&&win1) {
            return win1;
          }
          let win2 = checkDirection(j, 0, dx,dy, board)
          if(board[j][0]&&win2) {
            return win2;
          }
        }
    }
    return false;
  }

const computer='O';
const human='X';
const draw='D';
const cache=[];
function miniMax(board, player) {
  let win = isFinished(board);
  console.log('WIB', win)
  let empty=findEmpty(board);
  if(win){
    cache.push({board: board.map(arr=>arr.slice()), who: player, winner:win})
    return {winner: win}
  } else if(empty.length==0){
    cache.push({board: board.map(arr=>arr.slice()), who: player, winner:draw})
    return {winner:draw}
  }

  let isCached = cache.find(item=>{
    return (item.who === player) && deepEqual(item.board, board)
  })
  if(isCached){
    //console.log(isCached)
    return isCached;
  }

  let ret = {}
  for (let i=0; i<empty.length; i++) {
    let move = {}
    const [x, y] = empty[i];
    console.log(x, y)

    move.move=empty[i]
    board[x][y]= player;
  if(player==computer){
      let result = miniMax(board, human)
      move.winner = result.winner
    }else{
      let result = miniMax(board,computer)
      move.winner = result.winner
    }
    board[x][y]=''
    if (move.winner === player){
      ret = move
      break
    }
    if (move.winner === draw){
      ret = move
    }
  }

  if (Object.keys(ret).length === 0){
     ret = {move : empty[0], winner : player === computer ? human : computer}
  }
  cache.push({board: board.map(arr=>arr.slice()), who: player, winner:ret.winner, move:ret.move})
  return ret
}


export default class ThreeTimesThree extends Component<Props, State>{

  constructor(props:Props){
    super(props);
    this.state={
      board:[['O','X','O'],['X','X','O'],['','','']],
      round: 0,
    }
  }

  componentDidMount(){
  //  console.log(miniMax([['', '', ''], ['', '', ''], ['', '', '']],'X',0))
  }

  setTile = (row:number, column:number)=>{
    let {board, round} = this.state;
    const newBoard = board.map(function(arr) {
      return arr.slice();
    });;
    // check it is empty TODO
    const symbol = round % 2 === 0 ? 'X' : 'O';
    console.log(round, symbol)
    newBoard[row][column] = symbol;

    const isFinished = this.isFinished(newBoard)
    console.log(isFinished, round)
    if (isFinished||findEmpty(newBoard).length===0) {
      console.log('Finished', isFinished)
      this.setState({board:newBoard, isFinished})
    } else {
      console.log('here')
      const computer = miniMax(newBoard, 'O');
      console.log(cache)
      const [x, y] = computer.move;
      newBoard[x][y]='O'
      round+=2;
      console.log(round)
      this.setState({board:newBoard,round, isFinished:this.isFinished(newBoard)});
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
          let win1= checkDirection(0,j,dx,dy, board)
          if(board[0][j]&&win1) {
            return win1;
          }
          let win2 = checkDirection(j, 0, dx,dy, board)
          if(board[j][0]&&win2) {
            return win2;
          }
        }
    }
    return false;
  }

  stateOfTheGame = () => {
    const { isFinished, round, board } = this.state;
    console.log(isFinished, round, board)
    if (isFinished){
      return `${isFinished} won the game!`;
    }
    if (findEmpty(board).length===0&&  !isFinished){
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
