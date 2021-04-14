var car,boy,path,coin,coinG;
var carImg,pathImg,coinImg, coneGroup, coneImage;
var score;
var PLAY=1, END=0;
var gameState = PLAY;

function preload()
{
  carImg = loadImage("car.png");

  pathImg = loadImage("road.png");

  coinImg = loadImage("coin.png");

  coneImage = loadImage("cone.png")

}

function setup() {
  createCanvas(1500,900);

 path = createSprite(650,340);
 path.addImage(pathImg);
 path.velocityY = 10;
 path.scale = 6;

 car = createSprite(400,700,20,20);
 car.addImage(carImg);
 car.scale = 0.1;
 
 coinG = new Group()

 coneGroup = new Group();
}

function draw() {
  background(255,255,255); 

  if(gameState === PLAY)
  {
  textSize(50);
  fill("blue");
  text("Score: "+ score, 1000,350);

  car.x = World.mouseX;
  
  edges= createEdgeSprites();
  car.collide(edges);

  if(path.y>600){
    path.y = height/2;
  }

  createCoin(); 

  if(coinG.isTouching(car)){
    coinG.destroyEach();
    score= score + 1;
  }

  spawnCone();

  if(coneGroup.isTouching(car))
  {
    gameState = END;
  }
}
else if(gameState === END)
{
  car.visible = false;
  coneGroup.destroyEach();
  path.velocity = 0;
}

  drawSprites();
}

function createCoin(){
  if(World.frameCount % 80 == 0)
  {
    var coin = createSprite(Math.round(random(100,500),100,50,50))
    coin.addImage(coinImg);
    coinG.add(coin);
    coin.scale = 0.07;
    coin.velocityY=10;

  }
}

function spawnCone()
{
    if(frameCount % 50 === 0)
    {
        var cone = createSprite(750,350,50,50);
        cone.x = random(0,1500);
        cone.addImage(coneImage);
        cone.scale = 0.3;
        cone.velocityY = 10;
        cone.lifetime = 300;
        coneGroup.add(cone);
    }
}