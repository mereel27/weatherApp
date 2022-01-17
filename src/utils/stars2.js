class Star {
  constructor(context, x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rChange = 0.004;
    // this.vx = Math.floor(Math.random()*4+1);
    // this.vy = Math.floor(Math.random()*4+1);
    this.color = color;
    this.context = context;
  }
  render() {
    let context = this.context;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    context.shadowBlur = 8;
    context.shadowColor = 'white';
    context.fillStyle = this.color;
    context.fill();
  }
  update() {
    if (this.r > 2 || this.r < 0.8) {
      this.rChange = -this.rChange;
    }
    this.r += this.rChange;
  }
}


class Starsky {
  constructor(options) {
    document.getElementById(options.id).style.zIndex = 0;
    document.getElementById(options.id).style.pointerEvents = 'none';

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    document.getElementById(options.id).appendChild(canvas);

    var C_WIDTH = (canvas.width = document.getElementById(options.id).offsetWidth);
    var C_HEIGHT = (canvas.height = document.getElementById(options.id).offsetHeight);

    function randomColor() {
      var arrColors = ['ffffff', 'ffecd3', 'bfcfff'];
      return '#' + arrColors[Math.floor(Math.random() * 3)];
    }

    var arrStars = [];
    for (let i = 0; i < 20; i++) {
      var randX = Math.floor(Math.random() * C_WIDTH + 1);
      var randY = Math.floor(Math.random() * (C_HEIGHT/2.5) + 1);
      var randR = Math.random() * 1 + 0.2;

      var star = new Star(context, randX, randY, randR, randomColor());
      arrStars.push(star);
    }
    function update() {
      for (let i = 0; i < arrStars.length; i++) {
        setTimeout(arrStars[i].update(), Math.random() * 200 + 50);
      }
    }
    this.animate = function() {
      update();
      /*
        Remove comments below these for a cool trailing effect & comment
        out the context.clearRect.
      */
      //context.fillStyle = 'rgba(255, 255, 255, .1)';
      //context.fillRect(0,0,C_WIDTH,C_HEIGHT);
      context.clearRect(0, 0, C_WIDTH, C_HEIGHT);
      for (var i = 0; i < arrStars.length; i++) {
        arrStars[i].render();
      }
      requestAnimationFrame(() => this.animate());
    }
  }
  
}

export default Starsky;

