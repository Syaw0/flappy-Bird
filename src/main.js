import {Bird } from "./lib/entites/bird.js"
import {Barrier} from "./lib/entites/barrier.js"
import {Background} from "./lib/entites/background.js"
import "./styles/main.css"
let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d")
let bird
let background
let barrierArr = [] 
let animationFrame
canvas.width = 420
canvas.height = 500



window.addEventListener("resize" , ()=>{
    cancelAnimationFrame(animationFrame)
    canvas.width = 420
    canvas.height = 500;
    init()
})


window.addEventListener("DOMContentLoaded" , (e)=>{
    adjustCanvasSize()
    init()
})

//window.addEventListener("load" , ()=>{
    //})

window.addEventListener("keydown" , (e)=>{
    e.code == "Space" ? bird.fallStatus = false : undefined
})

window.addEventListener("touchstart" , (e)=>{
    bird.fallStatus = false
})

const init = () => {
    background = new Background(ctx)
    bird = new Bird(ctx);
    //createBarrier()
    animate();
}


const animateHanlde = () => {
    backgroundHanlde();
    birdHanlde();
    barrierHanlde();
}

const animate = () => {
    if(bird.live){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    animateHanlde();
    animationFrame = requestAnimationFrame(animate)

    }
}


const birdHanlde = () => {
    if(bird.y >= canvas.height || bird.y < -20){
        cancelAnimationFrame(animationFrame);
        bird.live = false
        ctx.fillStyle = "white"
        ctx.font = "30px"
        ctx.fillText("you lose" , canvas.width/2 , canvas.height/2)
    }
    bird.fallStatus ? bird.fall() : bird.jump()
    bird.draw()
}

const createBarrier = () => {
    if(barrierArr.length < 3){
        for(let i = barrierArr.length ; i <3 ; i++){
            if(barrierArr[0] == undefined ){ //if array is empty do this
                barrierArr.push(new Barrier(ctx ,canvas.height , canvas.width , canvas.width ))
            }else{ //else do this to create barriel with a space between them
                let distance = barrierArr[barrierArr.length - 1].x + 200 // this is distance of 2 barrier 
                barrierArr.push(new Barrier(ctx ,canvas.height ,canvas.width , distance ))
            }
        }
    }
}


const barrierHanlde = () => {
    createBarrier()
    for(let barrier = 0 ; barrier < barrierArr.length ; barrier++ ){
        if(barrierArr[barrier].x <-60){barrierArr.splice(barrier , 1 ) }
        barrierArr[barrier].move();
        barrierArr[barrier].draw();
    }
    }

const backgroundHanlde = () => {
    background.move();
    background.draw();
}



const adjustCanvasSize = () => {
    if( window.innerWidth < 420 || canvas.height < 500){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight
    }}

