
class Doger{
    constructor(x,y){
        this.position = createVector(x,y);
        this.velocity = createVector(0,0);
        this.gravity = createVector(0,0.1);
    }

    show(){
        stroke(20);
        strokeWeight(2);

        rect(this.position.x,this.position.y,50,50);
    }

    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.gravity);

        if (this.position.y >= 350){
            this.position.y = 350
        }
        if (this.position.y <= 0){
            this.position.y = 0
        }
    }
}

let doger;
function setup(){

    let canvas = createCanvas(800,400);
    canvas.class('canvas_class')
    doger = new Doger(50,100);


}

function draw(){
    stroke(0)
    background("white");

    doger.show();
    doger.update();
}

function keyPressed(){
    if(key == " "){
        doger.velocity.y  = -6;
    }
}