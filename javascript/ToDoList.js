var defaultToDos = [
  {
    name: "Do Web Dev Homework",
    category: "school",
    description: "Get started on the to-do list"
  },
  {
    name: "Do Operating Systems homework",
    category: "school",
    description: "Get started on the OSShell"
  },
  {
    name: "Do German Homework",
    category: "school",
    description: "Get started on the to-do list"
  },
  {
    name: "Procrastinate more",
    category: "other",
    description: "Don't do what you're supposed to do today"
  },
  {
    name: "Grocery shopping",
    category: "errand",
    description: "Get more milk and yogurt from target"
  }
]

function init() {
  //initialize the TODOLIST with items from localstorage and defaultToDos
  var totalToDos = JSON.parse(localStorage.getItem("ToDoList"))
  var toDoList = document.getElementById("toDoList")

  //Add default todos
  defaultToDos.forEach(function(todo) {
    var newItem = document.createElement("li")
    newItem.textContent = todo.name;
    setColorForItem(todo, newItem)
    toDoList.appendChild(newItem)
  })

  //add local storage todos
  if(totalToDos) {
    totalToDos.forEach(function(todo) {
      var newItem = document.createElement("li")
      newItem.textContent = todo.name;
      setColorForItem(todo, newItem)
      console.log(todo)
      toDoList.appendChild(newItem)
    })
  }
}

function addNewToDo() {
  var toDoList = document.getElementById("toDoList")
  var newItem = document.createElement("li")

  //item values
  var newToDo = {
    name: document.getElementById("nameInput").value,
    category: document.getElementById("categoryInput").value,
    description: document.getElementById("descriptionInput").value
  }

  var totalToDos = JSON.parse(localStorage.getItem("ToDoList"))
  if(!totalToDos) {
    totalToDos = []
  }
  totalToDos.push(newToDo)
  newItem.textContent = newToDo.name
  setColorForItem(newToDo, newItem)

  toDoList.appendChild(newItem)

  //update local storage
  localStorage.setItem("ToDoList", JSON.stringify(totalToDos))
}

function setColorForItem(toDo, element) {
  switch (toDo.category) {
    case "school":
      element.style.backgroundColor = "blue"
      break
    case "errand":
      element.style.backgroundColor = "yellow"
      break
    case "personal":
      element.style.backgroundColor = "cyan"
      break
    case "other":
      element.style.backgroundColor = "red"
      break
    default:
      break
  }
}
