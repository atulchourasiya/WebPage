let screen = document.getElementById('screen');
buttons = document.querySelectorAll('button');
let screenvalue = '';
for(item of buttons) 
{
   item.addEventListener('click' , (e)=>{
      buttonText = e.target.innerText;
      if (buttonText=='x')
      {
         buttonText = '*';
         screenvalue += buttonText;
         screen.value = screenvalue;
      }
      else if (buttonText=='÷')
      {
         buttonText = '/';
         screenvalue += buttonText;
         screen.value = screenvalue;
      }
      else if(buttonText=='AC')
      {
         screenvalue = '';
         screen.value = screenvalue;
      }
      else if(buttonText=='⌫')
      {
         screenvalue= screenvalue.slice(0, -1);
         screen.value = screenvalue;
      }
      else if( buttonText== '=')
      {
         screen.value = eval(screenvalue);
      }
      else{
         screenvalue += buttonText;
         screen.value = screenvalue;
      }
   }
   )
}