const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

class Sprite {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
}

const player1 = new Sprite({
    position: {x:0, y:0},
    velocity: {x:0, y:10}
})
const player2 = new Sprite({
    position: {x:400, y:100},
    velocity: {x:0, y:10}
})

player1.draw()
player2.draw()

console.log(player1)
console.log(player2)

const keys = {
    a: {pressed: false},
    d: {pressed: false},
    w: {pressed: false},
    s: {pressed: false},
    fa: {pressed: false},
    fd: {pressed: false},
    fw: {pressed: false},
    fs: {pressed: false}
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player1.update()
    player2.update()

    player1.velocity.x = 0
    player2.velocity.x = 0
    
    if (keys.a.pressed && player1.lastKey === 'a'){
        player1.velocity.x = -5
    } else if (keys.d.pressed && player1.lastKey === 'd'){
        player1.velocity.x = 5
    }

    if (keys.fa.pressed && player2.lastKey === 'fa'){
        player2.velocity.x = -5
    } else if (keys.fd.pressed && player2.lastKey === 'fd'){
        player2.velocity.x = 5
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        //player11 movimiento
        case 'KeyD':
            keys.d.pressed = true
            player1.lastKey = 'd'
            break;
        case 'KeyA':
            keys.a.pressed = true
            player1.lastKey = 'a'
            break;
        case 'KeyW':
            keys.w.pressed = true
            player1.lastKey = 'w'
            player1.velocity.y = -20
            break;
        case 'KeyS':
            keys.s.pressed = true
            player1.lastKey = 's'
            player1.velocity.y = 10
            break;
        
        case 'ArrowRight':
            keys.fd.pressed = true
            player2.lastKey = 'fd'
            break;
        case 'ArrowLeft':
            keys.fa.pressed = true
            player2.lastKey = 'fa'
            break;
        case 'ArrowUp':
            keys.fw.pressed = true
            player2.lastKey = 'fw'
            player2.velocity.y = -20
            break;
        case 'ArrowDown':
            keys.fs.pressed = true
            player2.lastKey = 'fs'
            player2.velocity.y = 10
            break;
        
        default:
            break;
    }
    console.log(event.code);
})
window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyD':
            keys.d.pressed = false
            break;
        case 'KeyA':
            keys.a.pressed = false
            break;
        case 'KeyW':
            keys.w.pressed = false
            break;
        case 'KeyS':
            keys.s.pressed = false
            break;
        
        case 'ArrowRight':
            keys.fd.pressed = false
            break;
        case 'ArrowLeft':
            keys.fa.pressed = false
            break;
        case 'ArrowUp':
            keys.fw.pressed = false
            break;
        case 'ArrowDown':
            keys.fs.pressed = false
            break;
        
        default:
            break;
    }
    console.log(event.code);
})