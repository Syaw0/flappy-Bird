import {Bird } from "./lib/entites/bird.js"
import "./styles/main.css"
let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d")
let bird
let animationFrame
canvas.width = 420
canvas.height = 540



window.addEventListener("resize" , ()=>{
    cancelAnimationFrame(animationFrame)
    canvas.width = 420
    canvas.height = 540;
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
    bird = new Bird(ctx);
    animate();
}


const animateHanlde = () => {
    birdHanlde();
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


const adjustCanvasSize = () => {
    if( window.innerWidth < 420 || canvas.height < 540){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight
    }}
