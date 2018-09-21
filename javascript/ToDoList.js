function clicked() {
  var toDoList = document.getElementById("toDoList")
  var newItem = document.createElement("li")
  newItem.textContent = "New Item"
  toDoList.appendChild(newItem);
}
