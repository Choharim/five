const todoForm = document.querySelector(".todo-form"),
todoInput = todoForm.querySelector(".todo-input"),
pendingList = document.querySelector(".pending-list"),
finishedList = document.querySelector(".finished-list");

const PENDING_LS = "pending";
const FINISHED_LS = "finished";
const pendingArray = [];
const finishedArray = [];

function saveFinished(){
  localStorage.setItem(FINISHED_LS,JSON.stringify(finishedArray));
}

function makeFinishedArray(finishedTodo){
  const finishedObj = {
    text:finishedTodo
  };
  finishedArray.push(finishedObj);
  saveFinished();
}

function showFinishedList(finishedTodo){
  const listDiv = document.createElement("div");
  const listLi = document.createElement("li");
  const listDelBtn = document.createElement("button");
  const listBackBtn = document.createElement("button");

  finishedList.appendChild(listDiv);
  listDiv.appendChild(listLi);
  listDiv.appendChild(listDelBtn);
  listDiv.appendChild(listBackBtn);
  
  listDiv.classList.add("list-container");

  listDelBtn.innerHTML = `<i class="far fa-times-circle"></i>`;
  listBackBtn.innerHTML = `<i class="fas fa-undo-alt"></i>`;
  listLi.innerText = finishedTodo;

  makeFinishedArray(finishedTodo);
  listDelBtn.addEventListener("click",)
}

function moveToFinished(event){
  const finishedPandingBtn = event.target;
  const finishedPandingDiv = finishedPandingBtn.parentNode;
  const finishedText = finishedPandingDiv.children[0].innerText;
  const delIndex = pendingArray.findIndex(pendingTodo => pendingTodo.text === finishedText);
  
  showFinishedList(finishedText);
  pendingArray.splice(delIndex,1);
  savePending();
  finishedPandingDiv.remove();
}

function delPending(event){
  const delPendingBtn = event.target;
  const delPendingDiv = delPendingBtn.parentNode
  const delText = delPendingDiv.children[0].innerText;
  const delIndex = pendingArray.findIndex(pendingTodo => pendingTodo.text === delText);
  
  pendingArray.splice(delIndex,1);
  savePending();
  delPendingDiv.remove();
}

function savePending(){
  localStorage.setItem(PENDING_LS,JSON.stringify(pendingArray));
}

function makePendingArray(pendingTodo){
  const pendingObj = {
    text:pendingTodo
  };
  pendingArray.push(pendingObj);
  savePending();
}

function showPendingList(pendingTodo){
  const listDiv = document.createElement("div");
  const listLi = document.createElement("li");
  const listDelBtn = document.createElement("button");
  const listFinishedBtn = document.createElement("button");

  pendingList.appendChild(listDiv);
  listDiv.appendChild(listLi);
  listDiv.appendChild(listDelBtn);
  listDiv.appendChild(listFinishedBtn);
  
  listDiv.classList.add("list-container");

  listDelBtn.innerHTML = `<i class="far fa-times-circle"></i>`;
  listFinishedBtn.innerHTML = `<i class="far fa-check-circle"></i>`;
  listLi.innerText = pendingTodo;

  listDelBtn.addEventListener("click",delPending);
  listFinishedBtn.addEventListener("click",moveToFinished);
  
  makePendingArray(pendingTodo);
}

function submitHandle(event){
  event.preventDefault();
  if(todoInput.value !== ""){
    showPendingList(todoInput.value);
  }
  todoInput.value = "";
}

function init(){
  const string_loadedPending = localStorage.getItem(PENDING_LS);
  const parsed_loadedPending = JSON.parse(string_loadedPending);
  const string_loadedFinished = localStorage.getItem(FINISHED_LS);
  const parsed_loadedFinished = JSON.parse(string_loadedFinished);
  if(parsed_loadedPending !== null){
    parsed_loadedPending.forEach(todo => showPendingList(todo.text));
  }
  if(parsed_loadedFinished !== null){
    parsed_loadedFinished.forEach(todo => showFinishedList(todo.text));
  }
  todoForm.addEventListener("submit",submitHandle);
}
init();