class Tanker {
  constructor(x, y, size) {
      var options = {
      isStatic: true,
      collisionFilter: {
        category: 0x0002,
        mask: 0x0002
      }
     }
     this.body = Bodies.rectangle(x,y+size/4,size,size/2,options);
     this.dome = Bodies.circle(x,y-5,size/3,options);
     this.cannonHull = Bodies.rectangle(x+33,y,size/2,size/5,options);
     this.shooter = Composite.create();
     Composite.add(this.shooter, [this.dome,this.cannonHull]);
     World.add(world,[this.body,this.dome,this.cannonHull]);
     this.size = size;
     this.x = x;
     this.y = y;
    };

    display(){
      push();
      rectMode(CENTER);
      translate(this.x,this.y);
      fill(10,255,10,50);
      stroke(0,255,0);
      circle(0,0,this.size/1.5);
      fill(255,100,0,);
      noStroke();
      rect(0,this.size/4,this.size,this.size/2);
      pop();
      push();
      rectMode(CENTER);
      translate(this.cannonHull.position.x,this.cannonHull.position.y);
      fill(0,0,100);
      rotate(this.cannonHull.angle);
      rect(0,0,this.size/2,this.size/5);
      pop();
    };
}
