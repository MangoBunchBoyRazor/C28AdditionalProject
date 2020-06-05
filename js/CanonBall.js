class CanonBall {
  constructor(x, y) {
    var options = {
      "density" :  1.5,
      "friction" : 1.0,
      "restitution" : 0.8,
      "frictionAir":0.03,
      "collisionFilter": {
        "category": 0x0004,
        "mask": 0x0004 | 0x0001
      }
    }
    this.isRemoved = false;
    this.body = Bodies.circle(x,y,10,options);
    World.add(world,this.body);
    this.image = loadImage("assets/canonBall.png");
  }

  display(){
    push();
    imageMode(CENTER);
    translate(this.body.position.x,this.body.position.y);
    rotate(this.body.angle);
    image(this.image,0,0,20,20);
    pop();
  }
}