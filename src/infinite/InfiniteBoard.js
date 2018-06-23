import React, {Component} from 'react';

import styles from '../threeTimesThree/ThreeTimesThreeBoard.css';

export default class InfiniteBoard extends Component {

  render(){
    console.log(this.props)
    const w= new Array(this.props.w).fill(1)
    const h= new Array(this.props.h).fill(1)
    return (
      <div>
      {
      h.map( i=> (
          <div className={styles.row}>
          {
          w.fill(1).map( j => (
          <div
        key={`row-${i}-column-${j}`}
        className={styles.tile}
        onClick={()=>this.props.setTile(i,j)}>
      test
      </div>))
        }
        </div>
      ))
      }
      </div>
    );
  }
}
