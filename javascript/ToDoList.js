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
  if(newToDo.name === "" || newToDo.description === "" || newToDo.dueDate === "Invalid Date") {
    alert("You must fill in all the fields!")
  } else {

    //Add new toDo object to local storage
    toDosArray.push(newToDo);
    updateLocalStorage();

    //Add item to the DOM
    newItem.textContent = newToDo.name
    setUpToDoItem(newToDo, newItem)

    toDoList.appendChild(newItem)

    //Update local storage with new item
    updateLocalStorage();
  }
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

  setupTimer(toDo)
}

function updateLocalStorage() {
  //localStorage.removeItem("ToDoList");
  localStorage.setItem("ToDoList", JSON.stringify(toDosArray))
}

function sort() {
  //grab value from sort choice
  var sortChoice = document.getElementById("sortByInput").value
  var sortFunction = function() {}

  switch(sortChoice) {
    case "complete":
      sortFunction = function(a, b) {
        if(a.complete == b.complete)
          return 0
        else
          return 1 //default return value (no sorting)
      }
    break
    case "name":
      sortFunction = function(a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
          return -1
        if (nameA > nameB)
          return 1
        return 0 //default return value (no sorting)
      }
      break
    case "category":
      sortFunction = function(a, b) {
        if (a.category < b.category) //sort string ascending
          return -1
        if (a.category > b.category)
          return 1
        return 0 //default return value (no sorting)
      }
      break
    case "dueDate":
      sortFunction = function(a, b) {
        if (a.dueDate < b.dueDate)
          return -1
        if (a.dueDate > b.dueDate)
          return 1
        return 0
      }
      break
    case "timeCreated":
      sortFunction = function(a, b) {
        if (a.timeCreated < b.timeCreated)
          return -1
        if (a.timeCreated > b.timeCreated)
          return 1
        return 0
      }
      break
    default:
      sortFunction = function(a, b) {
        return a-b
      }
      break
  }

  toDosArray.sort(sortFunction)

  updateLocalStorage();
  location.reload()
}

function setupTimer(toDo) {
  var x = setInterval(function() {
    var now = new Date();
    now.setMinutes(now.getMinutes()+5);
    var difference = toDo.dueDate - now

    if(difference < 0) {
      //Do the shit now.
      var alertBox = document.getElementById("alert")
      alertBox.textContent = toDo.name + " is due in 5 minutes! Click this alert to remove."
      alertBox.style.display = "block"
      alertBox.addEventListener('click', function() {
        alertBox.style.display = "none"
      })
      var audio = new Audio('audio/ding.wav');
      audio.play();
      clearInterval(x)
    }
  })
}

function showAlert() {
  var alertBox = document.getElementById("alert")
  alertBox.textContent = " is due in 5 minutes!"
  alertBox.style.display = "block"
  alertBox.addEventListener('click', function() {
    alertBox.style.display = "none"
  })
  var audio = new Audio('audio/ding.wav');
  audio.play();
}
