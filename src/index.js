import { TaskList, MainList } from "./constructors.js";
import { displayMainList, displayTaskList } from "./DOMstuff.js";
import "./css/main.css";

document.querySelector("#add-list-btn").addEventListener("click", () => {
  let input = document.querySelector("#add-list-input");
  let title = "";
  if (input.value === "") title = "Unnamed list";
  else title = input.value;
  let newTaskList = new TaskList(`${title}`);
  MainList.addList(newTaskList);
  displayTaskList(newTaskList, document.querySelector(".main-list"));
});

if (localStorage.MainList)
  displayMainList(MainList, document.querySelector(".main-list"));
