let dropdownMenu = document.getElementsByClassName("dropdownMenu");
let dropdownItem = document.getElementsByClassName("dropdown-item");
console.log(dropdownItem);
let id = document.getElementById("userbox");
function handleSelect() {
  if (id.value === "Login") {
    dropdownMenu[0].style.display = "block";
  } else if (id.value === "Guest") {
    dropdownMenu[0].style.display = "none";
    dropdownMenu[1].style.display = "none";
    dropdownMenu[2].style.display = "none";
  } else {
  }
}
Array.from(dropdownItem).forEach((element, index) => {
  element.addEventListener("click", () => {
    dropdownMenu[0].style.display = "none";
    if (index === 0) {
      dropdownMenu[1].style.display = "flex";
    } else {
      dropdownMenu[2].style.display = "flex";
    }
  });
});
