var findPlayer2Space = function(){
  var spacePossible;
  var checkNext;
  var space="space";


  var boardPossiblities = [[Board.boardSpaces[0],Board.boardSpaces[1],Board.boardSpaces[2]],
                          [Board.boardSpaces[3],Board.boardSpaces[4],Board.boardSpaces[5]],
                          [Board.boardSpaces[6],Board.boardSpaces[7],Board.boardSpaces[8]],
                          [Board.boardSpaces[0],Board.boardSpaces[3],Board.boardSpaces[6]],
                          [Board.boardSpaces[1],Board.boardSpaces[4],Board.boardSpaces[7]],
                          [Board.boardSpaces[2],Board.boardSpaces[5],Board.boardSpaces[8]],
                          [Board.boardSpaces[0],Board.boardSpaces[4],Board.boardSpaces[8]],
                          [Board.boardSpaces[2],Board.boardSpaces[4],Board.boardSpaces[6]]];

  for (i=0; i < boardPossiblities.length; i++){
    if (boardPossiblities[i] !== 0){
      spacePossible = check(boardPossiblities[i])
      if (!spacePossible){
        boardPossiblities[i] = 0;
      } else {
        checkNext = checkSpace(boardPossiblities[i])
        if(checkNext!== -1){
          space = boardPossiblitiesIndex[i][checkNext];
          return space;
        }
      }
    }
  }


  if(space === "space"){
    space =firstNull();
  }
  return space;
}

function check(possiblity){
  if (possiblity.indexOf("space") >= 0){
    return true;
  }else{
    return false;
  }
}

// function checkSpace(spaces){
//   var index = 0;
//   var nullSpace = [];
//   var addCountofX = 0;
//   spaces.map(function(space) {
//     if(space != null){
//        addCountofX += space;
//     }else{
//       nullSpace.push(index);
//     }
//     index++;
//   });
//   if(addCountofX === 2){
//     return nullSpace[0];
//   }else{
//     return -1;
//   }
// }
function accIfX(acc, space){
     if (space === X){
       return acc + 1;
     }
     return acc;
   }

function checkSpace(spaces){
   var countOfX = spaces.reduce(accIfX,0);

  if(countOfX === 2){
    return spaces.indexOf("space");
  }else{
    return -1;
  }
}

function firstNull(){
  var emptyIndex = Board.boardSpaces.indexOf("space");
  return emptyIndex;
}
