 //Making Variables
 var trex, trex_running, edges;
 var groundImage;
 var ground, invisibleGround, cloudImage,obstacleImage;
var obstacleImage2,obstacleImage3,obstacleImage4,obstacleImage5;
var obstacleImage6,obstaclesGroup,cloudsGroup,trexCollided;
var trexCollidedImage,gameOverImage,gameOverText,restartImage,restartButtone;
localStorage['highestScore'];
var sound1,sound2,sound3;

 localStorage['highestScore']=0;
  var score=0;
const PLAY=1;  
const END=0;  
var gameState=PLAY;

function preload(){
  //To add animation to trex
 trex_running =  loadAnimation("trex1.png","trex3.png","trex4.png"); 
  
  //To make a ground image
 groundImage = loadImage("ground2.png");
  
  cloudImage=loadImage("cloud.png");
  
  obstacleImage=loadImage("obstacle1.png");
  
  obstacleImage2=loadImage("obstacle2.png");
  obstacleImage3=loadImage("obstacle3.png");
  obstacleImage4=loadImage("obstacle4.png");
  obstacleImage5=loadImage("obstacle5.png");
  obstacleImage6=loadImage("obstacle6.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
  sound1=loadSound("checkPoint.mp3");
  sound2=loadSound("die.mp3");
  sound3=loadSound("jump.mp3");
  
  
trexCollidedImage=loadAnimation("trex_collided.png");
}

function setup(){
  
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
 trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  
  //Ground creation
  ground=createSprite(300,190,600,20);  
  ground.addImage(groundImage);
  
  //Invisible Ground
  invisibleGround=createSprite(300,200,600,10);
  invisibleGround.visible=false;
  
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
  
  trex.setCollider("circle",0,0,42);
 // trex.setCollider("rectangle",0,0,300,80);
  //trex.debug=true;

  trex.addAnimation("collided",trexCollidedImage);
  
  restartButton=createSprite(300,130,20,10);
  gameOverText=createSprite(300,100,100,100);
  
  restartButton.addImage(restartImage);
  gameOverText.addImage(gameOverImage);
  
  restartButton.scale=0.5;
  gameOverText.scale=1.5;
  
  
}

function movingObstacles(){
  
  
  if(frameCount%70===0){
      var randomNumber=Math.round(random(1,6));
    
     var obstacle1=createSprite(602,175,10,30);
    switch(randomNumber){
      case 1:
          obstacle1.addImage(obstacleImage);
        break;
        
        case 2:
        obstacle1.addImage(obstacleImage2);
        break;
        
        case 3:
          obstacle1.addImage(obstacleImage3);
        break;
        
        case 4:
          obstacle1.addImage(obstacleImage4);
        break;
        
        case 5:
          obstacle1.addImage(obstacleImage5);
        break;
        
        case 6:
          obstacle1.addImage(obstacleImage6);
        break;
        
        default:
        break;
        
    }
    
    
  obstacle1.velocityX=-5-2*score/100;
 // obstacle1.velocityX=obstacle1.velocityX-score/100;
  obstacle1.scale=0.5;
    obstacle1.lifetime=230;
    obstacle1.depth=trex.depth;
    trex.depth=trex.depth+1;
  
  obstaclesGroup.add(obstacle1);
    
  }
  
  
  
}

function movingClouds(){
  if(frameCount%60===0){
      var cloud=createSprite(602,30,20,10);
      cloud.velocityX=-3;
    cloud.addImage(cloudImage);
    cloud.scale=0.5;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloud.lifetime=230;
  
    var rand=Math.round(random(15,140));
    cloud.y=rand;
    console.log(cloud.depth);
    
    cloudsGroup.add(cloud);
  }
  
  
}

function draw(){
  //set background color 
  background("white");
  
  //logging the y position of the trex
  //console.log(trex.y);
  
  text("HI "+localStorage['highestScore'],400,110);
  
  //console.log(ground.x);
  
   console.log(getFrameRate());
  
  //To add gravity
  trex.velocityY = trex.velocityY + 0.5;

  //stop trex from falling down
  trex.collide(invisibleGround);
  
   text("score "+score,480,110);
  
  
  
  
  if(gameState===PLAY){
     
     //jump when space key is pressed
    if(trex.y>=171&&keyDown("space")){
  
    trex.velocityY = -10;
      sound3.play();
      
  }
    
    if(ground.x<0){
    ground.x=ground.width/2;
  }
    
    //To create Infinite Ground
  ground.velocityX=-5;
    
    score=score+Math.round(getFrameRate()/30);
    
    
    movingClouds();
  movingObstacles();
    
    if(trex.isTouching(obstaclesGroup)){
   gameState=END;
    sound2.play();
    //  trex.velocityY = -6;
   //   sound3.play();
      
    }
    
  restartButton.visible=false;
  gameOverText.visible=false;
    
    if(score%100===0&&score>0){
          sound1.play();
          
    }
    
    
      ground.velocityX=-5-2*score/100;

    
    
    
    
  }else if(gameState===END){
      
       
       restartButton.visible=true;
       gameOverText.visible=true;
       
       ground.velocityX=0;
       obstaclesGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);
       
       obstaclesGroup.setLifetimeEach(-1);
       cloudsGroup.setLifetimeEach(-1);
    
      trex.changeAnimation("collided",trexCollidedImage);
    
      if(mousePressedOver(restartButton)){
        reset();
      }
      
       
     }
  
  
  
  
  drawSprites();
}
function reset(){
  gameState=PLAY;
  trex.changeAnimation("running", trex_running);
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  if(localStorage['highestScore']<score){
      localStorage['highestScore']=score;
    }
  score=0;
  
}