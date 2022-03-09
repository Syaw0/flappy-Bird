import backgroundImage from "../../assesst/gallery/background/background.png" ;

let bg = new Image();
bg.src = backgroundImage;

class Background {
    constructor(ctx){
        this.size = 0 ;
        this.ctx = ctx ; 
        this.x= 0 ;
        this. y =0;
        this.src = bg;
        this.speedGame = 1
    };

    draw(){
        this.ctx.drawImage(this.src , 0 , 0 , 1682 ,500 , this.x , 0 , 1682 , 500)
    };

    move(){
        if(this.x  == -561){this.x = 0 ; console.log("s")}
        this.x -= this.speedGame
    }
}
export {Background}
