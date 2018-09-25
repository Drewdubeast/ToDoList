/*
var defaulttoDosArray = []
var toDoList;

function init() {
  //initialize the TODOLIST with items from localstorage and defaulttoDosArray
  var storedtoDosArray = JSON.parse(localStorage.getItem("ToDoList"))
  toDoList = document.getElementById("toDoList")
  var toDosArray = defaulttoDosArray
  if(storedtoDosArray) {
    toDosArray = toDosArray.concat(storedtoDosArray)
  }

  //Add default toDosArray
  toDosArray.forEach(function(todo) {
    var newItem = document.createElement("li")
    newItem.textContent = todo.name;
    setColorForItem(todo, newItem)

    if(todo.complete) {
      newItem.classList.toggle('checked');
    }

    toDoList.appendChild(newItem)
  })

  //Add event listener to the todo list
  toDoList.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');

      toDosArray.forEach(function(todo) {
        if(todo.name + '\u00D7' === ev.target.textContent) {
          todo.complete = !todo.complete
        }
      })
      updateLocalStorage(toDosArray)
    }
  }, false);

  //add the x to each
  Array.from(toDoList.getElementsByTagName("LI")).forEach(function(toDo, index) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = function() {
      //remove this item from the todo
      toDosArray.forEach(function(todo) {
        if(todo.name + '\u00D7' === toDo.textContent) {
          toDosArray.splice(index, 1);
          updateLocalStorage(toDosArray)
          toDo.style.display = "none"
        }
      })
    }
    toDo.appendChild(span);

  })
}

function addNewToDo() {
  var toDoList = document.getElementById("toDoList")
  var newItem = document.createElement("li")

  //item values
  var newToDo = {
    name: document.getElementById("nameInput").value,
    category: document.getElementById("categoryInput").value,
    description: document.getElementById("descriptionInput").value,
    dueDate: new Date(document.getElementById("dueDateInput").value),
    timeCreated: new Date(),
    complete: false,
  }

  var totaltoDosArray = JSON.parse(localStorage.getItem("ToDoList"))
  if(!totaltoDosArray) {
    totaltoDosArray = []
  }
  totaltoDosArray.push(newToDo)
  newItem.textContent = newToDo.name
  setColorForItem(newToDo, newItem)

  toDoList.appendChild(newItem)

  // Add the x to it
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);

  newItem.appendChild(span);

  //update local storage
  localStorage.setItem("ToDoList", JSON.stringify(totaltoDosArray))
}

function setColorForItem(toDo, element) {
  switch (toDo.category) {
    case "school":
      element.style.backgroundColor = "#ceefd0"
      break
    case "errand":
      element.style.backgroundColor = "#cee8ef"
      break
    case "personal":
      element.style.backgroundColor = "#d2c4f2"
      break
    case "other":
      element.style.backgroundColor = "#f1c3ca"
      break
    default:
      break
  }
}

function checkDateAndTimeValidity(date, time) {
  var date = Date.parse(date);

  //check date
  //check time
}

function updateLocalStorage(toDoList) {
  localStorage.removeItem("ToDoList");
  localStorage.setItem("ToDoList", JSON.stringify(toDoList))
}

/*----------------------------------------*/
/*----------------------------------------*/
/*----------------------------------------*/
/*----------------------------------------*/

var toDosArray = JSON.parse(localStorage.getItem("ToDoList"))
if(toDosArray === {} || !toDosArray) toDosArray = []
var toDoList = document.getElementById("toDoList")

// Add all of the loaded To-Dos to the DOM
toDosArray.forEach(function(todo) {
  var newItem = document.createElement("li")
  newItem.textContent = todo.name;
  setUpToDoItem(todo, newItem)

  if(todo.complete) {
    newItem.classList.toggle('checked');
  }

  toDoList.appendChild(newItem)
})

function addNewToDo() {
  var toDoList = document.getElementById("toDoList")
  var newItem = document.createElement("li")

  //User Input Values
  var newToDo = {
    name: document.getElementById("nameInput").value,
    category: document.getElementById("categoryInput").value,
    description: document.getElementById("descriptionInput").value,
    dueDate: new Date(document.getElementById("dueDateInput").value),
    timeCreated: new Date(),
    complete: false,
  }

  //Add new toDo object to local storage
  toDosArray.push(newToDo);
  updateLocalStorage();

  //Add item to the DOM
  newItem.textContent = newToDo.name
  setUpToDoItem(newToDo, newItem)

  toDoList.appendChild(newItem)

  //Update local storage with new item
  updateLocalStorage
}

function setUpToDoItem(toDo, element) {
  switch (toDo.category) {
    case "school":
      element.style.backgroundColor = "#ceefd0"
      break
    case "errand":
      element.style.backgroundColor = "#cee8ef"
      break
    case "personal":
      element.style.backgroundColor = "#d2c4f2"
      break
    case "other":
      element.style.backgroundColor = "#f1c3ca"
      break
    default:
      break
  }

  // Add toggle ability for the element
  element.addEventListener('click', function(event) {
    event.target.classList.toggle('checked');
    toDosArray.forEach(function(todo) {
      if(todo.name + '\u00D7' === event.target.textContent) {
        todo.complete = !todo.complete
      }
    })
    updateLocalStorage(toDosArray)
  }, false);

  //Setup x
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);

  //add action event listener for closing
  span.onclick = function() {
    toDosArray.forEach(function(todo, index) {
      if(todo.name + '\u00D7' === element.textContent) {
        toDosArray.splice(index, 1);
        updateLocalStorage()
        element.style.display = "none"
      }
    })
  }
  element.appendChild(span);
}

function updateLocalStorage() {
  //localStorage.removeItem("ToDoList");
  localStorage.setItem("ToDoList", JSON.stringify(toDosArray))
}
