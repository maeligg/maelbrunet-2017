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


// Can only be called from the console
// eslint-disable-next-line
const unicorn = () => {
  cornify_add();
  // eslint-disable-next-line
  console.log('Well, this is pretty childish.');
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
  console.log('%c%s',
    'color: #808080',
    '                   .,,uod8B8bou,,.\n' +
    '              ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:.\n' +
    '         ,=m8BBBBBBBBBBBBBBBRPFT?!||||||||||||||\n' +
    '         !...:!TVBBBRPFT||||||||||!!^^""\'   ||||\n' +
    '         !.......:!?|||||!!^^""\'            ||||\n' +
    '         !.........||||                     ||||\n' +
    '         !.........||||  Did you know ?     ||||\n' +
    '         !.........||||                     ||||\n' +
    '         !.........||||  You can also call  ||||\n' +
    '         !.........||||  unicorn()          ||||\n' +
    '         !.........||||  straight from the  ||||\n' +
    '         `.........||||  console. 🦄       ,||||\n' +
    '          .;.......||||               _.-!!|||||\n' +
    '   .,uodWBBBBb.....||||       _.-!!|||||||||!:\'\n' +
    '!YBBBBBBBBBBBBBBb..!|||:..-!!|||||||!iof68BBBBBb.... \n' +
    '!..YBBBBBBBBBBBBBBb!!||||||||!iof68BBBBBBRPFT?!::   `.\n' +
    '!....YBBBBBBBBBBBBBBbaaitf68BBBBBBRPFT?!:::::::::     `.\n' +
    '!......YBBBBBBBBBBBBBBBBBBBRPFT?!::::::;:!^"`;:::       `.  \n' +
    '!........YBBBBBBBBBBRPFT?!::::::::::^\'\'...::::::;         iBBbo.\n' +
    '`..........YBRPFT?!::::::::::::::::::::::::;iof68bo.      WBBBBbo.\n' +
    '  `..........:::::::::::::::::::::::;iof688888888888b.     `YBBBP^\'\n' +
    '    `........::::::::::::::::;iof688888888888888888888b.     `\n' +
    '      `......:::::::::;iof688888888888888888888888888888b.\n' +
    '        `....:::;iof688888888888888888888888888888888899fT!  \n' +
    '          `..::!8888888888888888888888888888888899fT|!^"\'   \n' +
    '            `\' !!988888888888888888888888899fT|!^"\' \n' +
    '                `!!8888888888888888899fT|!^"\'\n' +
    '                  `!988888888899fT|!^"\'\n' +
    '                    `!9899fT|!^"\'\n' +
    '                      `!^"\'');
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
