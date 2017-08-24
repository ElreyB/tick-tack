// Business logic
var i = "space";
var X = "X";
var O = "O";
var boardPossiblitiesIndex = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

var space1 = space2 = space3 = space4 = space5 = space6 = space7 = space8 = space9 = i;
function Player(name, sign,className){
  this.name = name;
  this.sign = sign;
  this.class= className;
  this.spaceMarked = [space1,space2,space3,space4,space5,space6,space7,space8,space9];
}

Player.prototype.isFoundAWinner = function(player){
var playerMarkSpaces = player.spaceMarked.reduce(function(playerMark, space, index) {
    if (space === player.sign)
        playerMark.push(index);
        console.log(playerMark);
    return playerMark;

  }, []);
  return isGameOver(playerMarkSpaces);
}
function isGameOver(array){
  var result = boardPossiblitiesIndex.reduce(function(result,possibleWin){
    if(array.indexOf(possibleWin[0]) > -1 && array.indexOf(possibleWin[1]) > -1 && array.indexOf(possibleWin[2]) > -1)
    //if (possibleWin.join() == array.join())
      result = true
    return result
  },false);
  return result;
}


var Board = {
  boardSpaces : [space1,space2,space3,space4,space5,space6,space7,space8,
    space9],
  updatedBoardSpaces : function(index, PlayerSign){
      this.boardSpaces[index] = PlayerSign;
    },
}



// User interface
$(document).ready(function(){
  var Player1Name = "Player1";
  var Player2Name = "System";
  var playerVsSystem = false;
  var turnCount = 0;



  function playerSteps(player, index, count){
    $("li.space"+index).addClass(player.class);
    player.spaceMarked[index] = player.sign;
    Board.updatedBoardSpaces(index, player.sign);
    if(count === 9 && (!player.isFoundAWinner(player))){
      $('.notification').removeClass('hide')
      $('.draw').removeClass('hide')
      $("ul li").off("click");
    }
    else if (count >= 5 && (player.isFoundAWinner(player))){
      $('.notification').removeClass('hide')
      $('.winner').removeClass('hide')
      $(".winner").prepend(`<h1>${player.name}</h1>`);
      $("ul li").off("click");
    }else{
        $('button.playerTurn').trigger("click");
    }

  }

  function player2Turn(){
    var index;
    if(Board.boardSpaces[4] === "space"){
      index = 4;
    }else {
      index = findPlayer2Space();
    }// update AI
    playerSteps(Player2, index, turnCount)
  }
  //first
  $('button.getRule').click(function(){
    $(".welcome").addClass('hide');
    $(".rules").removeClass('hide');
  })

  $('.getType').click(function(){
    $(".rules").addClass('hide');
    $(".selectType").removeClass('hide');
  })

  $('.gameType').click(function(){
    var type =$(this).text();
    if(type === "Player Vs Player"){
      $('.secondPlayer').removeClass('hide');
      $('.playerVsSystem').addClass('hide')
    }else{
      $('.playerVsPlayer').addClass('hide');
      playerVsSystem = true;
    }
    $(".selectType").addClass('hide');
    $(".playerInfo").removeClass('hide');
  })

  $('.play').click(function(){
    $(".playerInfo").addClass('hide');
    $(".notification").addClass('hide');
    Player1Name = $('.firstPlayer').val();
    if(!($('.secondPlayer').hasClass('hide')))
      Player2Name = $('.secondPlayer').val();
    $('.player1Turn').text(Player1Name);
    $('.player2Turn').text(Player2Name);
    Player1.name = Player1Name;
    Player2.name =  Player2Name;
  })

  $('.refresh').click(function() {
    window.location.reload(true);
  })
  //object Creation
  var Player1 = new Player(Player1Name, X, "player1");
  var Player2 = new Player(Player2Name, O,"player2");

  $('button.playerTurn').click(function() {
    $(this).toggleClass('active');
  });
  $("ul li ").on("click",function(){

    turnCount++;
    var userInput = this.title;
    if($(".player1Turn").hasClass("active")){
      playerSteps(Player1, userInput, turnCount)
      if(playerVsSystem){
        setTimeout(function(){
          turnCount++;
          player2Turn();
        }, 2000);
      }
    }else{
      playerSteps(Player2, userInput, turnCount)
    }

  });
});
