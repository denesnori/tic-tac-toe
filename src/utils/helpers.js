import { BinTree} from 'bintrees';

export const charDiff = (a,b) => {
  if (a === b) {
    return 0;
  }
  if (a === "X") return 1.0;
  if (b === "X") return -1.0;
  if (a === "O") return 1.0;
  if (b === "O") return -1.0;
}

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
      if (arr1[i][j] !== arr2[i][j]) return false;
    }
  }
  return true;
}

/*export const checkDirection = (x, y, dx, dy, board) => {
  let sign = board[x][y]
  for (let i=0; i<3; i++){
    if(![0,1,2].includes(x) || ![0, 1, 2].includes(y) || board[x][y] !== sign) {
      return false;
    }
    x += dx;
    y += dy;
  }
  return sign;
}*/

export const checkDirection = (x, y, dx, dy, board)=>{
  let sign = board[x][y];
  let counter = 1;
  const l = board.length;
  for(let i=0; i<l-1; i++) {
     x+= dx;
     y+=dy;
    if(x<0||x>l-1||y<0||y>l-1||board[x][y]!==sign){
      break;
    }
    counter++;
  }
  x-=counter*dx
  y-=counter*dy
   for(let i=0; i<l-1; i++) {
     x-= dx;
     y-=dy;
    if(x<0||x>l-1||y<0||y>l-1||board[x][y]!==sign){
      break;
    }
    counter++;
  }
  return counter===board.length? sign: false;
}

export const checkDirection4 = (x, y, dx, dy, board) => {
  let sign = board[x][y]
  for (let i=0; i<4; i++){
    if(![0,1,2,3 ,4 ,5].includes(x) || ![0, 1, 2, 3, 4, 5].includes(y) || board[x][y] !== sign) {
      return false;
    }
    x += dx;
    y += dy;
  }
  return sign;
}

export const isFinished = (board, x,y) => {
  const directions = [ [0, 1], [1, 0], [1, 1], [-1, 1]];
  for (let i=0; i< directions.length; i++) {
    let [dx, dy] = directions[i];
    const win = checkDirection(x,y, dx,dy, board);
    if(win){
      return win;
    }
  }
  return false;
}
export const isFinishedAll = (board) => {
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

const cache=new BinTree((a,b) => {
  if (a.who !== b.who) {
    return a.who === computer ? 1.0 : -1.0
  }
  for (let i = 0; i < a.board.length; i++) {
    for (let j = 0; j < a.board[i].length; j++){
      if (a.board[i][j] !== b.board[i][j]) return charDiff(a.board[i][j], b.board[i][j])
    }
  }
  return 0.0
});
export const miniMax = (board, player) => {
  let win = isFinishedAll(board);
  let empty=findEmpty(board);
  if(win){
    cache.insert({board: board.map(arr=>arr.slice()), who: player, winner:win})
    return {winner: win}
  } else if(empty.length===0){
    cache.insert({board: board.map(arr=>arr.slice()), who: player, winner:draw})
    return {winner:draw}
  }

  let isCached = cache.find({who: player, board: board})
  if(isCached){
    return isCached;
  }

  let ret = {}
  for (let i=0; i<empty.length; i++) {
    let move = {}
    const [x, y] = empty[i];

    move.move=empty[i]
    board[x][y]= player;
  if(player===computer){
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
  cache.insert({board: board.map(arr=>arr.slice()), who: player, winner:ret.winner, move:ret.move})
  if(cache.size%1000===0){
    console.log(cache.size, 'cache')
  }
  return ret
}
