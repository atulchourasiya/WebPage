let dropdownMenu = document.getElementsByClassName('dropdownMenu');
let id = document.getElementById("userbox");
 function handleSelect() {
  if (id.value === "Sign up") {
      dropdownMenu[0].style.display = "block";
  }
  else
  {
   dropdownMenu[0].style.display = "none";
  }
}
function showSignup(){
  dropdownMenu[0].style.display = "none";
  dropdownMenu[2].style.display = "flex";
}
