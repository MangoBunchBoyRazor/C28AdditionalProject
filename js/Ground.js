class Ground {
  constructor(x, y, width, height) {
    this.body = Bodies.rectangle(x,y,width,height,{isStatic: true});
    this.width = width;
    this.height = height;
    World.add(world,this.body);
  }
  display(){
    let pos = this.body.position;
    push();
    rectMode(CENTER);
    translate(pos.x,pos.y);
    fill(165,42,42);
    rect(0,0,this.width,this.height);
    pop();
  }
}
