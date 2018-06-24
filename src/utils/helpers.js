export const findEmpty = (board) => {
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

export const deepEqual = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++){
      if (arr1[i][j] != arr2[i][j]) return false;
    }
  }
  return true;
}

export const checkDirection = (x, y, dx, dy, board) => {
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

export const isFinished = (board) => {
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
export const miniMax = (board, player) => {
  let win = isFinished(board);
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
    return isCached;
  }

  let ret = {}
  for (let i=0; i<empty.length; i++) {
    let move = {}
    const [x, y] = empty[i];

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