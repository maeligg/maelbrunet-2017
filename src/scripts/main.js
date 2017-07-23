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

window.onload = function () {
  svg4everybody();
  toggleOpen();
  unicorns();
};

window.addEventListener('resize', () => {
  const menu = document.querySelector('.menu-toggle');

  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
  }
});
