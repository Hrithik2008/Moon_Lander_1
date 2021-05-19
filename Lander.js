class Lander{
    constructor(x,y){
        var options = {
            restitution : 0,
            friction : 1.0
        }
        this.body = Bodies.rectangle(x,y,50,50,options);
        this.x = x;
        this.y = y;
        this.fuel = 200;
        this.image = loadImage("lander.svg");
        this.fireImg = loadImage("fire.png");
        World.add(world,this.body);
    }
    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        fill(0);
        image(this.image,0,0,50,50);
        pop();
    }
    fire(){
        if(this.fuel > 0){
        var pos = this.body.position;
        Matter.Body.applyForce(this.body,{x : pos.x, y : pos.y-50},{x:0,y: -0.005});
        imageMode(CENTER);
        image(this.fireImg,pos.x,pos.y+50,40,60);
        this.fuel-=1;
        }
    }
}