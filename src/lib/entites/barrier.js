import greenPipeImg from "../../assesst/gallery/barrier/pipe-green.png" ; 
import greenPipeRevImg from "../../assesst/gallery/barrier/pipe-green-rev.png" ;

let greenPipe = new Image();
greenPipe.src = greenPipeImg;

let greenPipeRev = new Image();
greenPipeRev.src = greenPipeRevImg

class Barrier {
    constructor(ctx , canvasHeight , canvasWidth , distance , uniqID){
        this.barrierHeight = 380;
        this.barrierWidth = 52;
        this.corridorHeight = 120;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth
        this.status = this.chance()
        this.gameSpeed = 1
        this.ctx = ctx
        this.x = distance ;
        //this.y = this.status.y ;
        this.id = uniqID
        this.images = {
            toUp:greenPipe,
            toDown:greenPipeRev
        };

    };

    draw(){
        if(this.status.mode == "upBarrier"){
            this.ctx.drawImage(this.images.toDown , this.x  , this.status.y , this.barrierWidth,this.barrierHeight) 
        }else if (this.status.mode == "downBarrier"){
            this.ctx.drawImage(this.images.toUp , this.x  , this.status.y , this.barrierWidth,this.barrierHeight) 
        }else{
            this.ctx.drawImage(this.images.toDown , this.x  , this.status.y , this.barrierWidth,this.barrierHeight)
            this.ctx.drawImage(this.images.toUp, this.x  , this.status.y2 , this.barrierWidth,this.barrierHeight)
        }
    };//we can create random barrier size too...
    move(){
        this.x -= this.gameSpeed
    };
    chance(){
        if(Math.floor(Math.random()*2) == 1){
            let avaibleHeight = this.canvasHeight - this.corridorHeight
            let barrierUpHeight = Math.floor(Math.random()* avaibleHeight ) 
            let barrierDownHeight = this.canvasHeight - (avaibleHeight - barrierUpHeight )
            return { 
                y: - (this.barrierHeight - barrierUpHeight),
                y2: barrierDownHeight,
                mode:"2barrier"
            }

        }else{

            if(Math.floor(Math.random()*2) == 1){

                return {y: (this.canvasHeight - this.barrierHeight) , mode:"downBarrier" }
     
            }else{

                return {y: this.barrierHeight - (this.canvasHeight - this.corridorHeight) , mode:"upBarrier" }

            }
        }

    }




    }

export {Barrier}
// i think i can use one image for barrier
