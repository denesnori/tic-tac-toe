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

  componentDidMount = () => {
    var drawingCanvas = document.getElementById('myCanvas');
   // Check the element is in the DOM and the browser supports canvas
   if(drawingCanvas.getContext) {
       // Initaliase a 2-dimensional drawing context
       var context = drawingCanvas.getContext('2d');
       context.strokeStyle = "#000000";
       context.fillStyle = "#FFFF00";
       context.beginPath();
       context.arc(200,200,200,0,Math.PI*2,true);
       context.closePath();
       context.stroke();
       context.fill();
   }

  }

  render() {
    {/*  <div style={{height: `${this.state.height}px`, width: `${this.state.width}px`}}>
        <InfiniteBoard  w={this.state.w} h={this.state.h}/>
      </div>);*/}
    return (
      <div style={{'overflow':'hidden'}}>
        <canvas id="myCanvas" width={400} height={400}></canvas>
      </div>

    )
  }
}
