class ShootBall{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.08,
            length: 10,
        }
        this.toConnect = true;
        this.sling = Constraint.create(options);
        World.add(world,this.sling);
    }

    attach(body){
        this.sling.bodyA = body;
        this.toConnect = true;
    }

    shoot(){
        Body.setStatic(this.sling.bodyA,false);
        this.sling.bodyA = null;
        this.toConnect = false;
    }

    update(pointB, bodyA, tank){
        this.sling.pointB = pointB;
        if(this.toConnect){
            this.sling.bodyA = bodyA;
            if(tank.dome.angle == 0) 
                Body.setPosition(this.sling.bodyA,{x: 50, y: 540});       
            else if(tank.dome.angle < -1)
                Body.setPosition(this.sling.bodyA,{x: 100, y: 590});       
            else
                Body.setPosition(this.sling.bodyA,{x: 50, y: 590});    
        }
    }
}
