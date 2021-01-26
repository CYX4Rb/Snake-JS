const canvas = document.getElementById('snake')
const ctx = canvas.getContext('2d')
const score = document.getElementById('score')
const start = document.getElementById('start-game')
const pause = document.getElementById('pause')
const speed = document.getElementById('speed-game')
const maxTime = document.getElementById('maxTime')
const eat = new Image();
eat.src = "assets/eat.png"

let isPaused = false
let timeId

function startGame(speed) {
    let snake = [{ x: 250, y: 450 }]
    let points = 0
    score.innerHTML = `Score: ${points}`

    // load playField
    function playingField() {
        ctx.fillStyle = "skyblue";
        ctx.fillRect(0, 0, canvas.width, canvas.height)
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
    let callBack = true
    function switchDirection(evt) {
        if (callBack) {
            if (evt.keyCode == 37 && direction != 'right') {
                direction = 'left'
            }
            else if (evt.keyCode == 38 && direction != 'down') {
                direction = 'up'
            }
            else if (evt.keyCode == 39 && direction != 'left') {
                direction = 'right'
            }
            else if (evt.keyCode == 40 && direction != 'up') {
                direction = 'down'
            }
            callBack = false
        }
    }

    //spawn eat
    let dote
    function spawnEat(snake) {
        do {
            dote = {
                x: Math.floor(Math.random() * 10) / 0.02,
                y: Math.floor(Math.random() * 10) / 0.02
            }
        } while (snake.find(points => points.x == dote.x && points.y == dote.y))
        return dote
    }
    spawnEat(snake)

    // check crash 
    function crash(snake) {
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                return true
            }
        }
        return false
    }
    // initialization
    timeId = setInterval(function () {
        if (!isPaused) {
            playingField()
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

            //spawn snake
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = i == 0 ? '#47fc47' : 'darkGreen'
                ctx.fillRect(snake[i].x, snake[i].y, 50, 50)
            }

            // snake eat 
            if (snake[0].x == dote.x && snake[0].y == dote.y) {
                points++
                score.innerHTML = `Score: ${points}`
                spawnEat(snake)
            } else {
                snake.pop()
            }

            // game over
            if (snake[0].x < 0 || snake[0].x > 450 || snake[0].y < 0 || snake[0].y > 450 || crash(snake)) {
                points = 0
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.font = '80px serif'
                ctx.fillStyle = 'red'
                ctx.fillText('GAME OVER', 10, 250)
                clearInterval(timeId)
            }
        }
        return callBack = true
    }, speed)
}


start.addEventListener('click', () => {
    if(!isPaused){
    clearInterval(timeId)
    startGame(speed.value)}
})

pause.addEventListener('click', () => isPaused ?  isPaused = false : isPaused =  true)

