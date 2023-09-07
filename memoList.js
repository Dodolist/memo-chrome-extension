const memoList = document.querySelector('.memo-items');
const addMemo = document.querySelector('.add-memo');

document.addEventListener('DOMContentLoaded', function () {
  loadMemoData();

  // 입력 텍스트가 변경될 때마다 자동으로 저장
});

addMemo.addEventListener('click', function () {
  selectMemoItem('', '');
});

// 현재 select된 메모의 내용
var editedContent = '';
var editedUpdatedAt = '';
// autosaveTimer
var autoSaveTimer = null;
// memoData Object
var memoData = {};

inputTextarea.addEventListener('input', function () {
  clearTimeout(autoSaveTimer);
  showLoading();

  // 메모를 2초 후에 스토리지에 저장
  autoSaveTimer = setTimeout(function () {

    if (editedUpdatedAt) {
      delete memoData[editedUpdatedAt];
    }

    if (inputTextarea.value !== '') {
      const memoText = inputTextarea.value;
      const updated_at = DateToString();
      editedContent = memoText;
      editedUpdatedAt = updated_at;

      memoData[updated_at] = memoText;
      memoData = sortMemoList(memoData);
    }
    saveMemoData();
    createMemoData();
    completeLoading();
    autoSaveTimer = null;
  }, 2000);
});

function loadMemoData() {
  chrome.storage.sync.get('memoData', function (data) {
    if (Object.keys(data.memoData).length !== 0) {
      memoData = sortMemoList(data.memoData);

      editedContent = memoData[Object.keys(memoData)[0]];
      editedUpdatedAt = Object.keys(memoData)[0];
      changeContent();

      // MemoList div 생성
      createMemoData();
    }
  });
}

function saveMemoData() {
  chrome.storage.sync.set({ memoData: memoData }, function () {
  });
}

function createMemoData() {
  memoList.innerHTML = '';
  for (let key in memoData) {
    const memoItem = document.createElement('div');
    memoItem.classList.add('memo-item');
    var object = checkMemoLine(memoData[key]);
    var updated_at = key.split('!')[0];
    memoItem.innerHTML = `
      <div class="memo-item-title">${object.title}</div>
      <div class="memo-item-content">${updated_at} ${object.content}</div>
    `;
    memoItem.addEventListener('click', function () {
      selectMemoItem(memoData[key], key);
    });
    memoList.appendChild(memoItem);
  }
}

function selectMemoItem(content, updated_at) {
  const blackScreen = document.querySelector('.black-screen');
  const memoList = document.querySelector('.memo-list');
  memoList.classList.remove('active-memo-list');
  blackScreen.classList.remove('active-black-screen');
  showMemoList = false;

  editedContent = content;
  editedUpdatedAt = updated_at;
  inputTextarea.value = editedContent;
}

function checkMemoLine(data) {
  const memoObject = {};
  if (data.indexOf('\n') === -1) {
    memoObject.title = data;
    memoObject.content = '텍스트 내용 없음';
    return memoObject;
  } else {
    const lineIndex = data.indexOf('\n');
    const title = data.substring(0, lineIndex);
    const content = data.substring(lineIndex + 1);
    memoObject.title = title;
    memoObject.content = content;
    return memoObject;
  }
}

function DateToString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  const string = year + '. ' + month + '. ' + day + '.!' + hours + ':' + minutes + ':' + seconds;

  return string;
}

function initMemoData() {
  chrome.storage.sync.set({ memoData: {} }, function () {
  });
}

function sortMemoList(inputObject) {
  const keysArray = Object.keys(inputObject);

  keysArray.sort(function (a, b) {
    return new Date(b) - new Date(a);
  });

  const sortedObject = {};
  for (const key of keysArray) {
    sortedObject[key] = inputObject[key];
  }
  return sortedObject;
}

function changeContent() {
  inputTextarea.value = editedContent;
}


const deleteButton = document.querySelector('.delete');

deleteButton.addEventListener('click', clearMemo);

function clearMemo() {
  const inputTextarea = document.querySelector('.memo');
  const blackScreen = document.querySelector('.black-screen');
  const fullScreen = document.querySelector('.full-screen');
  const wrap = document.querySelector('.wrap');
  const bottombar = document.querySelector('.bottom');

  if (editedUpdatedAt) {
    delete memoData[editedUpdatedAt];
  }
  inputTextarea.value = '';
  saveMemoData();
  createMemoData();

  blackScreen.classList.remove('active-black-screen');
  fullScreen.classList.remove('active-full-screen');
  wrap.classList.remove('active-wrap');
  bottombar.classList.add('active-bottom');
  showTopbar = false;
}

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
