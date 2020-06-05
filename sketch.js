//Variables for the game
var ground, tank, cannonball, cannonSling, circles = [], sqrs = [];
var gameScore = 0, gameMode = "circle";

//Module aliases
const { Engine, World, Bodies, Body, Mouse, MouseConstraint, Constraint, Render, Composite, Events} = Matter;

function setup() {
    //Create the canvas
    createCanvas(800,600);
    //Create canvas for pause screen
    canvas2_1 = createGraphics(800,300);
    canvas2_2 = createGraphics(800,300);

    //Create the engine and the world
    engine = Engine.create();
    world = engine.world;

    //Creating the game objects
    ground = new Ground(width/2,height,width,20); //Ground
    tank = new Tanker(100,height-60,100);   //Tanker
    cannonball = new CanonBall(tank.x,tank.y);  //Canonball
    cannonSling = new ShootBall(cannonball.body, {x: tank.cannonHull.position.x+10, y: tank.cannonHull.position.y});    //The shooter

    //Renderer
    Render.run(Render.create({
        element: document.body,
        engine: engine
    }));
}
function draw() {
    textAlign(CENTER);
    textSize(20);

    Engine.update(engine); //Updating the engine

    //colliding cannonball with other bodies only when it is not connected
    if(cannonSling.toConnect === true)
            cannonball.body.collisionFilter = {
                category: 0x0008,
                group: 0,
                mask: 0x0008 | 0x0001
            };
    else
        cannonball.body.collisionFilter = {
            category: 0x0004,
            group: 0,
            mask: 0x0004 | 0x0001
        };
    //Tasks for the circle gamemode
    if(gameMode === "circle"){
        background(240); //background color

        //creating random balls at regular intervals
        if(frameCount % 120 === 0){
            let ball = new Ball(width+50,random(0,height),random(25,100));
            circles.push(ball);
            Body.setVelocity(ball.body,{x: -5, y: 1});
        }
        //Displaying all the balls
        for(i = 0; i < circles.length; i++){
            circles[i].display();
            //Testing if the canonball hit the ball
            let pos1 = cannonball.body.position;
            let pos2 = circles[i].body.position;
            let distance =  dist(pos1.x,pos1.y,pos2.x,pos2.y);
            //Destroying the ball and the canonball once they are colliding
            if(distance <= 10+circles[i].radius && (!cannonSling.toConnect)){
                World.remove(world,[cannonball.body,circles[i].body]);
                circles.splice(i,1);
                i--;
                cannonball.isRemoved = true;
                gameScore++;
            }
            //Removing the ball if it is out of the screen
            else if(circles[i].body.position.x < -100){
                World.remove(world, circles[i].body);
                circles.splice(i,1);
                i--;
                gameScore--;
            }
        }
        //Text for the player
        fill(255,100,100,200);
        text("Press 's' to shoot",width/2,50);
        fill(100,255,100,200);
        text("Press 'r' to reload after shooting",width/2,75);
        fill(100,100,255,200);
        text("Hit the circles to gain points. Don't let the circles reach the end",width/2,100);
        fill(0,0,0);
        text("Score:"+gameScore,width-100,50);
    }
    //Tasks for the square gamemode
    else if(gameMode === "square"){
        background(173,216,230); //color of the background

        //Displaying all square objects
        for(i = 0; i<sqrs.length; i++){
            sqrs[i].display();
            //Testing if the canonball and the square is colliding
            let distance = dist(cannonball.body.position.x,cannonball.body.position.y,sqrs[i].body.position.x,sqrs[i].body.position.y);
            //Removing the canonball and the square
            if(distance <= 50){
                Body.setPosition(cannonball.body,{x:0,y:0});
                World.remove(world,[cannonball.body,sqrs[i].body]);
                sqrs.splice(i,1);
                cannonball.isRemoved = true;
                i--;
                gameScore++;
            }
        }
        //Text for the player
        fill(0,0,0);
        textSize(12);
        text("Reset",30,100);
        text("Score:"+gameScore,width-100,50);
        textSize(20);
        fill(255,100,100,200);
        text("Press 's' to shoot",width/2,50);
        fill(100,255,100,200);
        text("Press 'r' to reload after shooting",width/2,75);
        fill(100,100,255,200);
        text("Hit the squares with the cannon ball. Click on reset to bring the castle back",width/2,100);      
    }
    //Displaying all game objects
    if(!(cannonSling.toConnect) && !(cannonball.isRemoved)) //Display the canonball only when it is free
        cannonball.display();
    ground.display();
    tank.display();
    cannonSling.update({x: tank.cannonHull.position.x, y: tank.cannonHull.position.y}, cannonball.body, tank);
    //Tasks for the switch game mode
    if(gameMode === "switch"){
        switchMode();
    }
    //Text
    push();
    fill(0,0,0);
    textAlign(CENTER);
    textSize(12);
    text("Switch Modes",50,25);
    pop();
}
//Function to help in switching the mode
function switchMode(){
    canvas2_1.background(100,100,100,100);
    canvas2_2.background(100,100,100,100);
    canvas2_1.textAlign(CENTER);
    canvas2_1.textSize(30);
    canvas2_1.text("Bouncing circles",width/2, 200);
    canvas2_2.textAlign(CENTER);
    canvas2_2.textSize(30);
    canvas2_2.text("Castle of squares",width/2, 100);
    image(canvas2_1,0,0);
    image(canvas2_2,0,300);

    if(mouseY < 300)
        canvas2_1.background(50,50,50,200);
    else 
        canvas2_2.background(50,50,50,200);
}
//Function to handle keyboard inputs
function keyPressed() {
    if(keyCode === UP_ARROW && tank.dome.angle>-PI/2)
        Composite.rotate(tank.shooter,-PI/4,{x: tank.dome.position.x, y: tank.dome.position.y},true);
    else if(keyCode === DOWN_ARROW && tank.dome.angle<0)
        Composite.rotate(tank.shooter,PI/4,{x: tank.dome.position.x, y: tank.dome.position.y},true);
    if(key === "s" && cannonSling.toConnect === true){
        cannonSling.shoot();
        cannonball.body.collisionfilter = {
            category: 0x0004,
            mask: 0x0004,
            group: 0 
        };
    }
    else if(key === "r"){
        cannonSling.attach(cannonball.body);
        if(cannonball.isRemoved){
            World.add(world,cannonball.body);
            cannonball.isRemoved = false;
        }
    }
}
//Function to handle mouse inputs
function mouseClicked(){
    if(mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 80)
        gameMode = "switch";

    else if(mouseY < 300 && gameMode === "switch"){
        gameScore = 0;
        gameMode = "circle";
    }
    else if(mouseY >= 300 && gameMode === "switch"){
        gameMode = "square";
        createTower(2,5);
        gameScore = 0;
        if(sqrs[0]){
            for(i=0;i<sqrs.length;i++){
                World.remove(world,sqrs[i].body);
                sqrs.splice(i,1);
            }
        }
    }

    else if(mouseX>0&&mouseX<80&&mouseY>80&&mouseY<120){
        for(i = sqrs.length-1; i>=0; i--){
            World.remove(world,sqrs[i].body);
            sqrs.splice(i,1);
        }
        createTower(random(2,5),random(5,8));
    }
}
//Function to create a tower
function createTower(c,r){
    for(i = 0; i < c; i++){
        for(j = r; j > 0; j--)
            sqrs.push(new Square(width-i*50-100,height-j*50,50));
    }
}