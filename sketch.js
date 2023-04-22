var trex, trex_running;
var score = 0
var cloudGroup
var obstacleGroup
var PLAY = 1
var END = 0
var gameState = PLAY

function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadAnimation("trex_collided.png")
    ground_image = loadImage("ground2.png")
    cloud_image = loadImage("cloud.png")
    cacto1 = loadImage("obstacle1.png")
    cacto2 = loadImage("obstacle2.png")
    cacto3 = loadImage("obstacle3.png")
    cacto4 = loadImage("obstacle4.png")
    cacto5 = loadImage("obstacle5.png")
    cacto6 = loadImage("obstacle6.png")
    game = loadImage("gameOver.png")
    restartImg = loadImage("restart.png")
    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("die.mp3")
}

function setup() {
    createCanvas(600, 200);
    trex = createSprite(40, 155, 20, 50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided)
    trex.scale = 0.5
    ground = createSprite(300, 180)
    ground.addImage(ground_image)
    ground.velocityX = -5
    ground2 = createSprite(0,185,100,10)
    ground2.visible = false
    score = 0
    cloudGroup = new Group ()
    obstacleGroup = new Group()
    gameOver = createSprite(300,100)
    gameOver.addImage(game)
    gameOver.scale = 0.6
    gameOver.visible = false
    restart = createSprite(300,130)
    restart.addImage(restartImg)
    restart.scale = 0.4
    restart.visible = false
    trex.setCollider("rectangle",0,0,120,trex.hight)
    trex.debug = false
    
}

function draw() {
    background("white");
    drawSprites();
    textSize(18)
    text("pontuação: " + score,450,50)
    
    trex.collide(ground2)
    
    
    if(gameState === PLAY){
        gameOver.visible = false
        restart.visible = false
        if(frameCount %80 ===0){
            cacto = createSprite(600,165)
            cacto.velocityX = -7
            var r = Math.round(random(1,6))
            switch(r){
                case 1: cacto.addImage(cacto1)
                break;
                case 2: cacto.addImage(cacto2)
                break;
                case 3: cacto.addImage(cacto3)
                break;
                case 4: cacto.addImage(cacto4)
                break;
                case 5: cacto.addImage(cacto5)
                break;
                case 6: cacto.addImage(cacto6)
                break;
            }
            cacto.scale = 0.4
            cacto.lifetime = 600/7
            obstacleGroup.add(cacto)
        }
        if (frameCount %60 ===0){
            nuvem = createSprite(600,30)
            nuvem.velocityX = -5
            nuvem.addImage(cloud_image)
            nuvem.scale = 0.6
            nuvem.lifetime = 130
            nuvem.y = Math.round(random(10,100))
            cloudGroup.add(nuvem)
            nuvem.depth = trex.depth
            trex.depth = trex.depth +1
            
          }
          score = score + Math.round(frameCount/180)

    if(ground.x <= 0){
        ground.x = ground.width/2
        
    }
    if(keyDown("space") && trex.y >=150){
        trex.velocityY = -12
        jumpSound.play()
    }
    trex.velocityY = trex.velocityY + 0.6
    }
    if(obstacleGroup.isTouching(trex)){
        gameState = END
        
    }
    else if(gameState === END){
        obstacleGroup.setVelocityXEach(0)
        cloudGroup.setVelocityXEach(0)
        ground.velocityX = 0
        cloudGroup.setLifetimeEach(-10)
        obstacleGroup.setLifetimeEach(-10)
        trex.changeAnimation("collided",trex_collided)
        trex.velocityY = 0
        gameOver.visible = true
        restart.visible = true
        if(mousePressedOver(restart)){
            reset()
        }

    }

console.log(trex.y)
}
function reset(){
    gameState = PLAY
    score = 0
    gameOver.visible = false
    restart.visible = false
    obstacleGroup.destroyEach()
    cloudGroup.destroyEach()
    trex.changeAnimation("running",trex_running)
    trex.velocityY = 0
    ground.velocityX = -5
    if(ground.x <= 0){
        ground.x = ground.width/2
        
    }
}