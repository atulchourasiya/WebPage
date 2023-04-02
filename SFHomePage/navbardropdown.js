document.getElementById('navbarDropdown').addEventListener('click',()=>{
   document.getElementById('dropdownContainer').classList.toggle('showNavbarDropDown');
});
window.addEventListener('click',(event)=>{
   if(!event.target.closest('#navbarDropdown')){
      document.getElementById('dropdownContainer').classList.remove('showNavbarDropDown');
   }
})