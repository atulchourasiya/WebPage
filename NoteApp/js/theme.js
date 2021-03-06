import { showImpcard } from "./app.js";
const Sound = new Audio("./asset/click.mp3");

// setting Theme 
function theme() {
  let theme = localStorage.getItem("theme");
  let themeObj;
  if (theme === null) {
    themeObj = { mode: true };
    localStorage.setItem("theme", JSON.stringify(themeObj));
  } else {
    themeObj = JSON.parse(theme);
  }
  let themeBtn = document.getElementsByClassName("Togglebtn");

  themeBtn[0].addEventListener("click", () => {
    Sound.play();
    if (themeObj.mode === false) {
      themeObj.mode = true;
    } else {
      themeObj.mode = false;
    }
    localStorage.setItem("theme", JSON.stringify(themeObj));
    showTheme();
  });
}

//theme Function
function showTheme() {
  let theme = localStorage.getItem("theme");
  let themeObj;
  if (theme === null) {
    themeObj = { mode: false };
  } else {
    themeObj = JSON.parse(theme);
  }
  let card = document.getElementsByClassName("card");
  let cardBody = document.getElementsByClassName("card-body");
  let strike = document.getElementsByClassName("form-check-input");
  let taskList = document.getElementsByClassName("taskList");
  let navbar = document.getElementById("navbarBackground");
  let dropdownMenu = document.getElementsByClassName("dropdownMenu");
  let closebtn = document.getElementsByClassName("closebtn");
  let closebtnreplace = document.getElementsByClassName("closebtnreplace");
  if (themeObj.mode === true) {
    flexSwitchCheckDefault.checked = true;
    document.body.style.background = "#061f38";
    document.body.style.color = "white";
    titleTxt.style.background = "#061f38";
    titleTxt.style.color = "white";
    txt.style.background = "#061f38";
    txt.style.color = "white";
    userbox.style.background = "#0f2d4bd0";
    userbox.style.color = "white";
    replacemenu.style.background = "#184a7c";
    closebtnreplace[0].classList.add("btn-close-white");
    Array.from(dropdownMenu).forEach((ele,index) => {
      ele.style.background = "#184a7c";
      closebtn[index].classList.add("btn-close-white");
    });
    Array.from(strike).forEach((ele) => {
      ele.classList.add("strikedark");
      ele.classList.remove("strikelight");
    });
    Array.from(card).forEach((ele, index) => {
      ele.style.background = "#061f38";
      cardBody[index].style.background = "#061f38";
      cardBody[index].style.borderColor = "#ced4da";
    });
    navbar.classList.remove("bg-light");
    navbar.style.background = "#0f2d4b";
    navbar.classList.add("navbar-dark", "navbar-light");
    form.style.background = "#0f2d4b";
    searchtxt.style.color = "white";
    footer.style.background = "#0f2d4b";
    footer.style.color = "white";
    if (sessionStorage.getItem("state") === "task") {
      Array.from(taskList).forEach((ele, index) => {
        ele.style.borderColor = "#ced4da";
      });
      showImpcard("dark");
    } else {
      showImpcard("dark");
    }
  } else {
    document.body.style.background = "white";
    document.body.style.color = "black";
    titleTxt.style.background = "white";
    titleTxt.style.color = "black";
    txt.style.background = "white";
    txt.style.color = "black";
    userbox.style.background = "#ffffffcc";
    userbox.style.color = "black";
    replacemenu.style.background = "#eaf8f8";
    closebtnreplace[0].classList.remove("btn-close-white");
    Array.from(dropdownMenu).forEach((ele,index) => {
      ele.style.background = "#eaf8f8";
      closebtn[index].classList.remove("btn-close-white");
    });
    Array.from(strike).forEach((ele) => {
      ele.classList.remove("strikedark");
      ele.classList.add("strikelight");
    });
    Array.from(card).forEach((ele, index) => {
      ele.style.background = "white";
      cardBody[index].style.background = "white";
      cardBody[index].style.borderColor = "#0000002d";
    });
    navbar.style.background = "none";
    navbar.classList.replace("navbar-dark", "navbar-light");
    navbar.classList.add("bg-light");
    form.style.background = "white";
    searchtxt.style.color = "black";
    footer.style.background = "#f5f9fa";
    footer.style.color = "black";
    if (sessionStorage.getItem("state") === "task") {
      Array.from(taskList).forEach((ele, index) => {
        ele.style.borderColor = "#0000002d";
      });
      showImpcard("light");
    } else {
      showImpcard("light");
    }
  }
}
export { theme, showTheme };
