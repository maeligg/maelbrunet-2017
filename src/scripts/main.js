// A generic class toggler on click
const toggleActive = () => {
  const toggleElements = document.querySelectorAll('.js-toggle-active');
  [].forEach.call(toggleElements, (element) => {
    element.addEventListener('click', () => {
      element.classList.toggle('active');
    });
  });
};


// Relaunch animation that need to check for specific DOM elements
const checkDOM = () => {
  initTyping();
  toggleActive();
};


// Page transition using barba.js
const pageTransition = () => {
  Barba.Prefetch.init(); // Prefetch page when mouseover/touchstart
  document.querySelector('.barba-container').classList.add('visible');

  const FadeTransition = Barba.BaseTransition.extend({
    start() {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut() {
      const deferred = Barba.Utils.deferred();
      const mobileMenu = document.querySelector('.menu-toggle');

      if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
      }

      this.oldContainer.classList.remove('visible');
      this.oldContainer.addEventListener('transitionend', () => {
        deferred.resolve();
      }, false);

      return deferred.promise;
    },

    fadeIn() {
      checkDOM();
      this.newContainer.classList.add('visible');
      this.done();
    },
  });

  Barba.Pjax.getTransition = () => FadeTransition;

  Barba.Pjax.start();
};


// Better than konami code
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


// Mobile menu open toggle
const toggleMenu = () => {
  const menuToggler = document.querySelector('.js-menu-toggle');
  menuToggler.addEventListener('click', () => {
    menuToggler.classList.toggle('open');
  });
};


// Greeting message for the console
const consoleGreet = () => {
  console.log('%c%s',
    'color: #11af60; font-style: italic;',
    'Why, hello there ! If you\'re looking for the sources of this site, they\'re available at https://github.com/maeligg/maelbrunet . Hope you enjoy your stay !');
};


// Call functions
window.onload = () => {
  svg4everybody();
  initTyping();
  pageTransition();
  toggleActive();
  toggleMenu();
  unicorns();
  consoleGreet();
};

window.addEventListener('resize', () => {
  const menu = document.querySelector('.menu-toggle');

  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
  }
});
