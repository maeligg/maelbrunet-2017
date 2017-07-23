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

const fly = () => {
  const plane = document.querySelector('.js-plane');
  plane.addEventListener('click', () => {
    plane.classList.add('fly');
    setTimeout(() => {
      plane.classList.remove('fly');
    }, 1000);
  });
};

window.onload = function () {
  svg4everybody();
  toggleOpen();
  fly();
  unicorns();
};

window.addEventListener('resize', () => {
  const menu = document.querySelector('.menu-toggle');

  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
  }
});
