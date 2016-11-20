class Snake {
  constructor(){
    this.ctx = canvas.getContext('2d')
    this.ctx.strokeStyle = 'white'
    this.width = 10
    this.body = [
      {x:0,y:0},
      {x:1,y:0},
      {x:2,y:0},
      {x:3,y:0},
      {x:4,y:0}
    ]
    this.move()
    this.getDirection()
    this.showFruit()
    this.draw()
  }
  draw(){
    this.body.forEach(({x,y})=>{
      this.ctx.fillStyle = 'black'
      //console.log(`x: ${x} y: ${y}`)
      // TODO 1: Create a rectangle
      // for each coordinate. Multiply
      // the x coordinate by the snake's width
      this.ctx.fillRect(x*this.width, y*this.width, this.width, this.width)
      // TODO 2: Add a white stroke to each cell
      this.ctx.strokeRect(x*this.width, y*this.width, this.width, this.width)
    })
    this.ctx.fillRect(this.fruit.x*this.width,this.fruit.y*this.width, this.width, this.width)
  }
  move(){
    // TODO 3: Move the snake
    var loop = setInterval( _ => {
      // remove the first element of the snake's body
      this.body.shift()
      // repaint the entire canvas by drawing a white square over,
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0,0,300,150)
      // store the last element of the snakes body in a variable
      // push a new element to the snakes body, that is the previous
      // variable where x is incremented by 1, and y stays 0
      this.grow()
      // and then call the snake's draw method again
      this.draw()
      this.checkCollision(loop)
    }, 100)
  }
  grow(){
    // TODO 5: modify the move() method so that the following is true:
    var last = this.body[this.body.length - 1]
    let {x,y} = last
    // if direction is right x is incremented
    if(this.direction == "right"){
      x++
    }
    // if direction is left x is decremented
    if(this.direction == "left"){
      x--
    }
    // if direction is up, y is decremented
    if(this.direction == "up"){
      y--
    }
    // if direction is down, y is incremented
    if(this.direction == "down"){
      y++
    }
    this.body.push({x,y})
  }
  checkCollision(loop){
    // TODO 4: Check for collisions
    var outside, fruit = false
    // a collision happens when any of the following are true:
    var head = this.body[this.body.length-1]
    // the snake's head's x is greater than or equal to 30
    if(head.x >= 30){
      outside = true
    }
    // the snake's head's x is less than or equal to 0
    if(head.x < 0){
      outside = true
    }
    // the snake's head's y is greather than or equal to 15
    if(head.y >= 15){
      outside = true
    }
    // the snake's head's y is less than or equal to 0
    if(head.y < 0){
      outside = true
    }

    var tail = this.body.slice(0, this.body.length - 1)
    // if the head of the snake touches the fruit, then add one to the snake
    if(tail.some(cell => {
      return cell.x === head.x && cell.y === head.y
    })){
      this.gameOver(loop)
    }
    if(head.x === this.fruit.x && head.y === this.fruit.y){
      this.grow()
      this.showFruit()
    }
    if(outside){
      this.gameOver(loop)
    }
  }
  gameOver(loop){
    // TODO: tell the user the game is over
    // if they want to play a game, create a new Snake.
    clearInterval(loop)
    console.log('game Over')
    //new Snake()
  }
  getDirection(){
    this.direction = 'right' // the default
    window.addEventListener('keyup', e => {
      if(e.key === "ArrowRight"){
        this.direction = 'right'
      }
      if(e.key === "ArrowLeft"){
        this.direction = 'left'
      }
      if(e.key === "ArrowUp"){
        this.direction = 'up'
      }
      if(e.key === "ArrowDown"){
        this.direction = 'down'
      }
    })
  }
  showFruit(){
    // TODO
    var x = Math.floor(Math.random() * 30)
    var y = Math.floor(Math.random() * 15)
    this.fruit = {x,y}
  }
}

new Snake()
