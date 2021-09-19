var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleGroup;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  //tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.shapeColor = "white";

  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleGroup = new Group();
  
}

function draw(){
  background("black");

  camera.position.x = ghost.x;
  camera.position.y = ghost.y;
  
  if (gameState === PLAY) {
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 10;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 10;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();  
    
    if(ghost.isTouching(climbersGroup)) {
       ghost.velocityY = 0;
       }
    
    if (invisibleGroup.isTouching(ghost) || ghost.y > 600) {
      gameState = END;
    }
    
    
    drawSprites();
  }
  
  if (gameState === END) {
    fill("white");
    text("YOU DIED, CONGRATS",220,300);
  }
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    door.x = Math.round(random(120,400));
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);
    
    var climber = createSprite(200,10);
    climber.x = door.x;
    climber.addImage("sshhingg", climberImg);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);
  
    var invisible = createSprite(200,21,80,5);
    invisible.velocityY = 1;
    invisible.lifetime = 800;
    invisible.x = door.x;
    invisible.visible = false;
    invisibleGroup.add(invisible);
    
    ghost.depth = door.depth + 1;
    
  }
}
