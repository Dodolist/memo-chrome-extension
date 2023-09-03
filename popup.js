var isTopbarHidden = false;

const memoTextarea = document.querySelector('.memo');
memoTextarea.addEventListener('input', function (e) {
  const cursorPosition = memoTextarea.selectionStart;

  const memoText = memoTextarea.value;

  if (memoTextarea.value[cursorPosition - 2] === '-'
    && memoTextarea.value[cursorPosition - 1] === '>') {
    memoTextarea.value = memoText.substring(0, cursorPosition - 2) + '→' + memoText.substring(cursorPosition);
    memoTextarea.selectionStart = cursorPosition - 1;
    memoTextarea.selectionEnd = cursorPosition - 1;
  }
});

document.addEventListener('DOMContentLoaded', function () {

  // 확장 프로그램이 열릴 때 저장된 메모를 불러와서 표시
  chrome.storage.local.get('memo', function (data) {
    if (data.memo) {
      memoTextarea.value = data.memo;
    }
  });

  // 입력 텍스트가 변경될 때마다 자동으로 저장
  memoTextarea.addEventListener('input', function () {
    const memoText = memoTextarea.value;

    // 메모를 로컬 스토리지에 저장
    chrome.storage.local.set({ memo: memoText }, function () {
    });
  });
});

memoTextarea.addEventListener('focus', function () {
  const memoTopbar = document.querySelector('.memo-topbar');
  memoTopbar.classList.add('active-memo-topbar');
});

memoTextarea.addEventListener('blur', function () {
  const memoTopbar = document.querySelector('.memo-topbar');
  memoTopbar.classList.remove('active-memo-topbar');
});

const reloadIcon = document.querySelector('.reload-icon');
const clearIcon = document.querySelector('.clear-icon');
const deleteButton = document.querySelector('.delete');
const cancelButton = document.querySelector('.cancel');

reloadIcon.addEventListener('click', isClickedReloadIcon);
clearIcon.addEventListener('click', isClickedClearIcon);
deleteButton.addEventListener('click', clearMemo);
cancelButton.addEventListener('click', cancel);

function isClickedReloadIcon() {
  chrome.storage.local.get('memo', function (data) {
    if (data.memo) {
      memoTextarea.value = data.memo;
    }
  });
  reloadIcon.classList.add('active-reload-icon');
  setTimeout(function () {
    reloadIcon.classList.remove('active-reload-icon');
  }, 500);
}

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
  const memoTextarea = document.querySelector('.memo');
  const blackScreen = document.querySelector('.black-screen');
  const fullScreen = document.querySelector('.full-screen');
  const wrap = document.querySelector('.wrap');
  const bottombar = document.querySelector('.bottom');
  // 메모를 로컬 스토리지에서 삭제
  chrome.storage.local.remove('memo', function () {
    memoTextarea.value = "";
  });
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
