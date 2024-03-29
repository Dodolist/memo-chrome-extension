const blackScreen = document.querySelector('.black-screen');
const clearIcon = document.querySelector('.clear-icon');
const moreIcon = document.querySelector('.more-icon');

clearIcon.addEventListener('click', isClickedClearIcon);
moreIcon.addEventListener('click', isClickedMoreIcon);

function isClickedClearIcon() {
  const fullScreen = document.querySelector('.full-screen');
  const wrap = document.querySelector('.wrap');
  const bottombar = document.querySelector('.bottom');

  blackScreen.classList.add('active-black-screen');
  fullScreen.classList.add('active-full-screen');
  wrap.classList.add('active-wrap');
  bottombar.classList.add('active-bottom');
  showTopbar = false;
}

function isClickedMoreIcon() {
  const memoList = document.querySelector('.memo-list');

  memoList.classList.add('active-memo-list');
  blackScreen.classList.add('active-black-screen');
  showMemoList = true;
  showTopbar = false;
}
