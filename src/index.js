import { TaskList, MainList } from "./constructors.js";
import { displayMainList } from "./DOMstuff.js";
import "./css/main.css";

document.querySelector("#add-list-btn").addEventListener("click", () => {
  let input = document.querySelector("#add-list-input");
  let title = "";
  if (input.value === "") title = "Unnamed list";
  else title = input.value;
  MainList.addList(new TaskList(`${title}`));
  while (document.querySelector(".main-list").firstChild) {
    document.querySelector(".main-list").firstChild.remove();
  }
  displayMainList(MainList, document.querySelector(".main-list"));
});

if (localStorage.MainList)
  displayMainList(MainList, document.querySelector(".main-list"));
