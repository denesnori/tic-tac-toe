import React, { Component } from 'react';
import { isFinishedAll, findEmpty} from './utils/helpers';

function drawBoard(canvas, width, height, padding){
  const ctx = canvas.getContext('2d');
  // vertical lines
  for(let i=0; i<4; i++) {
    ctx.moveTo(i*60+0.5, 0);
    ctx.lineTo(i*60+0.5, height);
  }
  //horizontal lines
  for(let i=0; i<4; i++) {
    ctx.moveTo(0+0.5, i*60);
    ctx.lineTo(width+0.5, i*60);
  }
  ctx.stroke();
}

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [['', '', ''],['', '', ''], ['', '', '']],
      round: 0,
    }
  }

  componentDidMount = () => {
    drawBoard(this.canvas, 180, 180, 5);
  }

  getCanvasPosition = (event) => {
    let { board } = this.state;
    const rect = this.canvas.getBoundingClientRect(); // x, y, width, height, bottom, left, top
    let  x =  Math.floor((event.clientX-rect.x)/60);
    let y = Math.floor((event.clientY-rect.y)/60);
    if(this.state.round%2==0){
      this.drawX(x, y);
      board[x][y]='X';
    } else {
      this.drawO(x, y);
      board[x][y]='O'
    }
    this.setState({round: this.state.round+1, board});
  }

  drawX = (x, y) => {
    let ctx = this.canvas.getContext('2d');
    ctx.strokeStyle="#000";
    const offset = 10;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(x*60+offset, y*60+offset);
    ctx.lineTo(x*60+60-offset, y*60+60-offset)
    ctx.moveTo(x*60+offset, y*60+60-offset)
    ctx.lineTo(x*60+60-offset, y*60+offset)

    ctx.stroke();
  }

  drawO= (x,y) => {
    let xStart= x*60;
    let yStart=y*60;
    let xCenter = xStart+30;
    let radius = 20;
    let startAngle = 0*Math.PI
    let endAngle = 2*Math.PI
    let ctx = this.canvas.getContext('2d');
    ctx.strokeStyle= '#000';
    ctx.beginPath();
    ctx.arc(xStart+30, yStart+30, radius,startAngle, endAngle);
    ctx.stroke()
  }

  stateOfTheGame = () => {
    const { round, board } = this.state;
    const isOver = isFinishedAll(board);
    if (isOver){
      return `${isOver} won the game!`;
    }
    if (findEmpty(board).length===0&&  !isOver){
      return `Game over! It is a tie!`
    }
    return `${round%2===0?'X':'O'}'s turn!`;
  }

  render () {
    const {board} = this.state;
    return (
      <div style={{'display': 'flex', 'justifyContent': 'center', 'flexDirection': 'column'}}>
        <h3>{this.stateOfTheGame()}</h3>
        <div style={{'display': 'flex', 'justifyContent': 'center', 'alignItems':'center'}}>
          <canvas
            ref={ canvas => (this.canvas=canvas)}
            width={184}
            height={184}
            onClick={this.getCanvasPosition}
            ></canvas>
        </div>
      </div>);
  }
}
