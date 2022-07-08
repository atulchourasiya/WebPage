import * as themefunction from "./theme.js";
sessionStorage.setItem("state", "notes");
console.log("Welcome to Caveman notes");
themefunction.theme();
showNotes();
let editingIndex = -1;
let searching = false;
//  Add Note
window.addNote = function () {
  let User = getUser();
  if (User === null) {
    alert(`⚠️Please sign up to create an account first!`)
    return;
  }
  if (searching === true) {
    alert("⚠️ Searching is in process!");
    return;
  }
  let state = sessionStorage.getItem("state");
  let addtxt = document.getElementById("txt");
  let addtxtvalue = addtxt.value.split("\n");
  if (state != "task") {
    addtxtvalue = addtxtvalue.join("<br/>");
  }
  let addtitle = document.getElementById("titleTxt");
  let imp = false;
  let pinned = false;
  if (state === "task") {
    for (let i = 0; i < addtxtvalue.length; i++) {
      addtxtvalue[i] = [addtxtvalue[i], false];
    }
  }
  User[state].push([addtitle.value, addtxtvalue, imp, pinned]);
  let index = User[state].length - 1;
  if (
    User[state][index][1] === "" ||
    (User[state][index][1].length === 1 && User[state][index][1][0][0] === "")
  ) {
    alert(
      `⚠️ You Can't Add Empty ${state === "task" ? "Task" : "Note"}!`
    );
  } else {
    setUser(User);
    addtxt.value = "";
    addtitle.value = "";
    showNotes();
    editingIndex = -1;
  }
};
//  Save Edit
window.saveEdit = function () {
  let User = getUser();
  if (User === null) {
    alert(`⚠️Please sign up to create an account first!`)
    return;
  }
  if (searching === true) {
    alert("⚠️ Searching is in process!");
    return;
  }
  if (editingIndex === -1) {
    alert("⚠️ You have to edit something to Save Edit!");
    return;
  }
  let state = sessionStorage.getItem("state");
  let index = editingIndex;
  let addtxt = document.getElementById("txt");
  let addtxtvalue = addtxt.value.split("\n");
  if (state != "task") {
    addtxtvalue = addtxtvalue.join("<br/>");
  }
  let addtitle = document.getElementById("titleTxt");
  User[state][index][0] = addtitle.value;
  if (state != "task") {
    User[state][index][1] = addtxtvalue;
  } else {
    let j;
    let i;
    let newArr = [];
    for (i = 0; i < addtxtvalue.length; i++) {
      for (j = 0; j < User[state][index][1].length; j++) {
        if (addtxtvalue[i] === User[state][index][1][j][0]) {
          newArr.push([addtxtvalue[i], User[state][index][1][j][1]]);
          User[state][index][1][j][0] = "NULL";
          break;
        }
      }
      if (j === User[state][index][1].length) {
        newArr.push([addtxtvalue[i], false]);
      }
    }
    User[state][index][1] = newArr;
  }
  if (
    User[state][index][1] === "" ||
    (User[state][index][1].length === 1 && User[state][index][1][0][0] === "")
  ) {
    alert(
      `⚠️ You Can't Save Empty ${
        state === "task" ? "Task" : "Note"
      }!`
    );
  } else {
    setUser(User);
    addtxt.value = "";
    addtitle.value = "";
    showNotes()
    editingIndex = -1;
  }
};
// ShowNotes
function showNotes() {
  let User = getUser();
  let noteElement = document.getElementById("note");
  if (User !== null) {
    let state = sessionStorage.getItem("state");
    let html = "";
    if (state === 'task') {
      User[state].forEach((element, index) => {
        html += `<div class=" card m-2" >
          <div class="card-body">
            <h5 class="card-title">${
              element[0] === "" ? "To Do " + (index + 1) : element[0]
            } <i title="Mark Important"class=" bi-star-fill" onclick="handleMarkImp(${index})"></i></h5>
            <ul  class="card-text  card-text-task">
            ${taskListShow(index)}
          </ul>
             <a href="#titleTxt"> <button type="button" title="Edit" class="mb-2 btn btn-primary" onclick="editNote(${index})">Edit</button></a>  
             <button id=${index} type="button" title="Delete" class="mb-2 btn btn-primary" onclick="deleteNote(this.id)">Delete</button>
             <button  type="button" title="Clone"class="mb-2 btn btn-primary" onclick="Clone(${index})"><i class=" bi-back"></i></button>
             <button  title="Pin" type="button" onclick="pin(${index})" class="mb-2 btn btn-light"> <i class=" bi-pin-angle-fill"></i></button>
          </div>
        </div>`;
      });
    } else {
      User[state].forEach((element, index) => {
        html += `<div class=" card m-2" >
        <div class="card-body">
          <h5 class="card-title">${
            element[0] === "" ? "Note " + (index + 1) : element[0]
          } <i title="Mark Important"class=" bi-star-fill" onclick="handleMarkImp(${index})"></i></h5>
          <p class="card-text">
          ${element[1]}
          </p>
           <a href="#titleTxt"> <button type="button" title="Edit" class="mb-2 btn btn-primary" onclick="editNote(${index})">Edit</button></a>  
           <button id=${index} type="button" title="Delete" class="mb-2 btn btn-primary" onclick="deleteNote(this.id)">Delete</button>
           <button  type="button" title="Clone"class="mb-2 btn btn-primary" onclick="Clone(${index})"><i class=" bi-back"></i></button>
           <button title="Pin" type="button" onclick="pin(${index})" class="mb-2 btn btn-light"> <i class=" bi-pin-angle-fill"></i></button>
        </div>
      </div>`;
      });
    }
    if (User[state].length != 0) {
      noteElement.innerHTML = html;
    } else {
      noteElement.innerHTML = `<div class="container">
        <p>Nothing to show add something to display it here</p>
      </div>`;
    }
    showPin();
    if(state === 'task')
    ShowChecked();
  }
  else{
    noteElement.innerHTML = `<div class="container">
        <p>Nothing to show add something to display it here</p>
      </div>`;
  }
  themefunction.showTheme();
}
// Mark Important
window.handleMarkImp = function (index) {
  let User = getUser();
  if (User === null) {
    return;
  }
  let state = sessionStorage.getItem("state");
  if (User[state][index][2] === false) {
    User[state][index][2] = true;
  } else if (User[state][index][2] === true) {
    User[state][index][2] = false;
  }
  setUser(User);
  showNotes();
};
//show Important card
export function showImpcard(theme) {
  let User = getUser();
  if (User !== null) {
    let state = sessionStorage.getItem("state");
    User[state].forEach((element, index) => {
      let markedimp = document.getElementsByClassName("bi-star-fill");
      let card = document.getElementsByClassName("card-body");
      if (element[2] === true) {
        markedimp[index].style.color = "rgba(0, 255, 0)";
        if (theme === "dark") {
          card[index].style.backgroundColor = "#0a3560";
        } else {
          card[index].style.backgroundColor = "#efffff";
        }
      } else {
        markedimp[index].style.color = "rgba(214, 222, 225, 0.725)";
        if (theme === "dark") {
          card[index].style.backgroundColor = "#061f38";
        } else {
          card[index].style.backgroundColor = "white";
        }
      }
    });
  }
}
// Pin
window.pin = function (index) {
  let User = getUser();
  if (User === null) {
    return;
  }
  let state = sessionStorage.getItem("state");
  if (editingIndex != -1) {
    alert("⚠️ You have to Save Edit!");
    return;
  }
  if (User[state][index][3] === false) {
    let pinnedIndex = User[state][index];
    User[state].splice(index, 1);
    User[state].unshift(pinnedIndex);
    User[state][0][3] = true;
  } else {
    User[state][index][3] = false;
    let i;
    for (i = index; i < User[state].length - 1; i++) {
      if (User[state][i + 1][3] === false) {
        break;
      }
    }
    let insert = User[state][index];
    User[state].splice(index, 1);
    User[state].splice(i, 0, insert);
  }
   setUser(User);
   showNotes();
};
// Show pin
function showPin() {
  let User = getUser();
  if (User === null) {
    return;
  }
  let state = sessionStorage.getItem("state");
  User[state].forEach((element, index) => {
    let pin = document.getElementsByClassName("bi-pin-angle-fill");
    if (element[3] === true) {
      pin[index].style.color = "red";
    } else {
      pin[index].style.color = "rgba(164, 180, 185, 0.527)";
    }
  });
}
// Clone
window.Clone = function (index) {
  let User = getUser();
  if (User === null) {
    return;
  }
  let state = sessionStorage.getItem("state");
  if (editingIndex != -1) {
    alert("⚠️ You have to Save Edit!");
    return;
  }
  User[state].splice(index + 1, 0, User[state][index]);
  setUser(User);
  showNotes();
};
//Edit Note
window.editNote = function (index) {
  let User = getUser();
  if (User === null) {
    return;
  }
  let state = sessionStorage.getItem("state");
  let addtxt = document.getElementById("txt");
  let addtitle = document.getElementById("titleTxt");
  addtitle.value = User[state][index][0];
  let splitArray = [];
  if (state != -2) {
    splitArray = User[state][index][1].split("<br/>");
  } else {
    for (let i = 0; i < User[state][index][1].length; i++) {
      splitArray.push(User[state][index][1][i][0]);
    }
  }
  addtxt.value = splitArray.join("\n");
  editingIndex = index;
};
// if Checked
window.Checked = function (index, item) {
  let User = getUser();
  if (User === null) {
    return;
  }
  let state = sessionStorage.getItem("state");
  if (User[state][index][1][item][1] === false) {
    User[state][index][1][item][1] = true;
  } else if (!User[state][index][1][item][1]) {
    User[state][index][1][item][1] = true;
  } else {
    User[state][index][1][item][1] = false;
  }
  setUser(User);
  ShowChecked();
};
//show checked
function ShowChecked() {
  let User = getUser();
  if (User === null) {
    return;
  }
  let state = sessionStorage.getItem("state");
  let lists = document.getElementsByClassName("card-text");
  Array.from(lists).forEach((element, index) => {
    element = Array.from(element.children);
    for (let i = 0; i < element.length; i++) {
      if (User[state][index][1][i][1] === true) {
        element[i].getElementsByTagName("input")[0].checked = true;
      } else {
        element[i].getElementsByTagName("input")[0].checked = false;
      }
    }
  });
}
// DeleteNote
window.deleteNote = function (event) {
  let User = getUser();
  if (User === null) {
    return;
  }
  let state = sessionStorage.getItem("state");
  if (editingIndex != -1) {
    alert("⚠️ You have to Save Edit!");
    return;
  }
  User[state].splice(event, 1);
  setUser(User);
  showNotes()
};
//Add CheckBox to Tasklist
function taskListShow(index) {
  let User = getUser();
  if (User === null) {
    return;
  }
  let state = sessionStorage.getItem("state");
  let html = "";
  for (let i = 0; i < User[state][index][1].length; i++) {
    html += `<li class="taskList" onclick="Checked(${index},${i})" >
    <input class="form-check-input me-1 strike" type="checkbox" value="" aria-label="...">
    <span>
       ${User[state][index][1][i][0]}
    </span>
  </li>`;
  }
  return html;
}
//Toggle between task and notes
window.toggleTaskTodo = function () {
  sessionStorage.setItem("state", "notes");
  let stabletxt = document.getElementsByClassName("stabletxt");
  let noteCard = document.getElementsByClassName("card");
  if (taskToDoBtn.innerText === "Note") {
    taskToDoBtn.innerText = "To Do List";
    taskToDoBtn.title = "To Do List";
    addANote.innerText = "Add A Note";
    addAtitle.innerText = "Add A Title";
    txt.placeholder = "Write your note";
    titleTxt.placeholder = "Write your title";
    stabletxt[0].innerText = "Search Note By";
    addbtn.innerText = 'Add Note';
    addbtn.title = 'Add Note';
    Array.from(noteCard).forEach((element) => {
      element.style.display = "block";
    });
  } else {
    sessionStorage.setItem("state", "task");
    taskToDoBtn.innerText = "Note";
    taskToDoBtn.title = "Note";
    addANote.innerText = "Add Your Task";
    addAtitle.innerText = "Add Your Title";
    txt.placeholder = "Add your task separated by new line";
    titleTxt.placeholder = "Add your title";
    stabletxt[0].innerText = "Search Task By";
    addbtn.innerText = 'Add Task';
    addbtn.title = 'Add Task';
    Array.from(noteCard).forEach((element) => {
      element.style.display = "none";
    });
  }
  showNotes();
};
// Search text
let srchtxt = document.getElementsByClassName("srchtxt");
let search = document.getElementById("searchtxt");
search.addEventListener("input", hideFilptxt);

