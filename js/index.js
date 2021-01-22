const canvas = document.getElementById('snake')
const ctx = canvas.getContext('2d')

const eat = new Image(40, 40);
eat.src = "assets/eat.png"
ctx.drawImage(eat, 40, 40)

    for (let x = 0; x < 400; x += 40) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 400);
    }
    for (let y = 0; y < 400; y += 40) {
        ctx.moveTo(0, y)
        ctx.lineTo(400, y);
    }

    ctx.strokeStyle = "#eee";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0)
    ctx.lineTo(400, 0)

    ctx.moveTo(0, 0)
    ctx.lineTo(0, 400)

    ctx.moveTo(400, 0)
    ctx.lineTo(400, 400)

    ctx.moveTo(0, 400)
    ctx.lineTo(400, 400)

    ctx.strokeStyle = "#000";
    ctx.stroke();
    