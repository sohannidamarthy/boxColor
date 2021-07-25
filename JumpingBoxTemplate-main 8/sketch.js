var START = 0;
var PLAY= 1;
var END= 2;
var gameState= START;
var SpeedX=0;
var SpeedY=0;
var canvas;
var music;
var ball;
var box1, box2, box3,box4;
var spotGroup;
var score=0;


function preload(){
    music = loadSound("music.mp3");
}


function setup(){
    canvas = createCanvas(800,600);

    //create 4 different surfaces
    box1= createSprite(100,580,200,20);
    box1.shapeColor="orange"
    box2= createSprite(300,580,200,20);
    box2.shapeColor="red"
    box3= createSprite(500,580,200,20);
    box3.shapeColor="blue"
    box4= createSprite(700,580,200,20);
    box4.shapeColor="green"



    //create box sprite and give velocity
    ball=createSprite(400,300,20,20);
    ball.shapeColor="white"
   
    spotGroup= createGroup();

}

function draw() {
    background(rgb(169,169,169));
    //create edgeSprite
    edges=createEdgeSprites();
    ball.bounceOff(edges[0]);
    ball.bounceOff(edges[1]);
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3])
    
    
    if(gameState===START){
        textSize(15)
        fill("pink")
        text("X speed:  " + SpeedX, 50, 25)
        text("Y speed:" + SpeedY, 150,25)
        textSize(30)
        text("Press SPACE to Start", 250,270)
        if(keyDown(UP_ARROW)){
            SpeedY=SpeedY+1
        }
        if(keyDown(DOWN_ARROW)){
            SpeedY=SpeedY-1
        }
        if(keyDown(RIGHT_ARROW)){
            SpeedX=SpeedX+1;
        }
        if(keyDown(LEFT_ARROW)){
            SpeedX=SpeedX-1
        }

        if(keyDown("space")){
            ball.velocityX=SpeedX
            ball.velocityY=SpeedY
            gameState=PLAY
        }
 
        
    }
    
    if(gameState===PLAY){
        if(frameCount%60===0){
            score=score+1
            
        }
        textSize(15)
        fill("pink")
        text("Score:  "+ score, 700,25)
        text("X speed:  " + SpeedX, 50, 25)
        text("Y speed:" + SpeedY, 150,25)
        createSpots();
        bing(ball, box1)
        bing(ball,box2)
        bing(ball, box3)
        bing(ball,box4)
        if(spotGroup.isTouching(ball)){
            spotGroup.setLifetimeEach(0)
            gameState=END
        }

    }
    if(gameState===END){
        
        ball.velocityX=0
        ball.velocityY=0
        fill("pink")
        textSize(30)
        text("Your Score: "+ score,270,270)

    }
drawSprites()
}

function bing( object1, object2){
    if(object2.isTouching(object1) && object1.bounceOff(object2)){
        object1.shapeColor= object2.shapeColor
        music.play()
    }
}
function createSpots(){
    if(frameCount%60===0){
    var spots=createSprite(0,0, 20,20)
    spots.x=random(150,650);
    spots.y=random(150,500);
    spotGroup.add(spots)
    }

    

    
}