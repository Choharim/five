const todoForm = document.querySelector(".todo-form"),
todoInput = todoForm.querySelector(".todo-input"),
pendingList = document.querySelector(".pending-list"),
finishedList = document.querySelector(".finished-list");

const PENDING_LS = "pending";
const pendingArray = [];

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

  if(parsed_loadedPending !== null){
    parsed_loadedPending.forEach(todo => showPendingList(todo.text));
  }
  todoForm.addEventListener("submit",submitHandle);
}
init();