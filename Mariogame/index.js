import platform from "./image/platform.png";
import hills from "./image/hills.png";
import bg from "./image/background.png";
import spriterunleft from "./image/spriteRunLeft.png";
import spriterunright from "./image/spriteRunRight.png";
import spritestandright from "./image/spriteStandRight.png";
import spritestandleft from "./image/spriteStandLeft.png";
import platformsmalltall from "./image/platformSmallTall.png";
import './style.css'
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
const gravity = .5;

class Player {
   constructor() {
      this.speed =10;
      this.position = {
         x: 100,
         y: 100
      }
      this.velocity = {
         x: 0,
         y: 1
      }
      this.width = 66;
      this.height = 150;
      this.image = Createimage(spritestandright);
      this.frame =0;
      this.sprite={
         stand:{
            right:Createimage(spritestandright),
            left:Createimage(spritestandleft),
            cropwidth: 177,
            width:66
         },
         run:{
            right:Createimage(spriterunright),
            left:Createimage(spriterunleft),
            cropwidth:341,
            width:127.875
         }
      }
      this.currentSprite =this.sprite.stand.right
      this.currentcropwidth =177
   }
   draw() {
      c.drawImage(this.currentSprite,this.currentcropwidth*this.frame,0,this.currentcropwidth,400,this.position.x,this.position.y,this.width,this.height)
   }
   update() {
      this.frame+=1;
      if(this.frame>59 && (this.currentSprite===this.sprite.stand.right||this.currentSprite===this.sprite.stand.left))
      {
         this.frame =0;
      }
      else if(this.frame>29 &&(this.currentSprite === this.sprite.run.right||this.currentSprite === this.sprite.run.left))
      {
         this.frame =0;
      }
      this.draw()
      this.position.y += this.velocity.y;
      this.position.x += this.velocity.x;
      if (this.position.y + this.height + this.velocity.y <= canvas.height)
         this.velocity.y += gravity
   
   }
}

class Platform {
   constructor({x,y,image}){
      this.position ={
          x,// x:x,
          y// y:y
      }
      this.image= image
      this.width =image.width
      this.height =image.height
   }
   draw(){
     c.drawImage(this.image,this.position.x,this.position.y)
   }  
}
class GenericObject {
   constructor({x,y,image}){
      this.position ={
          x,// x:x,
          y// y:y
      }
      this.image= image
      this.width =image.width
      this.height =image.height
   }
   draw(){
     c.drawImage(this.image,this.position.x,this.position.y)
   }  
}
function Createimage(imageSrc){
   const image =new Image();
   image.src = imageSrc;
   return image
}

let platformimage = Createimage(platform)
let platformsmalltallimage =Createimage(platformsmalltall);
let player = new Player();

let platforms = []

let genericObjects =[]
let currentkey
let keys ={
   right :{
      pressed: false
   },
   left :{
      pressed: false
   }

}
let scrollOffset = 0;
function init(){
 platformimage = Createimage(platform)
 player = new Player();

 platforms = [new Platform({ x:platformimage.width*4+300-2+platformimage.width-platformsmalltallimage.width,y:270,image:Createimage(platformsmalltall)}),new Platform({ x:-1,y:460,image:platformimage}),new Platform({ x:platformimage.width-3,y:460,image:platformimage}),new Platform({ x:platformimage.width*2+100,y:460,image:platformimage}),new Platform({ x:platformimage.width*3+300,y:460,image:platformimage}),new Platform({ x:platformimage.width*4+300-2,y:460,image:platformimage}),new Platform({ x:platformimage.width*5+1000-2,y:460,image:platformimage})]

 genericObjects =[
   new GenericObject({
      x:-1,
      y:-1,
      image:Createimage(bg)
   }),
   new GenericObject({
      x:-1,
      y:-1,
      image:Createimage(hills)
   })
]
keys ={
   right :{
      pressed: false
   },
   left :{
      pressed: false
   }

}
 scrollOffset = 0;
}
function animate() {
   requestAnimationFrame(animate);
   c.fillStyle = 'white';
   c.fillRect(0, 0, canvas.width, canvas.height);

   genericObjects.forEach(genericobject =>{
      genericobject.draw();
   })
   // player.update();
   platforms.forEach((platform=>{
      platform.draw()
   }))
   player.update();
   if(keys.right.pressed && player.position.x < 400){
      player.velocity.x = player.speed;
   }
   else if(keys.left.pressed && player.position.x > 100||keys.left.pressed && scrollOffset === 0 && player.position.x>0){
      player.velocity.x = -player.speed;
   }
   else{
      player.velocity.x = 0; 
      if(keys.right.pressed){
         scrollOffset +=player.speed;
         platforms.forEach((platform)=>{          
            platform.position.x -= player.speed;
         })
         genericObjects.forEach((genericobject)=>{
            genericobject.position.x -= player.speed * .66;
         })
      }
      
      else if (keys.left.pressed&&scrollOffset>0){
         scrollOffset -=player.speed;
         platforms.forEach((platform)=>{
            platform.position.x += player.speed;
         })
         genericObjects.forEach((genericobject)=>{
            genericobject.position.x += player.speed * .66;
         })
      }
   }
   //platform collision detection
   platforms.forEach((platform=>{
      if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x+player.width>= platform.position.x&& player.position.x<= platform.position.x+platform.width){
         player.velocity.y = 0;
      }
   }))
   // sprite switching
   if(keys.right.pressed&&currentkey === 'right'&& player.currentSprite!==player.sprite.run.right){
      player.frame =1
      player.currentSprite = player.sprite.run.right
      player.currentcropwidth =player.sprite.run.cropwidth
      player.width =player.sprite.run.width
   }
   else if(keys.left.pressed&&currentkey==='left'&& player.currentSprite!==player.sprite.run.left){
      player.currentSprite = player.sprite.run.left
      player.currentcropwidth =player.sprite.run.cropwidth
      player.width =player.sprite.run.width 
   }
   else if(!keys.left.pressed&&currentkey==='left'&& player.currentSprite!==player.sprite.stand.left){
      player.currentSprite = player.sprite.stand.left
      player.currentcropwidth =player.sprite.stand.cropwidth
      player.width =player.sprite.stand.width 
   }
   else if(!keys.right.pressed&&currentkey==='right'&& player.currentSprite!==player.sprite.stand.right){
      player.currentSprite = player.sprite.stand.right
      player.currentcropwidth =player.sprite.stand.cropwidth
      player.width =player.sprite.stand.width 
   }
   if(scrollOffset>platformimage.width*5+700-2){
      alert('you win');
      init();
   }
   if(player.position.y>canvas.height)
   {
     init();
   }
}
init();
animate();

window.addEventListener('keydown',(event)=>{
   
  
 switch(event.key){
    case 'ArrowLeft':
    keys.left.pressed= true; 
    currentkey='left'
    break;
    case 'ArrowRight':
    keys.right.pressed= true;
    currentkey ='right';
    break;
    case 'ArrowUp':
    player.velocity.y -= 15;
    break;
    case 'ArrowDown':
      
    break;
}
})
window.addEventListener('keyup',(event)=>{
   
 switch(event.key){
    case 'ArrowLeft':
    keys.left.pressed=false;
    break;
    case 'ArrowRight':
  
    keys.right.pressed= false;  
  
    break;
    case 'ArrowUp':
    break;
    case 'ArrowDown':
      
    break;
}
})