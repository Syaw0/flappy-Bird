import menuImage from "../../assesst/gallery/other/menu.png"

let menu = new Image();
menu.src = menuImage;

class Menu {
    constructor(ctx , canvasWidth , canvasHeight ){
        this.ctx = ctx
        this.x = 0 ;
        this.y = 0;
        this.canvasWidth = canvasWidth ; 
        this.canvasHeight = canvasHeight
    };
    draw(){

        this.ctx.drawImage(menu , this.canvasWidth/2 - (184 /2) , this.canvasHeight/2 -( 267/2) , 184, 267)
    }
}
export {Menu}


