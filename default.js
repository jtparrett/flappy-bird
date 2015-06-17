var FLAP = window.FLAP || {};
FLAP.game = function(){
  'use strict';
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var imgRoot = 'images/';
  var startTime = new Date().getTime();
  var opts = {
        width: 320,
        height: 568,
        paintTime: startTime,
        delta: 0,
        gravity: 900,
        gameState: true,
        score: 0
      };
  var bird = {
        aniTime: startTime,
        flapTime: startTime,
        width: 34,
        height: 24,
        speed: 600,
        jumpSpeed: 300,
        curSpeed: 0,
        x: 80,
        y: (opts.height / 2) - 12,
        images: ['bird-up.png', 'bird-middle.png', 'bird-down.png'],
        curImage: 0,
        draw: function(now){
          bird.update(now);

          if(bird.y <= 0 || bird.y + bird.height >= opts.height){
            opts.gameState = false;
          }

          if(now >= bird.aniTime + 100){
            (bird.curImage < bird.images.length - 1)? bird.curImage++ : bird.curImage = 0;
            bird.aniTime = now;
          }
          draw(bird.images[bird.curImage], bird.width, bird.height, bird.x, bird.y, 0, 0); 
        },
        update: function(now){
          if(bird.flapping){
            bird.flap(now);
          } else {
            (bird.curSpeed < bird.speed)? bird.curSpeed += Math.floor(opts.gravity * opts.delta) : bird.curSpeed = bird.speed;
            bird.y += bird.curSpeed * opts.delta;
          }
        },
        flap: function(now){
          bird.y -= bird.jumpSpeed * opts.delta;
          bird.flapping = true;

          if(now >= bird.flapTime + 100){
            bird.flapping = false;
            bird.curSpeed = 0;
          }
        }
      };
  var pipe = {
        time: startTime,
        width: 52,
        gap: 100,
        speed: 130,
        interval: 1800,
        images: ['pipe-top.png', 'pipe-bottom.png'],
        insts: []
      };

  function createPipe(){
    pipe.insts.push(new pipeInsts(pipe.insts.length));
  }

  var pipeInsts = function(index){
    this.x = opts.width;
    this.y = Math.floor(rand() * (opts.height - (pipe.gap * 4))) + (pipe.gap * 2);

    this.draw = function(){
      this.x -= Math.floor(pipe.speed * opts.delta);

      if(this.x + pipe.width < 0){
        delete pipe.insts[index];
      }

      this.checkBird();
      this.drawTop();
      this.drawBottom();
    };

    this.checkBird = function(){
      var birdStart = this.x <= (bird.x + bird.width);
      var birdEnd = (this.x + pipe.width) >= bird.x;
      if(birdStart && birdEnd){

        var birdTop = bird.y > this.y;
        var birdBottom = bird.y + bird.height < this.y + pipe.gap;

        if(!birdTop || !birdBottom){
          opts.gameState = false;
        }
      } else if(birdStart && !this.scored){
        opts.score++;
        this.scored = true;
      }
    };

    this.drawTop = function(){
      draw(pipe.images[0], pipe.width, this.y, this.x, 0, 0, opts.height - this.y);
    };

    this.drawBottom = function(){
      draw(pipe.images[1], pipe.width, opts.height - this.y - pipe.gap, this.x, this.y + pipe.gap, 0, 0);
    };

    this.draw();
  };

  function setCanvasSize(){
    canvas.width = opts.width;
    canvas.height = opts.height;
  }

  function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function rand(){
    return Math.random();
  }

  function draw(src, width, height, x, y, cropX, cropY){
    var newImg = new Image();
    newImg.src = imgRoot + src;
    ctx.drawImage(newImg, cropX, cropY, width, height, x, y, width, height);
  }

  function paintLoop(){
    if(!opts.gameState){
      alert('Game over, you scored: ' + opts.score);
      return false;
    }

    var now = new Date().getTime();
    opts.delta = (now - opts.paintTime) / 1000;

    clearCanvas();

    bird.draw(now);

    pipe.insts.forEach(function(pipe){
      pipe.draw();
    });

    if(now >= pipe.time + pipe.interval){
      createPipe();
      pipe.time = now;
    }

    opts.paintTime = now;
    window.requestAnimationFrame(paintLoop);
  }

  function start(){
    setCanvasSize();
    paintLoop();

    canvas.onmousedown = function(){
      var now = new Date().getTime();
      bird.flapTime = now;
      bird.flap(now);
    };

    canvas.ontouchend = function(){
      var now = new Date().getTime();
      bird.flapTime = now;
      bird.flap(now);
    };
  }

  return {
    start: start
  }
}();