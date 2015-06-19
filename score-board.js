var FLAP = window.FLAP || {};
FLAP.scoreBoard = function(){
  function init(){
    var scoreBoard = bh('score-board');
    var scores = FLAP.firebaseData.scores;

    scoreBoard.html('');

    scores.sort(function(a, b){
      if(a.score > b.score){
        return -1;
      }
      if(a.score < b.score){
        return 1;
      }
      return 0;
    });

    var index = 0;
    scores.forEach(function(score, i){
      if(i+1 > 5){
        return false;
      }
      $('<li />').text(score.score + ' :' + score.username).appendTo(scoreBoard);
    });
  }

  return {
    init: init
  }
}();