console.log("Welcome to Caveman notes");
let addbtn = document.getElementById('addbtn');
showNotes();
addbtn.addEventListener('click',(e)=>{
   let addtxt = document.getElementById('txt'); 
   let addtitle = document.getElementById('titleTxt');
   let notes = localStorage.getItem("notes");
   let noteObj;  
   if(notes===null)
   {
      noteObj = [];
   }
   else
   {
      noteObj = JSON.parse(notes);
   }
   noteObj.push([addtitle.value,addtxt.value]);
   localStorage.setItem("notes",JSON.stringify(noteObj));
   addtxt.value ="";
   addtitle.value ="";
   showNotes();
});

function showNotes(){  
   let notes = localStorage.getItem("notes");
   let noteObj;  
   if(notes===null)
   {
      noteObj = [];
   }
   else
   {
      noteObj = JSON.parse(notes);
   } 
   let html = "";
   noteObj.forEach((element,index) => {
      html += `<div class="card m-2" >
      <div class="card-body">
        <h5 class="card-title">${(element[0]==='')?'Note '+(index+1):element[0]}</h5>
        <p class="card-text">
         ${element[1]}
        </p>
        <button id=${index} type="button" class="btn btn-primary" onclick="deleteNote(this.id)">Delete</button>
      </div>
    </div>`;
   });
   let noteElement =document.getElementById('note');
   if(noteObj.length != 0)
   {
      noteElement.innerHTML = html;
   }
   else
   {
      noteElement.innerHTML = `<div class="container">
      <p>Nothing to show add something to display it here</p>
    </div>`;
   }
}

function deleteNote(event){
   let notes = localStorage.getItem("notes");
   let noteObj;  
   if(notes===null)
   {
      noteObj = [];
   }
   else
   {
      noteObj = JSON.parse(notes);
   } 
   noteObj.splice(event,1);
   localStorage.setItem("notes",JSON.stringify(noteObj));
   showNotes();
}

let search =document.getElementById('searchtxt');
search.addEventListener('input',()=>{
   let inputval = search.value.toLowerCase();
   let noteCard = document.getElementsByClassName('card');
   Array.from(noteCard).forEach((element)=>{
      let cardtxt = element.getElementsByTagName('p')[0].innerText;
      if(cardtxt.includes(inputval))
      {
         element.style.display = "block";
      }
      else
      {
         element.style.display = "none";
      }
   }) 
})