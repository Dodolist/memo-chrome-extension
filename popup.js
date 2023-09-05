var isTopbarHidden = false;

const inputTextarea = document.querySelector('.memo');

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

inputTextarea.addEventListener('focus', function () {
  const memoTopbar = document.querySelector('.memo-topbar');
  memoTopbar.classList.add('active-memo-topbar');
});

inputTextarea.addEventListener('blur', function () {
  const memoTopbar = document.querySelector('.memo-topbar');
  memoTopbar.classList.remove('active-memo-topbar');
});

//const reloadIcon = document.querySelector('.reload-icon');
const deleteButton = document.querySelector('.delete');
const cancelButton = document.querySelector('.cancel');

//reloadIcon.addEventListener('click', isClickedReloadIcon);
deleteButton.addEventListener('click', clearMemo);
cancelButton.addEventListener('click', cancel);

/*
 function isClickedReloadIcon() {
  chrome.storage.sync.get('memo', function (data) {
    if (data.memo) {
      inputTextarea.value = data.memo;
    }
  });
  reloadIcon.classList.add('active-reload-icon');
  setTimeout(function () {
    reloadIcon.classList.remove('active-reload-icon');
  }, 500);
}
*/

function isClickedClearIcon() {
  const blackScreen = document.querySelector('.black-screen');
  const fullScreen = document.querySelector('.full-screen');
  const wrap = document.querySelector('.wrap');
  const bottombar = document.querySelector('.bottom');

  blackScreen.classList.add('active-black-screen');
  fullScreen.classList.add('active-full-screen');
  wrap.classList.add('active-wrap');
  bottombar.classList.add('active-bottom');
  isTopbarHidden = true;
}

function clearMemo() {
  const inputTextarea = document.querySelector('.memo');
  const blackScreen = document.querySelector('.black-screen');
  const fullScreen = document.querySelector('.full-screen');
  const wrap = document.querySelector('.wrap');
  const bottombar = document.querySelector('.bottom');
  // 메모를 로컬 스토리지에서 삭제
  /*
  chrome.storage.sync.remove('memo', function () {
    inputTextarea.value = "";
  });
  */
  blackScreen.classList.remove('active-black-screen');
  fullScreen.classList.remove('active-full-screen');
  wrap.classList.remove('active-wrap');
  bottombar.classList.add('active-bottom');
  isTopbarHidden = false;
}

function cancel() {
  const blackScreen = document.querySelector('.black-screen');
  const fullScreen = document.querySelector('.full-screen');
  const wrap = document.querySelector('.wrap');
  const bottombar = document.querySelector('.bottom');

  blackScreen.classList.remove('active-black-screen');
  fullScreen.classList.remove('active-full-screen');
  wrap.classList.remove('active-wrap');
  bottombar.classList.add('active-bottom');
  isTopbarHidden = false;
}
