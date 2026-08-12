
class Doger{
    constructor(x,y){
        this.position = createVector(x,y);
        this.velocity = createVector(0,0);
        this.gravity = createVector(0,0.1);
    }

    show(){
        stroke(20);
        fill(255)
        strokeWeight(2);

        rect(this.position.x,this.position.y,50,50);

        noStroke();
        fill("black");
        textFont('monaco');
        textSize(24);
        text(life_points,this.position.x + 20,this.position.y + 35);
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
    intersects_enemy(enemy){
        if (enemy.position.x <= this.position.x + 50 && enemy.position.x + 20 >= this.position.x){
            if(enemy.position.y + 20 >= this.position.y && enemy.position.y <= this.position.y + 50){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }

    }
}
class Enemy{
    constructor(x,y){
        this.position = createVector(x,y);
        this.velocity = createVector(-3,0);
    }

    show(){
        noStroke();
        fill('red');

        rect(this.position.x,this.position.y,20,20);

    }
    update(){
        this.position.add(this.velocity);

        if (this.position.x <= -20){
            this.position.x = Math.floor(Math.random() * (1500 - 1000)+1000);
            this.position.y = Math.floor(Math.random()*(350-20)+20);
        }
    }
}
let doger;
let enemies = [];
let life_points = 3;
function setup(){

    let canvas = createCanvas(800,400);
    canvas.class('canvas_class')
    doger = new Doger(50,100);


    for(let i = 0; i < 5;i++ ){
        new_enemy = new Enemy(1000 + i* 70,100 + i*20);

        enemies.push(new_enemy);
    }

}

function draw(){
    stroke(0)
    background("white");

    doger.show();
    doger.update();

    

    for(e of enemies){
        e.show();
        e.update();
    }

    handle_enemy_Intersection();
    
}

function keyPressed(){
    if(key == " "){
        doger.velocity.y  = -6;
    }
}
function handle_enemy_Intersection(){

    for(enemy of enemies){
        if(doger.intersects_enemy(enemy)){
            life_points -= 1;

            life_points = Math.max(0,life_points);
            life_points = Math.min(3,life_points);
            enemy.position.x = Math.floor(Math.random() * (1500 - 1000)+1000);

            console.log(enemies);
        }
    }

}