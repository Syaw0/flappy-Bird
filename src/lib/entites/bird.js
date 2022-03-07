import jumpingBirdImg from "../../assesst/gallery/bird/jumpingBird.png"
import fallingBirdImg from "../../assesst/gallery/bird/fallingBird.png"

let fallingBird = new Image()
fallingBird.src = fallingBirdImg

let jumpingBird = new Image()
jumpingBird.src= jumpingBirdImg

class Bird {
    
    constructor(ctx){
        this.ctx=ctx
        this.sizeX=34;
        this.sizeY=24;
        this.x = 70;
        this.y=200;
        this.fallStatus = true
        this.isFirstToSaveLength = true;
        this.jumpHeightLength = 0 //i think i can do better for this line of code
        this.gravity = 1.1
        this.images = {
            fall:fallingBird, 
            jump:jumpingBird
        };
        this.live = true
        this.rotation = 0;

    };

    draw(){
        if(this.fallStatus){
            if(this.rotation <0.12){this.rotation += 0.01}
            this.ctx.save()
            this.ctx.translate(this.x,this.y)
            this.ctx.rotate(Math.PI * this.rotation)
            this.ctx.drawImage(this.images.fall , -17,-12,this.sizeX,this.sizeY)
            this.ctx.restore()

        }else{
            if(this.rotation >-0.19){this.rotation -= 0.07}
            this.ctx.save()
            this.ctx.translate(this.x,this.y)
            this.ctx.rotate(Math.PI * this.rotation)
            this.ctx.drawImage(this.images.jump ,-17,-12,this.sizeX,this.sizeY)
            this.ctx.restore()
            
        }
    };

    fall(){
        this.y += this.gravity * 0.9
        this.gravity += 0.05
    };
    jump(){
        if(this.isFirstToSaveLength){ //save the zero cordinate to jump
            this.gravity = 1; //i think i can do better for this condition
            this.jumpHeightLength = this.y;
            this.isFirstToSaveLength = false;
        }
        if(this.y > this.jumpHeightLength - 65){ 
            this.y -= 3.5;
        }else{
            this.isFirstToSaveLength = true;
            this.fallStatus = true
        }
    };
}


export {Bird } 
