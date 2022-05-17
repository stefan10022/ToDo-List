import { MainList, Task, TaskList } from "./constructors.js";

function displayTaskList(tasklist, parent) {
  let mainElement = document.createElement("div");
  mainElement.classList.add("list-container");
  mainElement.classList.add("show-opacity");
  let domElement = document.createElement("div");
  domElement.setAttribute("data-list", MainList.list.indexOf(tasklist));
  mainElement.setAttribute("data-list-container", MainList.list.indexOf(tasklist));
  domElement.classList.add("list");
  let header = document.createElement("div");
  header.classList.add("list-header");
  header.innerText = tasklist.title;
  let addBtn = document.createElement("button");
  addBtn.classList.add("add-task-btn");
  addBtn.innerText = "Add new task";
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete list";
  deleteBtn.classList.add("list-delete-btn");
  domElement.append(header, addBtn, deleteBtn);
  addBtn.addEventListener("click", () =>
    displayTaskForm(domElement.getAttribute("data-list"))
  );
  deleteBtn.addEventListener("click", () => {
    MainList.removeList(domElement.getAttribute("data-list"));
    document.querySelector(`[data-list-container="${domElement.getAttribute("data-list")}"]`).remove();
  });
  tasklist.list.forEach((member) => {
    displayTask(member, domElement);
  });
  mainElement.append(domElement);
  parent.append(mainElement);
}

function displayMainList(mainlist, parent) {
  mainlist.list.forEach((element) => {
    displayTaskList(element, parent);
  });
}

function displayTaskForm(data) {
  let popUp = document.createElement("div");
  popUp.classList.add("popup");

  let form = document.createElement("form");
  form.classList.add("task-form");

  let addTitleContainer = document.createElement("div");
  let addTitle = document.createElement("input");
  let addTitleLabel = document.createElement("label");
  addTitleLabel.innerText = "Title:";
  addTitleLabel.setAttribute("for", "form-title");
  addTitle.setAttribute("id", "form-title");
  addTitleContainer.append(addTitleLabel, addTitle);

  let addDateContainer = document.createElement("div");
  let addDate = document.createElement("input");
  addDate.setAttribute("type", "date");
  let addDateLabel = document.createElement("label");
  addDateLabel.innerText = "Due Date:";
  addDateLabel.setAttribute("for", "form-date");
  addDate.setAttribute("id", "form-title");
  addDateContainer.append(addDateLabel, addDate);

  let addDescriptionContainer = document.createElement("div");
  let addDescription = document.createElement("textarea");
  addDescription.setAttribute("id", "form-description");
  let addDescriptionLabel = document.createElement("label");
  addDescriptionLabel.innerText = "Description:";
  addDescriptionLabel.setAttribute("for", "form-description");
  addDescriptionContainer.append(addDescriptionLabel, addDescription);

  let addPriorityContainer = document.createElement("div");
  let addPriority = document.createElement("select");
  addPriority.setAttribute("id", "form-priority");
  let addPriorityHigh = document.createElement("option");
  addPriorityHigh.setAttribute("value", "high");
  addPriorityHigh.innerText = "High";
  let addPriorityNormal = document.createElement("option");
  addPriorityNormal.setAttribute("value", "normal");
  addPriorityNormal.innerText = "Normal";
  let addPriorityLow = document.createElement("option");
  addPriorityLow.setAttribute("value", "low");
  addPriorityLow.innerText = "Low";
  addPriority.append(addPriorityHigh, addPriorityNormal, addPriorityLow);
  let addPriorityLabel = document.createElement("label");
  addPriorityLabel.innerText = "Priority:";
  addPriorityLabel.setAttribute("for", "form-priority");
  addPriorityContainer.append(addPriorityLabel, addPriority);

  let submitBtn = document.createElement("button");
  submitBtn.innerText = "Create task";
  submitBtn.setAttribute("type", "button");
  submitBtn.classList.add("form-submit-btn");

  let exitIcon = document.createElement("div");
  let exitIconInner = document.createElement("i");
  exitIconInner.classList = "fa-solid fa-xmark fa-2x";
  exitIcon.append(exitIconInner);
  exitIcon.classList.add("exit-icon");

  form.append(
    addTitleContainer,
    addDateContainer,
    addDescriptionContainer,
    addPriorityContainer,
    submitBtn,
    exitIcon
  );
  popUp.append(form);
  document.body.append(popUp);

  submitBtn.addEventListener("click", () => {
    if (addTitle.value === "") alert("Task must have a title");
    else {
      let newTask = new Task(
        addTitle.value,
        addDescription.value,
        addDate.value,
        addPriority.value
      );
      MainList.list[data].addTask(newTask);
      displayTask(newTask, document.querySelector(`[data-list="${data}"]`));
      popUp.classList.toggle("show-opacity");
      setTimeout(() => {
        popUp.remove();
      }, "300");
    }
  });

  exitIcon.addEventListener("click", () => {
    popUp.classList.toggle("show-opacity");
    setTimeout(() => {
      popUp.remove();
    }, "300");
  });

  setTimeout(() => {
    popUp.classList.toggle("show-opacity");
  }, "0");
}

function displayTask(task, parent) {
  let taskElement = document.createElement("div");
  taskElement.classList.add("task");
  if (task.priority === "high") taskElement.classList.toggle("high");
  if (task.priority === "normal") taskElement.classList.toggle("normal");
  if (task.priority === "low") taskElement.classList.toggle("low");
  let header = document.createElement("div");
  header.classList.add("task-header");
  header.addEventListener("click", () => {
    if (taskElement.contains(description)) {
      description.remove();
      iconElement.classList = "fa-solid fa-chevron-right";
    } else {
      taskElement.append(description);
      iconElement.classList = "fa-solid fa-chevron-down";
    }
  });
  let titleAndIcon = document.createElement("div");
  titleAndIcon.classList.add("title-and-icon");
  let titleElement = document.createElement("div");
  titleElement.innerText = task.title;
  titleElement.style = "font-weight: 600;";
  let dateElement = document.createElement("div");
  dateElement.classList.add("task-date");
  if (task.dueDate === "") dateElement.innerText = "Date due: (Not specified)";
  else dateElement.innerText = `Date due: ${task.dueDate}`;
  let iconElement = document.createElement("i");
  iconElement.classList = "fa-solid fa-chevron-right";
  titleAndIcon.append(iconElement, titleElement);
  header.append(titleAndIcon, dateElement);
  taskElement.append(header);
  let description = document.createElement("div");
  description.classList.add("task-description");
  if (task.description !== "") description.innerText = task.description;
  else description.innerText = "(No description...)";

  parent.append(taskElement);
  setTimeout(() => {
    taskElement.classList.toggle("show-opacity");
  }, "300");
}

export { displayMainList, displayTask, displayTaskList };
