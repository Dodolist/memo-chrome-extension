const memoList = document.querySelector('.memo-items');
const addMemo = document.querySelector('.add-memo');

document.addEventListener('DOMContentLoaded', function () {
  loadMemoData();
});

addMemo.addEventListener('click', function () {
  selectMemoItem('', '');
});

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
