
//let board = [['O', '', 'X'], ['X', '', 'X'], ['', 'O', 'O']];

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

function checkDirection(x, y, dx, dy, board) {
  let sign = board[x][y]
  for (let i=0; i<3; i++){
    if(![0,1,2].includes(x) || ![0, 1, 2].includes(y) || board[x][y] !== sign) {
      return false;
    }
    x += dx;
    y += dy;
  }
  return true;
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

const computer='X'
const human='O'
function miniMax(board, player, depth) {
 // console.log(board,player, depth)
  let win = isFinished(board);
  let empty=findEmpty(board);
  if(win){

    let score = player==='O'?10:-10;
    return {score,depth}
  } else if(empty===0){
    return {score:0,depth}
  }

  let moves = [];
  for (let i=0; i<empty.length; i++) {
    let move = {}
    let [x,y] = empty[i];
    console.log(x,y,'xy',depth)
    move.x=x
    move.y=y
    board[x][y]= player;
    if(player===computer){
      let result = miniMax(board, human, depth+1)
      move.score = result.score
      move.depth = result.depth
    }else{
      let result = miniMax(board,computer, depth+1)
      move.score = result.score
      move.depth = result.depth
    }
    board[x][y]=''
    moves.push(move)
  }

  console.log(moves)
  let bestMove;
  if(player===computer){
    let bestScore=-Infinity
    for(let i=0;i<moves.length;i++) {
      if(moves[i].score>bestScore || (moves[i].score===bestScore&&moves[i].depth<bestMove.depth)){
        bestScore=moves[i].score
        bestMove=[moves[i].x, moves[i].y]
        bestMove.score=bestScore
        bestMove.depth=moves[i].depth
      }
    }
  }else{
    let bestScore=Infinity
    for(let i=0;i<moves.length;i++) {
      if(moves[i].score<bestScore||(moves[i].score===bestScore&&moves[i].depth>bestMove.depth)){
        bestScore=moves[i].score
        bestMove=[moves[i].x, moves[i].y]
        bestMove.score=bestScore
        bestMove.depth=moves[i].depth
      }
    }
  }
  return bestMove
}

console.log(miniMax([['O', '', 'X'], ['X', '', 'X'], ['', 'O', 'O']],'X',0))

//console.log(isFinished([['O', 'X', 'X'], ['X', '', 'X'], ['O', 'O', 'O']]))

function deepEqual(arr1, arr2){
  if(arr1.length!==arr2.length){
    return false;
  }
  if(!Array.isArray(arr1[0])||arr1[0].length!==arr2[0].length){
    return false;
  }
  return arr1.reduce((acc,row,i)=>{
    let score = row.reduce((acc,item,j)=>{
      if(item===arr2[i][j]){
        return acc&&true;
      }
      return acc&&false;
    }, true);

    return score &&acc;
  }, true)
}


//// backup 2

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
  if(arr1.length!==arr2.length){
    return false;
  }
  if(!Array.isArray(arr1[0])||arr1[0].length!==arr2[0].length){
    return false;
  }
  return arr1.reduce((acc,row,i)=>{
    let score = row.reduce((acc,item,j)=>{
      if(item===arr2[i][j]){
        return acc&&true;
      }
      return acc&&false;
    }, true);

    return score &&acc;
  }, true)
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
  return true;
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

const computer='X'
const human='O'
function miniMax(board, player, depth) {
 // console.log(board,player, depth)
  let win = isFinished(board);
  let empty=findEmpty(board);
  if(win){

    let score = player==='O'?10:-10;
    return {score,depth}
  } else if(empty===0){
    return {score:0,depth}
  }

  let moves = [];
  let cache = [];
  isCached = cache.reduce((acc, item)=>{
    if(deepEqual(item.board, board)){
      return item;
    }
    return false
  }, false)
  if(isCached){
    return isCached;
  }
  for (let i=0; i<empty.length; i++) {
    let move = {}
    let [x,y] = empty[i];
    move.x=x
    move.y=y
    board[x][y]= player;
    if(player===computer){
      let result = miniMax(board, human, depth+1)
      move.score = result.score
      move.depth = result.depth
    }else{
      let result = miniMax(board,computer, depth+1)
      move.score = result.score
      move.depth = result.depth
    }
    board[x][y]=''
    if(move.score===10){
      let cached = {}

      cache.push({board, score:move.score, depth:move.depth, x:move.x, y:move.y})
    }
    moves.push(move)
  }
  console.log(cache, 'here cache')
  console.log(moves)
  let bestMove={};
  if(player==computer){
    let bestScore=-Infinity
    for(let i=0;i<moves.length;i++) {
      if(moves[i].score>bestScore){
        bestScore=moves[i].score
        bestMove.move=[moves[i].x, moves[i].y]
        bestMove.score=bestScore
        bestMove.depth=moves[i].depth
      }
    }
  }else{
    let bestScore=Infinity
    for(let i=0;i<moves.length;i++) {
      if(moves[i].score<bestScore){
        bestScore=moves[i].score
        bestMove.move=[moves[i].x, moves[i].y]
        bestMove.score=bestScore
        bestMove.depth=moves[i].depth
      }
    }
  }
  return bestMove
}
////// next iteratrion

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

export const isFinished = (board) => {
  const directions = [ [0, 1], [1, 0], [1, 1], [-1, 1]];
  for (let j = 0; j < board.length; j++) {
      for (let k=0; k< directions.length; k++) {
        let [dx, dy] = directions[k];
        if(board.length===6) {
          let win1= checkDirection4(0,j,dx,dy, board)
          if(board[0][j]&&win1) {
            return win1;
          }
          let win2 = checkDirection4(j, 0, dx,dy, board)
          if(board[j][0]&&win2) {
            return win2;
          }
        } else {
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
  } else if(empty.length===0){
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
  cache.push({board: board.map(arr=>arr.slice()), who: player, winner:ret.winner, move:ret.move})
  console.log(cache, 'cache')
  return ret
}
