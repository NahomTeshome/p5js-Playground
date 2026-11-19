
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
function setup(){
    let canvas = createCanvas(800,400);

    left_bar = new Bar(350,160,40,40,"0")
    center_bar = new Bar(390,160,10,40,"");
    right_bar = new Bar(400,160,40,40,"0")
    canvas.class('canvas_class');



}



function draw(){

    background("white")


    left_bar.show("royalblue");

    center_bar.show("lightgray")

    right_bar.show("crimson")

    

}


function mult(){

    let s = document.getElementById("chosen_amount");

    let value = s.value;
    console.log(value*2)
}