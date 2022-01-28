class Star {
  constructor(context, x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rChange = 0.002;
    // this.vx = Math.floor(Math.random()*4+1);
    // this.vy = Math.floor(Math.random()*4+1);
    this.color = color;
    this.context = context;
    this.opacity = 1;
  }
  render() {
    let context = this.context;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    context.globalAlpha = this.opacity;
    /* context.shadowBlur = 8;
    context.shadowColor = 'white'; */
    context.fillStyle = this.color;
    context.fill();
  }
  update() {
    /* if (this.r > 0.8 || this.r < 0.2) {
      this.rChange = -this.rChange;
    } */
    this.opacity = Math.random() * (1 - 0.7) + 0.7;
    /* this.r += this.rChange; */
  }
}


class Starsky {
  constructor(options) {
    document.getElementById(options.id).style.zIndex = 0;
    document.getElementById(options.id).style.pointerEvents = 'none';

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    context.scale(devicePixelRatio, devicePixelRatio);
    document.getElementById(options.id).appendChild(canvas);

    var C_WIDTH = (canvas.width = document.getElementById(options.id).offsetWidth);
    var C_HEIGHT = (canvas.height = document.getElementById(options.id).offsetHeight);

    function randomColor() {
      var arrColors = ['ffffff', 'ffecd3', 'bfcfff'];
      return '#' + arrColors[Math.floor(Math.random() * 3)];
    }

    const stars = [];
    for (let i = 0; i < 80; i++) {
      var randX = Math.floor(Math.random() * C_WIDTH);
      var randY = Math.floor(Math.random() * (C_HEIGHT));
      var randR = Math.random() * (1 - 0.3) + 0.3;

      if(randX > 100 || randY > 100) {
        var star = new Star(context, randX, randY, randR, randomColor());
        stars.push(star);
      }
    }
    /* function update() {
      for (let i = 0; i < arrStars.length; i++) {
        arrStars[i].update();
      }
    } */
    this.animate = function() {
      /* update(); */
      /*
        Remove comments below these for a cool trailing effect & comment
        out the context.clearRect.
      */
      //context.fillStyle = 'rgba(255, 255, 255, .1)';
      //context.fillRect(0,0,C_WIDTH,C_HEIGHT);
      context.clearRect(0, 0, C_WIDTH, C_HEIGHT);
      for (var i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].render();
      }
      setTimeout(() => requestAnimationFrame(() => this.animate()), Math.random() * (200 - 100) + 100);
      
    }
  }
  
}

export default Starsky;

