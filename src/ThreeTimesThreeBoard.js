import React, {Component} from 'react';

import styles from './ThreeTimesThreeBoard.css';

export default class ThreeTimesThreeBoard extends Component {

  render(){
    console.log(this.props)
    const {board} = this.props;
    return (
      <div>
        {
          board.map((row, i)=>{
            return (
            <div key={`row-${i}`} className={styles.row}>
              {row.map((column, j)=>{
                return (
                  <div
                    key={`row-${i}-column-${j}`}
                    className={styles.tile}
                    onClick={()=>this.props.setTile(i,j,'X')}>
                  {board[i][j]}
                  </div>);
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
