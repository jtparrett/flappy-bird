var FLAP = window.FLAP || {};
FLAP.firebaseRef = new Firebase("https://flappy-bird.firebaseio.com/");

function bh(el){
  return $('[data-behaviour=' + el + ']');
}

$(function(){
  FLAP.firebaseRef.on('value', function(data){
    FLAP.firebaseData = data.val();
    FLAP.scoreBoard.init();
  });
  
  FLAP.game.start();
});