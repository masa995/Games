const popup = document.querySelector('.js-popup');
const popupBody = document.querySelector('.js-popup__body');
const popupClose = document.querySelector('.js-popup__close-btn');
const popupText = document.querySelector('.js-popup__text');
const popupOpenBtns = document.querySelectorAll('.js-btn-ruls');

if (popup !== null) {
  popupClose.addEventListener('click', (e) => {
    popup.classList.remove('active');
  });

  popupBody.addEventListener('click', (e) => {
    if (!e.target.closest('.js-popup__content')) {
      popup.classList.remove('active');
    }
  })

  popupOpenBtns.forEach((el) => {
    el.addEventListener('click', (e) => {
      popup.classList.add('active');
      const rulesNum = mapRuls(e.currentTarget.getAttribute('data-ruls'));
      const { textRules } = dataRules[rulesNum];
      popupText.innerHTML = `${textRules}`;
    });
  });
}

function mapRuls(name) {
  const gamesRules = {
    ticTacToe: 0,
    snake: 1
  }
  return gamesRules[name];
}