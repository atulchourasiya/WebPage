console.log("Welcome to Caveman notes");
debugger;
showNotes();
showImpcard();
let addbtn = document.getElementById("addbtn");
let markedimp = document.getElementsByClassName("bi-star-fill");
// Btn Add event Listner
addbtn.addEventListener("click", (e) => {
  let addtxt = document.getElementById("txt");
  let addtxtvalue = addtxt.value.split("\n");
  addtxtvalue = addtxtvalue.join("<br/>");
  let addtitle = document.getElementById("titleTxt");
  let imp = false;
  let notes = localStorage.getItem("notes");
  let noteObj;
  if (notes === null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.push([addtitle.value, addtxtvalue, imp]);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  addtxt.value = "";
  addtitle.value = "";
  showNotes();
  showImpcard();
});
// Mark Important 
function handleMarkImp(index){
  console.log(index)
   let notes = localStorage.getItem("notes");
   let noteObj;
   if (notes === null) {
     noteObj = [];
   } else {
     noteObj = JSON.parse(notes);
   }
   if (noteObj[index][2] === false) {
     noteObj[index][2] = true;
    } else if(noteObj[index][2] === true){
      noteObj[index][2] = false;
    }
    localStorage.setItem("notes", JSON.stringify(noteObj));
    showImpcard();
}
function showImpcard(){
   let notes = localStorage.getItem("notes");
   let noteObj;
   if (notes === null) {
     noteObj = [];
   } else {
     noteObj = JSON.parse(notes);
   }
   noteObj.forEach((element,index)=>{
      let markedimp = document.getElementsByClassName("bi-star-fill");
      let card = document.getElementsByClassName("card-body");
      if(element[2]===true)
      {
         markedimp[index].style.color = "rgba(0, 255, 0)";
         card[index].style.backgroundColor = "rgba(245, 255, 245, 0.788)"
      }
      else
      {
         markedimp[index].style.color = "rgba(214, 222, 225, 0.725)";
         card[index].style.backgroundColor = "white"
      }
   })
}
// showNotes 
function showNotes() {
  let notes = localStorage.getItem("notes");
  let noteObj;
  if (notes === null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let html = "";
  noteObj.forEach((element, index) => {
    html += `<div class=" card m-2" >
      <div class="card-body">
        <h5 class="card-title">${
          element[0] === "" ? "Note " + (index + 1) : element[0]
        } <i class=" bi-star-fill" onclick="handleMarkImp(${index})"></i></h5>
        <p class="card-text">
         ${element[1]}
        </p>
        <button id=${index} type="button" class="btn btn-primary" onclick="deleteNote(this.id)">Delete</button>
      </div>
    </div>`;
  });
  let noteElement = document.getElementById("note");
  if (noteObj.length != 0) {
    noteElement.innerHTML = html;
  } else {
    noteElement.innerHTML = `<div class="container">
      <p>Nothing to show add something to display it here</p>
    </div>`;
  }
}
// DeleteNote 
function deleteNote(event) {
  let notes = localStorage.getItem("notes");
  let noteObj;
  if (notes === null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.splice(event, 1);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  showNotes();
  showImpcard();
}
// Search text 
let search = document.getElementById("searchtxt");
search.addEventListener("input", () => {
  let inputval = search.value.toLowerCase();
  let noteCard = document.getElementsByClassName("card");
  Array.from(noteCard).forEach((element) => {
    let cardtxt = element.getElementsByTagName("p")[0].innerText;
    let titletxt = element.getElementsByTagName("h5")[0].innerText;
    if (cardtxt.toLowerCase().includes(inputval)) {
      element.style.display = "block";
    } else if (titletxt.toLowerCase().includes(inputval)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

