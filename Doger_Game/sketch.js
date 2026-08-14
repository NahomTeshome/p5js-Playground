
class Doger{
    constructor(x,y){
        this.position = createVector(x,y);
        this.velocity = createVector(0,0);
        this.gravity = createVector(0,0.15);
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
            this.position.y = 350;
        }
        if (this.position.y <= 0){
            this.position.y = 0;
        }
    }
    intersects(other){
        if (other.position.x <= this.position.x + 50 && other.position.x + 20 >= this.position.x){
            if(other.position.y + 20 >= this.position.y && other.position.y <= this.position.y + 50){
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

class GoldPiece extends Enemy {
    
    constructor(x,y){
        super(x,y);
        
    }

    show(){
        noStroke();
        fill('gold');

        rect(this.position.x,this.position.y,20,20);

    }

}

class LifePiece extends Enemy {
    
    constructor(x,y){
        super(x,y);
        
    }

    show(){
        noStroke();
        fill('green');

        rect(this.position.x,this.position.y,20,20);

    }

}
let doger;

let enemies = [];
let gold_pieces = [];
let life_pieces = [];

let life_points = 5;
let player_score = 0;

let game_state = "playing";
function setup(){

    let canvas = createCanvas(800,400);
    canvas.class('canvas_class')
    doger = new Doger(50,100);


    for(let i = 0; i < 5;i++ ){
        let new_enemy = new Enemy(1000 + i* 70,100 + i*20);

        enemies.push(new_enemy);
    }
    for(let i = 0; i < 3;i++ ){
        let new_gold_piece = new GoldPiece(Math.floor(Math.random() * (1500 - 1000)+1000),Math.floor(Math.random()*(350-20)+20));

        gold_pieces.push(new_gold_piece);
    }

    for(let i = 0; i < 3;i++ ){
        let new_life_piece = new LifePiece(Math.floor(Math.random() * (1500 - 1000)+1000),Math.floor(Math.random()*(350-20)+20));

        life_pieces.push(new_life_piece);
    }

}

function draw(){
    stroke(0)
    background("white");

    doger.show();
    doger.update();

    if(game_state == "playing"){

        for(let e of enemies){
            e.show();
            e.update();
        }

        for(let g of gold_pieces){
            g.show();
            g.update();
        }

        for(let l of life_pieces){
            l.show();
            l.update();
        }

        handle_enemy_Intersection();
        handle_gold_Intersection();
        handle_life_Intersection();
        displayScore();

        if(life_points == 0){
            game_state = "game_over";
            
        }
}
    if(game_state == 'game_over'){
        displayGameOver();
    }
    
}

function keyPressed(){
    if(key == " "){
        doger.velocity.y  = -6;
    }
}

function handle_enemy_Intersection(){

    for(let enemy of enemies){
        if(doger.intersects(enemy)){
            life_points -= 1;

            life_points = Math.max(0,life_points);
            life_points = Math.min(5,life_points);
            enemy.position.x = Math.floor(Math.random() * (1500 - 1000)+1000);
            enemy.position.y = Math.floor(Math.random()*(350-20)+20);

        }
    }

}

function handle_gold_Intersection(){
    for(let gold of gold_pieces){
        if(doger.intersects(gold)){
            player_score += 1;
            gold.position.x = Math.floor(Math.random()*(1500 - 1000)+1000);
            gold.position.y = Math.floor(Math.random()*(350-20)+20);
        }
    }
}
function handle_life_Intersection(){
    for(let life of life_pieces){
        if(doger.intersects(life)){
            life_points += 1;
            life_points = Math.max(0,life_points);
            life_points = Math.min(5,life_points);
            life.position.x = Math.floor(Math.random()*(1500 - 1000)+1000);
            life.position.y = Math.floor(Math.random()*(350-20)+20);
        }
    }
}

function displayScore(){

    fill("black");
    text("Score: "+player_score,600,50);

}


function displayGameOver(){

    fill("black");
    text("Game over: your score was "+player_score,200,100);
    text("Click anywhere to restart the game",170,150);


}
function mouseClicked(){
    if(game_state == "game_over"){
        location.reload();
    }
}
