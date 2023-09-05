const memoList = document.querySelector('.memo-items');

document.addEventListener('DOMContentLoaded', function () {
  loadMemoData();

  // 입력 텍스트가 변경될 때마다 자동으로 저장
  inputTextarea.addEventListener('input', function () {
    const memoText = inputTextarea.value;
    const updated_at = DateToString();
    console.log("updated_at : " + updated_at);

    memoData[updated_at] = memoText;

    // 메모를 로컬 스토리지에 저장
    saveMemoData();
  });
});

function loadMemoData() {
  chrome.storage.sync.get('memoData', function (data) {
    if (data.memoData) {
      memoData = data.memoData;
      console.log('loadMemoData' + JSON.stringify(memoData, null, '\t'));
      createMemoData();
    }
  });
}

function saveMemoData() {
  chrome.storage.sync.set({ memoData: memoData }, function () {
  });
  console.log('saveMemoData' + JSON.stringify(memoData, null, '\t'));
}

function createMemoData() {
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
      selectMemoItem(memoData[key], updated_at);
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
  console.log("string" + string);

  return string;
}

function initMemoData() {
  chrome.storage.sync.set({ memoData: {} }, function () {
  });
}
