const inputTextarea = document.querySelector('.memo');
const memoTopbar = document.querySelector('.memo-topbar');
let timer;

inputTextarea.addEventListener('input', function (e) {
  const cursorPosition = inputTextarea.selectionStart;

  const memoText = inputTextarea.value;

  if (inputTextarea.value[cursorPosition - 2] === '-'
    && inputTextarea.value[cursorPosition - 1] === '>') {
    inputTextarea.value = memoText.substring(0, cursorPosition - 2) + '→' + memoText.substring(cursorPosition);
    inputTextarea.selectionStart = cursorPosition - 1;
    inputTextarea.selectionEnd = cursorPosition - 1;
  }
});


inputTextarea.addEventListener('input', function () {
  if(showTopbar) {
    memoTopbar.classList.remove('active-memo-topbar');
    showTopbar = false;
  }

  clearTimeout(timer);

  timer = setTimeout(function () {
    memoTopbar.classList.add('active-memo-topbar');
    showTopbar = true;
  }, 2000);
});

inputTextarea.addEventListener('click', function () {
  if(showTopbar) {
    memoTopbar.classList.remove('active-memo-topbar');
    showTopbar = false;
  }

  clearTimeout(timer);

  timer = setTimeout(function () {
    memoTopbar.classList.add('active-memo-topbar');
    showTopbar = true;
  }, 2000);
});

const cancelButton = document.querySelector('.cancel');
cancelButton.addEventListener('click', clickCancel);

function isClickedClearIcon() {
  const blackScreen = document.querySelector('.black-screen');
  const fullScreen = document.querySelector('.full-screen');
  const wrap = document.querySelector('.wrap');
  const bottombar = document.querySelector('.bottom');

  blackScreen.classList.add('active-black-screen');
  fullScreen.classList.add('active-full-screen');
  wrap.classList.add('active-wrap');
  bottombar.classList.add('active-bottom');
  showTopbar = true;
}

function clickCancel() {
  const blackScreen = document.querySelector('.black-screen');
  const fullScreen = document.querySelector('.full-screen');
  const wrap = document.querySelector('.wrap');
  const bottombar = document.querySelector('.bottom');

  blackScreen.classList.remove('active-black-screen');
  fullScreen.classList.remove('active-full-screen');
  wrap.classList.remove('active-wrap');
  bottombar.classList.add('active-bottom');
  showTopbar = false;
}