function hideFilptxt() {
  if (search.value === "") {
    for (let i = 0; i < srchtxt.length; i++) {
      srchtxt[i].style.display = "inline-block";
    }
    searching = false;
  } else {
    for (let i = 0; i < srchtxt.length; i++) {
      srchtxt[i].style.display = "none";
    }
    searching = true;
  }
}
search.addEventListener("input", () => {
  let inputval = search.value.toLowerCase();
  let noteCard = document.getElementsByClassName("card");
  let ismatch = false;
  Array.from(noteCard).forEach((element) => {
    let cardtxt;
    if (element.getElementsByTagName("p").length === 0) {
      cardtxt = element.getElementsByTagName("ul")[0].innerText;
    } else {
      cardtxt = element.getElementsByTagName("p")[0].innerText;
    }
    let titletxt = element.getElementsByTagName("h5")[0].innerText;
    if (cardtxt.toLowerCase().includes(inputval)) {
      element.style.display = "block";
      ismatch = true;
    } else if (titletxt.toLowerCase().includes(inputval)) {
      element.style.display = "block";
      ismatch = true;
    } else {
      element.style.display = "none";
    }
  });
  let match = document.getElementsByClassName("Nomatch");
  if (!ismatch && noteCard.length != 0) {
    match[0].style.display = "block";
  } else {
    match[0].style.display = "none";
  }
});
//GetUser
function getUser() {
  let loggedUser = localStorage.getItem('loggedUser');
  let returnUser;
  if (loggedUser === null) {
    return null;
  } else {
    let user = localStorage.getItem("User");
    let userObj;
    if (user === null) {
      userObj = [];
    } else {
      userObj = JSON.parse(user);
    }
    userObj.forEach(Element => {
      if (loggedUser === Element.name) {
        returnUser = Element;
        return;
      }
    });
  }
  return returnUser;
}
//set user
function setUser(Object) {
  let user = localStorage.getItem("User");
  let userObj;
  if (user === null) {
    userObj = [];
  } else {
    userObj = JSON.parse(user);
  }
  userObj.forEach((Element,index)=> {
    if (Element.name === Object.name) {
      userObj[index]=Object;
    }
  });
  localStorage.setItem('User',JSON.stringify(userObj));
}
