//select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input")
console.log(dateElement);

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
//variables
let LIST, id;
//get item from localstorage
let data = localStorage.getItem("ToDo");

//check if data is  not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadlist(LIST);
} else {
  LIST = [];
  id = 0;
}
//load items to the user interface
function loadlist(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//clear function
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function
function addToDo(ToDo, id, done, trash) {
  if (trash) { return; }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text    ${LINE}" >${ToDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}">
    </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//addToDo("drink tea");

//add an item to list user the enter key
document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const ToDo = input.value;
    if (ToDo) {
      addToDo(ToDo, id, false, false);
      LIST.push({
        name: ToDo,
        id: id,
        done: false,
        trash: false
      });
      //add item to localstorage
      localStorage.setItem("ToDo", JSON.stringify(LIST));

      id++;
    }
    input.value = " ";
  }
});

//addToDo("coffee",1, false, false);
//complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}
//target the items dynamically
list.addEventListener("click", function (event) {
  const element = event.target; //return the clicked element
  const elementJob = element.attributes.job.value;
  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  //add item to localstorage
  localStorage.setItem("ToDo", JSON.stringify(LIST));

});


