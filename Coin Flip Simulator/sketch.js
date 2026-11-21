
class Bar{

    constructor(x,y,w,h,value){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.value = value

    }

    show(color){
        stroke(0)

        fill(color)

        rect(this.x,this.y,this.w,this.h);


        fill("white");
        textFont('cambria');

        textSize(16);

        text(this.value,this.x + 16,this.y+25)

    }
}

let left_bar;
let center_bar;
let right_bar;

let heads_amount = 0;
let tails_amount = 0;
function setup(){
    let canvas = createCanvas(800,400);

    left_bar = new Bar(350,160,40,40,heads_amount)
    center_bar = new Bar(390,160,10,40,"");
    right_bar = new Bar(400,160,40,40,tails_amount)
    canvas.class('canvas_class');



}



function draw(){

    background("white")


    left_bar.show("crimson");

    center_bar.show("lightgray")

    right_bar.show("royalblue")

    fill("black")
    textSize(18)
    text("Heads",200,140)

    text("Tails",540,140)
    

}


function moveLeft(){

    left_bar.w += 5

    left_bar.x -= 5
}


function moveRight(){
    right_bar.w += 5

    let randomNum = Math.floor(Math.random()*2)

    console.log(frameCount)
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function flip(){

    clearBars()

    let s = document.getElementById("chosen_amount");

    let value = s.value;
   

    for (let i = 0; i < value;i++){
        let randomNum = Math.floor(Math.random()*2)

        if (randomNum == 1) {
            heads_amount += 1;

            left_bar.value = heads_amount

            moveLeft()
            
        }
        else{
            tails_amount += 1;

            right_bar.value = tails_amount;
            moveRight()
        }
        await sleep(300);
    }
}

function clearBars(){
    heads_amount = 0
    tails_amount = 0

    left_bar.value = 0
    right_bar.value = 0

    left_bar.w = 40
    left_bar.x = 350

    right_bar.w = 40
}


