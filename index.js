const todoForm = document.querySelector(".todo-form"),
todoInput = todoForm.querySelector(".todo-input"),
pendingList = document.querySelector(".pending-list"),
finishedList = document.querySelector(".finished-list");

const pendingArray = [];

function makePendingArray(pendingTodo){
  const pendingObj = {
    text:pendingTodo
  };
  pendingArray.push(pendingObj);
}

function showPendingList(todo){
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
  listLi.innerText = todo;
  
  makePendingArray(todo);
}

function submitHandle(event){
  event.preventDefault();
  if(todoInput.value !== ""){
    showPendingList(todoInput.value);
  }
  todoInput.value = "";
}

function init(){
  todoForm.addEventListener("submit",submitHandle);
}
init();