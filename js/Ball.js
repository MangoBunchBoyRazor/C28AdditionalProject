class Ball {
  constructor(x,y,radius) {
    var options ={
        frictionAir: 0,
        friction: 0,
        frictionStatic: 1,
        restitution: 1.0,
        "collisionFilter": {
          "category": 0x0004,
          "mask": 0x0004 | 0x0001
        }
    }
    this.body = Bodies.circle(x,y,radius,options);
    World.add(world,this.body);
    this.radius = radius;
  }
  display() {
    push();
    translate(this.body.position.x,this.body.position.y);
    rotate(this.body.angle);
    noFill();
    stroke(this.radius,this.radius,100);
    circle(0,0,this.radius*2);
    pop();
  }
}
