import React, { Component } from 'react';

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

    }
  }

  draw = () => {
    drawBoard(this.canvas, 180, 180, 5)
  }

  getCanvasPosition = (event) => {
    const rect = this.canvas.getBoundingClientRect(); // x, y, width, height, bottom, left, top
  //  console.log(event.clientX)
  //  console.log(event.clientY)
  //  console.log(Math.floor((event.clientX-rect.x)/60), Math.floor((event.clientY-rect.y)/60))
    return {
      x: Math.floor((event.clientX-rect.x)/60),
      y: Math.floor((event.clientY-rect.y)/60),
    }
  }

  render () {
    return (
      <div style={{'display': 'flex', 'justifyContent': 'center', 'flexDirection': 'column'}}>
        <h3>To be continued</h3>
        <button onClick={this.draw}>Test</button>
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
