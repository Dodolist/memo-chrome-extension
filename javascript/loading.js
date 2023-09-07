const memoBottomBar = document.querySelector('.memo-bottombar');

const iconWrap = document.querySelector('.icon-wrap');
const loadingIcon = document.querySelector('.loading-icon');
const completeIcon = document.querySelector('.complete-icon');

const textWrap = document.querySelector('.text-wrap');
const syncText = document.querySelector('.sync-text');
const loadingText = document.querySelector('.loading-text');

function showLoading() {
  iconWrap.style.transform = 'translateX(1px)';
  syncText.style.transform = 'translateX(1px)';
  loadingText.style.opacity = 1;
  textWrap.style.color = '#00000000';

  loadingIcon.style.scale = 1;
  loadingIcon.style.opacity = 1;
  completeIcon.style.scale = 0;
  completeIcon.style.opacity = 0;

  memoBottomBar.style.opacity = 1;
}

function completeLoading() {
  iconWrap.style.transform = 'translateX(0px)';
  syncText.style.transform = 'translateX(0px)';
  loadingText.style.opacity = 0;
  textWrap.style.color = '#00000080';

  loadingIcon.style.scale = 0;
  loadingIcon.style.opacity = 0;
  completeIcon.style.scale = 1;
  completeIcon.style.opacity = 1;
  setTimeout(function () {
    if(autoSaveTimer === null) {
      hideLoading();
    }
  }, 1000);
}

function hideLoading() {
  memoBottomBar.style.opacity = 0;
  setTimeout(function () {
    iconWrap.style.transform = 'translateX(1px)';
    syncText.style.transform = 'translateX(1px)';
    loadingText.style.opacity = 1;
    textWrap.style.color = '#00000000';

    loadingIcon.style.scale = 1;
    loadingIcon.style.opacity = 1;
    completeIcon.style.scale = 0;
    completeIcon.style.opacity = 0;
  }, 200);
}
