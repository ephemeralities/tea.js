var game = new Game(300,300);
var cat, dog;

function init(){
  cat = new Sprite(50, 50, "Cat");
  cat.loadImage("cat.jpg");
  
  dog = new Sprite(100, 100, "Dog");
  dog.loadImage("dog.jpg");
  window.requestAnimationFrame(main); // won't be necessary once the engine becomes more advanced
}

function main(){
  
  if(Key.w)
    cat.y -= 1;
  else if(Key.s)
    cat.y += 1;
  
  if(Key.ArrowUp)
    game.camera.y -= 1;
  else if(Key.ArrowDown)
    game.camera.y += 1;
    
  game.update();
  window.requestAnimationFrame(main); // ditto
}
