console.log("Welcome to Caveman notes");
showNotes(-1);
let markedimp = document.getElementsByClassName("bi-star-fill");
// Btn Add event Listner
function addNote(index, key) {
  let addtxt = document.getElementById("txt");
  let addtxtvalue = addtxt.value.split("\n");
  if (key != "task") {
    addtxtvalue = addtxtvalue.join("<br/>");
  }
  let addtitle = document.getElementById("titleTxt");
  let cards = localStorage.getItem(key);
  let cardObj;
  if (cards === null) {
    cardObj = [];
  } else {
    cardObj = JSON.parse(cards);
  }
  if (index < 0) {
    let imp = false;
    let pinned = false;
    if (key === "task") {
      for (let i = 0; i < addtxtvalue.length; i++) {
        addtxtvalue[i] = [addtxtvalue[i], false];
      }
    }
    cardObj.push([addtitle.value, addtxtvalue, imp, pinned]);
  } else {
    cardObj[index][0] = addtitle.value;
    if(key != 'task')
    {
      cardObj[index][1] = addtxtvalue;
    }
    else
    {
      let j;
      let i;
      let newArr = [];
      for (i = 0; i < addtxtvalue.length; i++) {
        for (j = 0; j < cardObj[index][1].length; j++) {
          if(addtxtvalue[i] === cardObj[index][1][j][0])
          {
             newArr.push([addtxtvalue[i],cardObj[index][1][j][1]]);
             cardObj[index][1][j][0] = 'NULL';
             break;
          } 
        }
        if(j === cardObj[index][1].length)
        {
          newArr.push([addtxtvalue[i],false]);
        }
      }
      cardObj[index][1] = newArr;
    }  
  }
  localStorage.setItem(key, JSON.stringify(cardObj));
  addtxt.value = "";
  addtitle.value = "";
  if (key === "task") {
    showNotes(-2);
  } else {
    showNotes(index);
  }
}
// ShowNotes
function showNotes(keyValue) {
  let key;
  if (keyValue === -2) {
    key = "task";
  } else {
    key = "notes";
  }
  let cards = localStorage.getItem(key);
  let cardObj;
  if (cards === null) {
    cardObj = [];
  } else {
    cardObj = JSON.parse(cards);
  }
  let html = "";
  if (keyValue === -2) {
    cardObj.forEach((element, index) => {
      html += `<div class=" card m-2" >
        <div class="card-body">
          <h5 class="card-title">${
            element[0] === "" ? "To Do " + (index + 1) : element[0]
          } <i title="Mark Important"class=" bi-star-fill" onclick="handleMarkImp(${index},-2)"></i></h5>
          <ul  class="card-text  card-text-task">
          ${taskListShow(index)}
        </ul>
           <a href="#titleTxt"> <button type="button" title="Edit" class="mb-2 btn btn-primary" onclick="editNote(${index},-2)">Edit</button></a>  
           <button id=${index} type="button" title="Delete" class="mb-2 btn btn-primary" onclick="deleteNote(this.id,-2)">Delete</button>
           <button  type="button" title="Clone"class="mb-2 btn btn-primary" onclick="Clone(${index},-2)"><i class=" bi-back"></i></button>
           <button id="pin" title="Pin" type="button" onclick="pin(${index},-2)" class="mb-2 btn btn-light"> <i class=" bi-pin-angle-fill"></i></button>
        </div>
      </div>`;
    });
  } else {
    cardObj.forEach((element, index) => {
      html += `<div class=" card m-2" >
      <div class="card-body">
        <h5 class="card-title">${
          element[0] === "" ? "Note " + (index + 1) : element[0]
        } <i title="Mark Important"class=" bi-star-fill" onclick="handleMarkImp(${index},-1)"></i></h5>
        <p class="card-text">
        ${element[1]}
        </p>
         <a href="#titleTxt"> <button type="button" title="Edit" class="mb-2 btn btn-primary" onclick="editNote(${index},-1)">Edit</button></a>  
         <button id=${index} type="button" title="Delete" class="mb-2 btn btn-primary" onclick="deleteNote(this.id,-1)">Delete</button>
         <button  type="button" title="Clone"class="mb-2 btn btn-primary" onclick="Clone(${index},-1)"><i class=" bi-back"></i></button>
         <button id="pin" title="Pin" type="button" onclick="pin(${index},-1)" class="mb-2 btn btn-light"> <i class=" bi-pin-angle-fill"></i></button>
      </div>
    </div>`;
    });
  }
  let noteElement = document.getElementById("note");
  if (cardObj.length != 0) {
    noteElement.innerHTML = html;
  } else {
    noteElement.innerHTML = `<div class="container">
      <p>Nothing to show add something to display it here</p>
    </div>`;
  }
  if (keyValue === -2) {
    showImpcard(-2);
    showPin(-2);
    ShowChecked();
  } else {
    showImpcard(-1);
    showPin(-1);
  }
}
// Mark Important
function handleMarkImp(index, keyValue) {
  let key;
  if (keyValue === -2) {
    key = "task";
  } else {
    key = "notes";
  }
  let cards = localStorage.getItem(key);
  let cardObj = JSON.parse(cards);
  if (cardObj[index][2] === false) {
    cardObj[index][2] = true;
  } else if (cardObj[index][2] === true) {
    cardObj[index][2] = false;
  }
  localStorage.setItem(key, JSON.stringify(cardObj));
  if (keyValue === -2) {
    showImpcard(-2);
  } else {
    showImpcard(-1);
  }
}
//show Important card
function showImpcard(keyValue) {
  let key;
  if (keyValue === -2) {
    key = "task";
  } else {
    key = "notes";
  }
  let cards = localStorage.getItem(key);
  let cardObj;
  if (cards === null) {
    cardObj = [];
  } else {
    cardObj = JSON.parse(cards);
  }
  cardObj.forEach((element, index) => {
    let markedimp = document.getElementsByClassName("bi-star-fill");
    let card = document.getElementsByClassName("card-body");
    if (element[2] === true) {
      markedimp[index].style.color = "rgba(0, 255, 0)";
      card[index].style.backgroundColor = "rgba(245, 255, 245, 0.788)";
    } else {
      markedimp[index].style.color = "rgba(214, 222, 225, 0.725)";
      card[index].style.backgroundColor = "white";
    }
  });
}
// Pin
function pin(index, keyValue) {
  let key;
  if (keyValue === -2) {
    key = "task";
  } else {
    key = "notes";
  }
  let cards = localStorage.getItem(key);
  let cardObj = JSON.parse(cards);
  if (cardObj[index][3] === false) {
    let pinnedIndex = cardObj[index];
    cardObj.splice(index, 1);
    cardObj.unshift(pinnedIndex);
    cardObj[0][3] = true;
  } else {
    cardObj[index][3] = false;
    let i;
    for (i = index; i < cardObj.length - 1; i++) {
      if (cardObj[i + 1][3] === false) {
        break;
      }
    }
    let insert = cardObj[index];
    cardObj.splice(index, 1);
    cardObj.splice(i, 0, insert);
  }
  localStorage.setItem(key, JSON.stringify(cardObj));
  if (keyValue === -2) {
    showNotes(-2);
  } else {
    showNotes(-1);
  }
}
// Show pin
function showPin(keyValue) {
  let key;
  if (keyValue === -2) {
    key = "task";
  } else {
    key = "notes";
  }
  let cards = localStorage.getItem(key);
  let cardObj;
  if (cards === null) {
    cardObj = [];
  } else {
    cardObj = JSON.parse(cards);
  }
  cardObj.forEach((element, index) => {
    let pin = document.getElementsByClassName("bi-pin-angle-fill");
    if (element[3] === true) {
      pin[index].style.color = "red";
    } else {
      pin[index].style.color = "rgba(164, 180, 185, 0.527)";
    }
  });
}
// Clone
function Clone(index, keyValue) {
  let key;
  if (keyValue === -2) {
    key = "task";
  } else {
    key = "notes";
  }
  let cards = localStorage.getItem(key);
  let cardObj = JSON.parse(cards);
  cardObj.splice(index + 1, 0, cardObj[index]);
  localStorage.setItem(key, JSON.stringify(cardObj));
  if (keyValue === -2) {
    showNotes(-2);
  } else {
    showNotes(-1);
  }
}
//Edit Note
function editNote(index, keyValue) {
  let key;
  if (keyValue === -2) {
    key = "task";
  } else {
    key = "notes";
  }
  let cards = localStorage.getItem(key);
  let cardObj = JSON.parse(cards);
  let addtxt = document.getElementById("txt");
  let addtitle = document.getElementById("titleTxt");
  addtitle.value = cardObj[index][0];
  let splitArray =[];
  if (keyValue != -2) {
    splitArray = cardObj[index][1].split("<br/>");
  }
  else
  {
    for (let i = 0; i < cardObj[index][1].length; i++) {
      splitArray.push(cardObj[index][1][i][0])
    }
  }
  addtxt.value = splitArray.join("\n");;
  let save = document.getElementById("savebtn");
  save.addEventListener(
    "click",
    function () {
      if (addtxt.value != "" && addtitle.value != "") {
        addNote(index, key);
      }
    },
    { once: true }
  );
}
// if Checked
function Checked(index, item) {
  let cards = localStorage.getItem("task");
  let cardObj = JSON.parse(cards);
  if (cardObj[index][1][item][1] === false) {
    cardObj[index][1][item][1] = true;
  } else if (!cardObj[index][1][item][1]) {
    cardObj[index][1][item][1] = true;
  } else {
    cardObj[index][1][item][1] = false;
  }
  localStorage.setItem("task", JSON.stringify(cardObj));
  ShowChecked();
}
//show checked
function ShowChecked() {
  let cards = localStorage.getItem("task");
  let cardObj;
  if (cards === null) {
    cardObj = [];
  } else {
    cardObj = JSON.parse(cards);
  }
  let lists = document.getElementsByClassName("card-text");
  Array.from(lists).forEach((element, index) => {
    element = Array.from(element.children);
    for (let i = 0; i < element.length; i++) {
      if (cardObj[index][1][i][1] === true) {
        element[i].getElementsByTagName("input")[0].checked = true;
      } else {
        element[i].getElementsByTagName("input")[0].checked = false;
      }
    }
  });
}
// DeleteNote
function deleteNote(event, keyValue) {
  let key;
  if (keyValue === -2) {
    key = "task";
  } else {
    key = "notes";
  }
  let cards = localStorage.getItem(key);
  let cardObj;
  if (cards === null) {
    cardObj = [];
  } else {
    cardObj = JSON.parse(cards);
  }
  cardObj.splice(event, 1);
  localStorage.setItem(key, JSON.stringify(cardObj));
  if (keyValue === -2) {
    showNotes(-2);
  } else {
    showNotes(-1);
  }
}
//Add CheckBox to Tasklist
function taskListShow(index) {
  let cards = localStorage.getItem("task");
  let cardObj;
  if (cards === null) {
    cardObj = [];
  } else {
    cardObj = JSON.parse(cards);
  }
  let html = "";
  for (let i = 0; i < cardObj[index][1].length; i++) {
    html += `<li class="taskList" onclick="Checked(${index},${i})" >
    <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
    <span>
       ${cardObj[index][1][i][0]}
    </span>
  </li>`;
  }
  return html;
}
function toggleTaskTodo() {
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
    addtask.style.display = "none";
    addbtn.style.display = "inline";
    Array.from(noteCard).forEach((element) => {
      element.style.display = "block";
    });
    showNotes(-1);
  } else {
    taskToDoBtn.innerText = "Note";
    taskToDoBtn.title = "Note";
    addANote.innerText = "Add Your Task";
    addAtitle.innerText = "Add Your Title";
    txt.placeholder = "Add your task separated by new line";
    titleTxt.placeholder = "Add your title";
    stabletxt[0].innerText = "Search Task By";
    addbtn.style.display = "none";
    addtask.style.display = "inline";
    Array.from(noteCard).forEach((element) => {
      element.style.display = "none";
    });
    showNotes(-2);
    ShowChecked();
  }
}
// Search text
let srchtxt = document.getElementsByClassName("srchtxt");
let search = document.getElementById("searchtxt");
search.addEventListener("focusout", () => {
  if (search.value === "") {
    for (let i = 0; i < srchtxt.length; i++) {
      srchtxt[i].style.display = "inline-block";
    }
  } else {
    for (let i = 0; i < srchtxt.length; i++) {
      srchtxt[i].style.display = "none";
    }
  }
});
search.addEventListener("input", () => {
  let inputval = search.value.toLowerCase();
  let noteCard = document.getElementsByClassName("card");
  let ismatch = false;
  Array.from(noteCard).forEach((element) => {
    let cardtxt;
    if(element.getElementsByTagName("p").length === 0)
    {
      cardtxt = element.getElementsByTagName("ul")[0].innerText;
    }
    else
    {
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
  let match = document.getElementsByClassName('Nomatch');
  if(!ismatch)
   {
     match[0].style.display = 'block';
   }
   else
   {
    match[0].style.display = 'none';
   }
});
