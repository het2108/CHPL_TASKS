function addTask() {
  const input = document.getElementById("todo-input");
  const task = input.value.trim();

  if (task === "") {
    alert("Please enter a task.");
    return;
  }

  const taskList = document.getElementById("todo-list");

  const deleteButton = document.createElement("button");
  const newElement = document.createElement("div");

  deleteButton.innerText = "Delete";
  newElement.className = "todo-item"; // giving className to apply css properties
  newElement.innerText = task;
  deleteButton.onclick = function () {
    taskList.removeChild(newElement);
  };

  newElement.appendChild(deleteButton);

  taskList.appendChild(newElement);

  input.value = "";
}


function searchTasks() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const tasks = document.querySelectorAll(".todo-item"); //to get all task elements
  
    tasks.forEach((task) => {
      const taskText = task.innerText.toLowerCase();
      if (taskText.includes(searchInput)) {
        task.style.display = "block"; // Show task 
      } else {
        task.style.display = "none"; // Hide task 
      }
    });
  }
  