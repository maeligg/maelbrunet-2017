const unicorns = () => {
  const pressed = [];
  const secretCode = 'unicorn';

  window.addEventListener('keyup', (e) => {
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('').includes(secretCode)) {
      cornify_add();
    }
  });
};

const toggleOpen = () => {
  const toggleElements = document.querySelectorAll('.js-toggle-open');
  toggleElements.forEach((element) => {
    element.addEventListener('click', function () {
      this.classList.toggle('open');
    });
  });
};

const plane = () => {
  const main = document.querySelector('main');
  const contactPage = main.classList.contains('contact');
  if (contactPage) {

    // Plane constructor
    const Plane = function(obj, path) {
      this.obj = obj;
      this.pos = 0;
      this.path = path;
      this.length = path.getTotalLength();
      this.speed = 10000;
      //this.speed = path.getTotalLength() / 1000;
      this.box = obj.getBBox();
    };

    Plane.prototype.update = function() {
      this.pos += this.speed;
      this.pos = this.pos >= this.length ? 0 : this.pos;
      this.render();
    };

    Plane.prototype.pathDir = function(path) {
      // path direction
      const pt1 = path.getPointAtLength(this.pos - 2);
      const pt2 = path.getPointAtLength(this.pos + 2);
      const angle = Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x) * (180 / Math.PI);
      return angle;
    };

    Plane.prototype.render = function() {
      // as the plane doesn't start at 0,0 we need to calculate its centre
      const X = +(this.box.x + (this.box.width / 2)).toFixed(1),
        Y = +(this.box.y + (this.box.height / 2)).toFixed(1);
      // find out its point along the path, then calculate the new X and Y positions:
      const mp = this.path.getPointAtLength(this.pos),
        tX = mp.x - X,
        tY = mp.y - Y;
      // get the rotation at the path point:
      const tR = this.pathDir(this.path) - 180; // adjusted to face the correct direction
      // apply the new attributes - note: setting X and Y on the rotate is essential if not at 0,0!
      this.obj.setAttribute('transform', 'translate(' + tX + ', ' + tY + ') rotate(' + tR + ' ' + X + ' ' + Y + ')');
      this.obj.setAttribute('opacity', 1);
    };

    // objects
    const path = document.querySelector('.fly-path');
    const plane = new Plane(document.querySelector('.plane'), path);

    // animator
    let raf;
    let interval = NaN;
    function animator() {
      const now = new Date().getTime(),
        dt = now - (interval || now);
      interval = now;
      raf = window.requestAnimationFrame(animator);
      plane.update(dt); // update the plane on each call
    }

    window.requestAnimationFrame(animator);
  }
};

window.onload = function () {
  svg4everybody();
  toggleOpen();
  //plane();
  unicorns();
};

window.addEventListener('resize', () => {
  const menu = document.querySelector('.menu-toggle');

  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
  }
});
