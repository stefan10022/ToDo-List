class TaskList {
  constructor(title) {
    this.title = title;
    this.list = [];
  }
  addTask(task) {
    this.list.push(task);
    localStorage.setItem("MainList", JSON.stringify(MainList.list));
  }
  removeTask(index) {
    this.list.splice(index, 1);
    localStorage.setItem("MainList", JSON.stringify(MainList.list));
  }
}

const MainList = (function () {
  let list = [];
  if (localStorage.MainList) {
    list = JSON.parse(localStorage.MainList);
    list.forEach((element) => {
      Object.setPrototypeOf(element, TaskList.prototype);
    });
  }
  function addList(tasklist) {
    list.push(tasklist);
    localStorage.setItem("MainList", JSON.stringify(list));
  }
  function removeList(index) {
    list.splice(index, 1);
    localStorage.setItem("MainList", JSON.stringify(list));
  }
  return { addList, removeList, list };
})();

class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.check = false;
  }
}

export { MainList, TaskList, Task };
