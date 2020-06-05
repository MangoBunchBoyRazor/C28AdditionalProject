class Square{
    constructor(x,y,s){
        let options = {
            frictionAir: 0,
            friction: 1,
            frictionStatic: 5,
            restitution: 0,
            "collisionFilter": {
                "category": 0x0004,
                "mask": 0x0004 | 0x0001
            }
        }
        this.body = Bodies.rectangle(x,y,s,s,options);
        World.add(world,this.body);
        this.size = s;
    }
    display(){
        push();
        rectMode(CENTER);
        translate(this.body.position.x,this.body.position.y);
        rotate(this.body.angle);
        noFill();
        rect(0,0,this.size,this.size);
        pop();
    }
}