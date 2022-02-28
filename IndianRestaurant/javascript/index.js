var counter = 1;
setInterval(function () {
   document.getElementById('radio' + counter).checked = true;
   counter++;
   if (counter > 5) {
      counter = 1;
   }
}, 4000);

const item =document.getElementsByClassName("navbutton");
let selected = document.getElementsByClassName("active");
let currentlocation =location.href;
let len=item.length;
if(len!==0)
{
for(let i=0;i<len;i++)
{
   if(item[i].href===currentlocation)
   {
      if(selected.length!==0)
      {
         selected[0].className = selected[0].className.replace(" active", "");
      }
      item[i].className += " active";
   }
   item[i].addEventListener("click",()=>
   {
      if(selected.length!==0)
      {
         selected[0].className = selected[0].className.replace(" active", "");
      }
      currentlocation =location.href;
      item[i].className += " active";
   })
}
}


const item1 =document.getElementsByClassName("navbutton1");
let selected1 = document.getElementsByClassName("active1");
let currentlocation1 =location.href;
let len1=item1.length;
if(len1 !== 0)
{
for(let j=0;j<len1;j++)
{
   if(item1[j].href===currentlocation1)
   {
      if(selected1.length!==0)
      {
         selected1[0].className = selected1[0].className.replace(" active1", "");
      }
      item1[j].className += " active1";
   }
   item1[j].addEventListener("click",()=>
   {
      if(selected1.length!==0)
      {
         selected1[0].className = selected1[0].className.replace(" active1", "");
      }
      currentlocation1 =location.href;
      item1[j].className += " active1";
   })
}
}
function clickme()
{
   let x = document.getElementById("navbar1link");
   if(x.style.display=="flex")
   {
      x.style.display ="none";
   }
   else
   {
      x.style.display ="flex";
   }
}
removehover()
function removehover()
{
  let ele=document.getElementsByClassName("menuitem");
  let elelen = ele.length;
  for(let h=0;h<elelen;h++)
  {
   ele[h].addEventListener("touchstart",()=>
   {
     if(ele[h].classList[1] != "hovereffect")
     {
        ele[h].classList.add("hovereffect");
     }
     else
     {
        ele[h].classList.remove("hovereffect");
     }
   });

   ele[h].addEventListener("mouseover",()=>
   {
     ele[h].classList.add("hovereffect");
   });
}
}

function navbtn()
{
   let navbtns= document.getElementsByClassName("manual-btn");
   let navlen = navbtns.length;
   for(let d=0;d<navlen;d++)
   {
      navbtns[d].addEventListener("touchstart",()=>
      {
         navbtns[d].style.background = "#40D3DC";
         setTimeout(navbtn(),1000);
         navbtns[d].style.background= "transparent";
      })
     
   }
}











