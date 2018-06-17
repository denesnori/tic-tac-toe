import React, {Component} from 'react';

import styles from './ThreeTimesThreeBoard.css';

export default class ThreeTimesThreeBoard extends Component {
  state = {
    board: [['','',''],['','',''],['','','']]
  }
  render(){
    console.log(styles)
    const {board} = this.state;
    return (
      <div>
        {
          board.map((row, i)=>{
            return (
            <div key={`row-${i}`} className={styles.row}>
              {row.map((column, j)=>{
                return (
                  <div key={`row-${i}-column-${j}`}
                  className={styles.tile}>
                Here</div>);
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
