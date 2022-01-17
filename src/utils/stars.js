class Starsky {
  constructor(options) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = document.getElementById(options.id).offsetWidth;
    this.canvas.height = document.getElementById(options.id).offsetHeight;
    document.getElementById(options.id).appendChild(this.canvas);


    const randomColor = function() {
      var arrColors = ['ffffff', 'ffecd3', 'bfcfff'];
      return '#' + arrColors[Math.floor(Math.random() * 3)];
    };


    this.stars = [];
    for (let i = 0; i < 200; i++) {
      var randX = Math.floor(Math.random() * this.canvas.width + 1);
      var randY = Math.floor(Math.random() * this.canvas.height + 1);
      var randR = Math.random() * 1.4 + 0.3;

      this.stars[i] = new Star(this.canvas, randX, randY, randR, randomColor());
      /* this.stars.push(star); */
      this.stars[i].render();
    }

    this.update = function() {
      for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].update();
      }
    }

    this.animate = function() {
      requestAnimationFrame(() => this.snowfall());
      console.log('animate')
      this.update();
      const context = this.canvas.getContext('2d');
      /*
        Remove comments below these for a cool trailing effect & comment
        out the context.clearRect.
      */
      context.fillStyle = 'rgba(255, 255, 255, .1)';
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      //context.clearRect(0,0,C_WIDTH,C_HEIGHT);
      for (var i = 0; i < this.stars.length; i++) {
        this.stars[i].render();
      }
    }

    this.go = false;

    this.starryNight = function() {
      /* requestAnimationFrame(() => this.starryNight()); */
      
      if(this.go) {
        //clear canvas
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //update snowflakes
        this.animate();
      }
    }

    this.starryNight();

    this.start = function () {
      console.log('stars start');
      this.go = true;
    };

    this.stop = function () {
      this.go = false;
    };

    this.toggle = function () {
      console.log(this.go);
      this.go = !this.go;
    };
  }
}


class Star {
  constructor(canvas, x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rChange = 0.015;
    // this.vx = Math.floor(Math.random()*4+1);
    // this.vy = Math.floor(Math.random()*4+1);
    this.color = color;
    this.canvas = canvas;
  }

  render() {
    const context = this.canvas.getContext('2d');
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

export default Starsky;

/* var canvas = document.getElementById('options.id');
var context = canvas.getContext('2d');

var C_WIDTH = (canvas.width = document.body.offsetWidth);
var C_HEIGHT = (canvas.height = document.body.offsetHeight);

function randomColor() {
  var arrColors = ['ffffff', 'ffecd3', 'bfcfff'];
  return '#' + arrColors[Math.floor(Math.random() * 3)];
}

var arrStars = [];
for (let i = 0; i < 200; i++) {
  var randX = Math.floor(Math.random() * C_WIDTH + 1);
  var randY = Math.floor(Math.random() * C_HEIGHT + 1);
  var randR = Math.random() * 1.7 + 0.5;

  var star = new Star(randX, randY, randR, randomColor());
  arrStars.push(star);
}
function update() {
  for (let i = 0; i < arrStars.length; i++) {
    arrStars[i].update();
  }
} */

/* function animate() {
  update();
  context.fillStyle = 'rgba(255, 255, 255, .1)';
  context.fillRect(0, 0, C_WIDTH, C_HEIGHT);
  //context.clearRect(0,0,C_WIDTH,C_HEIGHT);
  for (var i = 0; i < arrStars.length; i++) {
    arrStars[i].render();
  }
  requestAnimationFrame(animate);
} */


