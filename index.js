const todoForm = document.querySelector(".todo-form"),
todoInput = todoForm.querySelector(".todo-input"),
pendingList = document.querySelector(".pending-list"),
finishedList = document.querySelector(".finished-list");

function showList(){
}

function submitHandle(event){
  event.preventDefault();
  if(todoInput.value !== ""){
    showList();
  }
}

function init(){
  todoForm.addEventListener("submit",submitHandle);
}
init();