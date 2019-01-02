import svg4everybody from 'svg4everybody';
import Typed from 'typed.js';

// A generic class toggler on click
const toggleActive = () => {
  const toggleElements = document.querySelectorAll('.js-toggle-active');
  [].forEach.call(toggleElements, (element) => {
    element.addEventListener('click', () => {
      element.classList.toggle('active');
    });
  });
};

const initTyping = () => {
  if (document.querySelector('.txt-rotate')) {
    const options = {
      strings: ['front-end developer', 'UI designer', 'problem-solver'],
      typeSpeed: 80,
      backSpeed: 40,
      loop: true,
    };

    new Typed('.txt-rotate', options);
  }
};

// Better than konami code
const unicorns = () => {
  const pressed = [];
  const secretCode = 'unicorn';

  window.addEventListener('keyup', (e) => {
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('') === secretCode) {
      const img = document.createElement('img');
      img.src = '/images/unicorn.gif';
      img.classList.add('unicorn');
      img.addEventListener('click', (event) => {
        event.target.parentNode.removeChild(event.target);
      });
      document.querySelector('body').appendChild(img);
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
  // eslint-disable-next-line
  console.log(
    '%c%s',
    'color: #11af60; font-style: italic;',
    "Why, hello there ! If you're looking for the source code of this site, it's available at https://github.com/maeligg/maelbrunet . Hope you enjoy your stay !",
  );
};

// Display the cookie notice if not in the sessionStorage
const displayCookieNotice = () => {
  const cookiesWindow = document.querySelector('.js-cookies');
  if (!sessionStorage.getItem('cookies')) {
    cookiesWindow.classList.remove('is-hidden');
  }

  [].forEach.call(document.querySelectorAll('.js-cookies-agree'), (e) => {
    e.addEventListener('click', () => {
      sessionStorage.setItem('cookies', 'true');
      cookiesWindow.classList.add('is-hidden');
    });
  });

  document.querySelector('.js-cookies-disagree').addEventListener('click', () => {
    document.querySelector('.js-cookies-inner').classList.add('is-hidden');
    document.querySelector('.js-cookies-disagree-message').classList.remove('is-hidden');
  });
};

// Call functions
window.onload = () => {
  svg4everybody();
  initTyping();
  toggleActive();
  toggleMenu();
  unicorns();
  consoleGreet();
  displayCookieNotice();
};

window.addEventListener('resize', () => {
  const menu = document.querySelector('.menu-toggle');

  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
  }
});
