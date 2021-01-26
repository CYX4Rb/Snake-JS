const canvas = document.getElementById('snake')
const ctx = canvas.getContext('2d')
const score = document.getElementById('score')
const start = document.getElementById('start-game')
const maxTime = document.getElementById('maxTime')
const eat = new Image();
eat.src = "assets/eat.png"


let snake = [{ x: 250, y: 200 }, { x: 250, y: 250 }, { x: 250, y: 300 }]
let points = 0
score.innerHTML = `Score: ${points}`

// load playField
function playingField() {
    for (let x = 0; x < 500; x += 50) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 500)
    }
    for (let y = 0; y < 500; y += 50) {
        ctx.moveTo(0, y)
        ctx.lineTo(500, y)
    }

    ctx.strokeStyle = "#eee"
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0)
    ctx.lineTo(500, 0)

    ctx.moveTo(0, 0)
    ctx.lineTo(0, 500)

    ctx.moveTo(500, 0)
    ctx.lineTo(500, 500)

    ctx.moveTo(0, 500)
    ctx.lineTo(500, 500)

    ctx.strokeStyle = "#000"
    ctx.stroke()
}

//switch direction

document.addEventListener('keydown', switchDirection)
let direction = 'up'

function switchDirection(evt) {
    if (evt.keyCode == 37 && direction != 'right') {
        console.log('left')
        direction = 'left'
    }

    else if (evt.keyCode == 38 && direction != 'down') {
        console.log('up')
        direction = 'up'
    }

    else if (evt.keyCode == 39 && direction != 'left') {
        console.log('right')
        direction = 'right'
    }

    else if (evt.keyCode == 40 && direction != 'up') {
        console.log('down')
        direction = 'down'
    }
}

//spawn eat
let dote
function spawnEat() {
    let counter = 0
    while (counter <= snake.length) {
        dote = {
            x: Math.floor(Math.random() * 10) / 0.02,
            y: Math.floor(Math.random() * 10) / 0.02
        }
        snake.forEach(el => { el.y != dote.y || el.x != dote.x ? counter++ : counter })
    }
    return dote
}
spawnEat()

// check crash 
function crash(snake){
    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            return true
        }
        return false
    }
}

// start game
let game = setInterval(function () {

    playingField()
    for (let i = 0; i < snake.length; i++) {
        ctx.clearRect(snake[i].x, snake[i].y, 50, 50)
    }
    ctx.drawImage(eat, dote.x, dote.y, 50, 50)

// create new head snake
    switch (direction) {
        case 'left':
            snake.unshift({
                x: snake[0].x - 50,
                y: snake[0].y
            })
            break
        case 'up':
            snake.unshift({
                x: snake[0].x,
                y: snake[0].y - 50
            })
            break
        case 'right':
            snake.unshift({
                x: snake[0].x + 50,
                y: snake[0].y
            })
            break
        case 'down':
            snake.unshift({
                x: snake[0].x,
                y: snake[0].y + 50
            })
            break
    }

// snake eat 
    if (snake[0].x == dote.x && snake[0].y == dote.y) {
        points++
        score.innerHTML = `Score: ${points}`
        spawnEat()
    } else {
        snake.pop()
    }

// game over
    if (snake[0].x < 0 || snake[0].x > 450 || snake[0].y < 0 || snake[0].y > 450 || crash(snake)){
        ctx.font = '80px serif'
        ctx.fillStyle = 'red'
        ctx.fillText('GAME OVER', 10, 250)
        clearInterval(game)
    }

//spawn snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? '#47fc47' : 'darkGreen'
        ctx.fillRect(snake[i].x, snake[i].y, 50, 50)
    }
}, 200)
/* start.addEventListener('onclick', game) */


