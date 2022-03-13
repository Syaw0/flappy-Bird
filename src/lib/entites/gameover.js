import gameoverImage from "../../assesst/gallery/other/gameover.png"

import restartImage from "../../assesst/gallery/btn/restart.png"

let gameover = new Image()
gameover.src = gameoverImage

let restart = new Image()
restart.src = restartImage

class Gameover {
    constructor(ctx , canvasHeight , canvasWidth){
        this.ctx = ctx;
        this.status = false
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.restartBtnSizeX = 45 ; 
        this.restartBtnSizeY = 44 ;
        this.restartBtnX = this.canvasWidth / 2 - 70 ;
        this.restartBtnY = this.canvasHeight / 2 + 45 ; 
    }
    draw(arcSize){
        if(arcSize > 60){
            this.ctx.drawImage(gameover , (this.canvasWidth -290)/ 2 , this.canvasHeight / 2 , 192 , 42 );
            this.ctx.drawImage(restart , this.restartBtnX ,this.restartBtnY , this.restartBtnSizeX , this.restartBtnSizeY);
        }
 
    };
    
}
export {Gameover}
