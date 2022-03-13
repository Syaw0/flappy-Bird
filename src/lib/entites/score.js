class Score {
    constructor(ctx){
        this.ctx = ctx;
        this.score = 0
    };
    draw(number){
        if(number == undefined){
            this.score = 0
        }else{
            this.score = number ;
        }
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px font1"
        this.ctx.fillText(`Score:${this.score}` , 20 , 25)
    };
    addScore(){
        this.score += 1
    }
}
export {Score}
