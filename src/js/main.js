const btnMenu = document.querySelector('.js-btns-menu__icon');
const listMenu = document.querySelector('.js-btns-menu__list');

btnMenu.addEventListener('click', () => {
  btnMenu.classList.toggle('active');
  listMenu.classList.toggle('active');
});

function isTouchDevice(e) {
  return typeof window.ontouchstart !== 'undefined';
}
