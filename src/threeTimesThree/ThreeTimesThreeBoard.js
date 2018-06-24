import React, {Component} from 'react';

import styles from './ThreeTimesThreeBoard.css';

export default class ThreeTimesThreeBoard extends Component {

  renderTile = (i, j)=>{
    const {board, isOver} = this.props;
    if(isOver || this.props.board[i][j]){
      return (
        <div
          key={`row-${i}-column-${j}`}
          className={styles.tile}>
        {board[i][j]}
        </div>);
      }

    return (
      <div
        key={`row-${i}-column-${j}`}
        className={styles.tile}
        onClick={()=>this.props.setTile(i,j)}>
      {board[i][j]}
      </div>);
}

  render(){

    const {board} = this.props;
    return (
      <div>
        {
          board.map((row, i)=>{
            return (
            <div key={`row-${i}`} className={styles.row}>
              {row.map((column, j)=>{
                return this.renderTile(i,j);
              })
              }
            </div>
            );
          })
        }
      </div>
    );
  }
}
