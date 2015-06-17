<!DOCTYPE html>
<html>
<head>

  <title>Flappy Bird</title>
  <meta name="viewport" content="width=device-width initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
  html, body {
    margin: 0;
    padding: 0;
  }

  #canvas {
    display: block;
    background: #ccc;
    margin: 0 auto;
  }
  </style>

</head>
<body>

<canvas id="canvas"></canvas>

<script src="default.js"></script>
<script>
var FLAP = window.FLAP || {};
FLAP.game.start();
</script>

</body>
</html>