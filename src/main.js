import "./styles/main.css";
import { Bird } from "./lib/entites/bird.js";
import { Barrier } from "./lib/entites/barrier.js";
import { Background } from "./lib/entites/background.js";
import { Gameover } from "./lib/entites/gameover.js";
import { Menu } from "./lib/entites/menu.js";
import { Score } from "./lib/entites/score.js";
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let bird,
  background,
  gameover,
  animationFrame,
  isFirstTime,
  menu,
  score,
  uniqIdForBarrier,
  barrierArr,
  passedBarrierObj;
barrierArr = [];
passedBarrierObj = {};
canvas.width = 420;
canvas.height = 500;
uniqIdForBarrier = 0;
isFirstTime = true;

window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  //canvas.width = 420
  //canvas.height = 500;
  adjustCanvasSize();
  isFirstTime = true;
  init();
});

window.addEventListener("DOMContentLoaded", (e) => {
  adjustCanvasSize();
  init();
});

window.addEventListener("keydown", (e) => {
  if (bird.live) {
    e.code == "Space" ? (bird.fallStatus = false) : undefined;
  }
});

window.addEventListener("touchstart", (e) => {
  if (bird.live) {
    bird.fallStatus = false;
  }
});

canvas.addEventListener("touchstart", (e) => {
  if (gameover.status) {
    buttonHandle(e);
  } else {
    if (isFirstTime) {
      bird.live = true;
      isFirstTime = false;
    }
  }
});

canvas.addEventListener(
  "click",
  (e) => {
    if (gameover.status) {
      buttonHandle(e);
    } else {
      if (isFirstTime) {
        bird.live = true;
        isFirstTime = false;
      }
    }
  },
  true
);

window.addEventListener(
  "keydown",
  (e) => {
    if (e.code == "Space") {
      if (gameover.status) {
        buttonHandle(e);
      } else {
        if (isFirstTime) {
          bird.live = true;
          isFirstTime = false;
        }
      }
    }
  },
  true
);

const buttonHandle = (e) => {
  if (
    e.offsetX > gameover.restartBtnX &&
    e.offsetX < gameover.restartBtnX + gameover.restartBtnSizeX
  ) {
    if (
      e.offsetY > gameover.restartBtnY &&
      e.offsetY < gameover.restartBtnSizeY + gameover.restartBtnY
    ) {
      cancelAnimationFrame(animationFrame);
      init();
      bird.live = true;
      uniqIdForBarrier = 0;
      passedBarrierObj = {};
    }
  }
};

const init = () => {
  uniqIdForBarrier = 0;
  passedBarrierObj = {};
  score = new Score(ctx);
  menu = new Menu(ctx, canvas.width, canvas.height);
  background = new Background(ctx);
  bird = new Bird(ctx);
  gameover = new Gameover(ctx, canvas.width, canvas.height);
  barrierArr = [];
  //createBarrier()
  animate();
};

const animateHanlde = () => {
  backgroundHanlde();
  barrierHanlde();
  birdHanlde();
  !isFirstTime && !gameover.status
    ? score.draw(Object.keys(passedBarrierObj).length)
    : undefined;
  isFirstTime ? menu.draw() : undefined;
  gameover.status ? gameIsOver() : undefined; //apear on the barriers not behind them
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animateHanlde();
  animationFrame = requestAnimationFrame(animate);
};

const birdHanlde = () => {
  if (bird.y >= canvas.height || bird.y < -20) {
    cancelAnimationFrame(animationFrame);
    gameover.status = true;
  }

  if (bird.live) {
    bird.fallStatus ? bird.fall() : bird.jump();
  }
  bird.draw();
};

const createBarrier = () => {
  if (barrierArr.length < 3) {
    for (let i = barrierArr.length; i < 3; i++) {
      if (barrierArr[0] == undefined) {
        //if array is empty do this
        barrierArr.push(
          new Barrier(ctx, canvas.height, canvas.width, canvas.width, 0)
        );
      } else {
        //else do this to create barriel with a space between them
        let distance = barrierArr[barrierArr.length - 1].x + 200; // this is distance of 2 barrier
        uniqIdForBarrier++;
        barrierArr.push(
          new Barrier(
            ctx,
            canvas.height,
            canvas.width,
            distance,
            uniqIdForBarrier
          )
        );
      }
    }
  }
};

let arr = {};

const barrierHanlde = () => {
  createBarrier();
  for (let barrier = 0; barrier < barrierArr.length; barrier++) {
    if (barrierArr[barrier].x + 52 < bird.x) {
      passedBarrierObj[barrierArr[barrier].id] = barrierArr[barrier].id;
    }
    if (barrierArr[barrier].x < -60) {
      barrierArr.splice(barrier, 1);
    }
    if (bird.live) {
      barrierArr[barrier].move();
    }
    barrierArr[barrier].draw();
    isBarrierTouchBird(barrier);
  }
};

const isBarrierTouchBird = (barrierNum) => {
  let barrier = barrierArr[barrierNum];
  if (barrier.status.y2 == undefined) {
    //one barrrier
    if (bird.x > barrier.x && bird.x < barrier.x + barrier.barrierWidth) {
      if (
        bird.y > barrier.status.y &&
        bird.y < barrier.status.y + barrier.barrierHeight
      ) {
        gameover.status = true;
      }
    }
  } else {
    //two barrier
    if (bird.x > barrier.x && bird.x < barrier.x + barrier.barrierWidth) {
      if (
        bird.y > barrier.status.y &&
        bird.y < barrier.status.y + barrier.barrierHeight
      ) {
        gameover.status = true;
      } else if (
        bird.y > barrier.status.y2 &&
        bird.y < barrier.status.y2 + barrier.barrierHeight
      ) {
        gameover.status = true;
      }
    }
  }
};

const backgroundHanlde = () => {
  if (bird.live) {
    background.move();
  }
  background.draw();
};

const adjustCanvasSize = () => {
  if (window.innerWidth < 420 || canvas.height < 500) {
    canvas.width = window.innerWidth;
    canvas.height = 500; //window.innerHeight
  }
};

const gameIsOver = () => {
  bird.live = false;
  gameover.draw(bird.x, bird.y);
};
