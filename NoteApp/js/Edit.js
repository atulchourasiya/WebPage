let closebtnreplace = document.getElementsByClassName("closebtnreplace");
let id;
closebtnreplace[0].addEventListener('click', () => {
   document.getElementById('replacemenu').style.display = 'none'
});
//Handle Copy
function Copy(id) {
   let button = document.getElementById('dropdownMenuButton1');
   let text = document.getElementById(id);
   navigator.clipboard.writeText(text.value);
   button.innerHTML = `Copied<i class="fa-solid fa-paste ps-1"></i>`
   setTimeout(() => {
      button.innerHTML = `Copy<i class="fa-solid fa-paste ps-1"></i>`
   }, 1000);
}
//Handle Uppercase
function UpperCase(id) {
   let text = document.getElementById(id);
   text.value = text.value.toUpperCase();
}
//Handle Capitalize
function capitalize(id) {
   let text = document.getElementById(id);
   let TextValue = '';
   let firstletter = true;
   for (let word of text.value) {
      if (word === ' ' || word === '\n') {
         TextValue += word;
         firstletter = true;
      } else if (firstletter) {
         TextValue += word.toUpperCase();
         firstletter = false;
      } else {
         TextValue += word.toLowerCase();
      }
   }
   text.value = TextValue;
}
//Handle Lowercase
function LowerCase(id) {
   let text = document.getElementById(id);
   text.value = text.value.toLowerCase();
}
//Handle Reset
function Reset(id) {
   let text = document.getElementById(id);
   text.value = '';
}
//Handle Format
function Format(id) {
   let text = document.getElementById(id);
   let textValue = text.value.split(/[\n]+/);
   textValue = textValue.join("\n");
   textValue = textValue.split(/[ ]+/)
   textValue = textValue.join(" ");
   text.value = textValue;
}
//Handle Replace
function Replace(identity) {
   replacemenu.style.display = 'block';
   id = document.getElementById(identity);
}

let replacebtn = document.getElementById('replacebtn');
replacebtn.addEventListener('click', () => {
   let replaceOldWord = document.getElementById('replaceOldWord');
   let replaceNewWord = document.getElementById('replaceNewWord');
   id.value = id.value.replaceAll(replaceOldWord.value, replaceNewWord.value);
   replaceNewWord.value = ''
   replaceOldWord.value = ''
   replacemenu.style.display = 'none';
});