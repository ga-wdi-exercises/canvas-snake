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
      console.log(`x: ${x} y: ${y}`)
      // TODO 1: Create a rectangle for each coordinate.
      // Multiply the x coordinate by the snake's width
      // TODO 2: Add a white stroke to each cell
    })
    // TODO 3: Create a rectangle for `this.fruit`
  }
  move(){
    // TODO 4: Move the snake
    var loop = setInterval( _ => {
      // remove the first element of the snake's body
      // repaint the entire canvas by drawing a white square over the whole canvas
      this.grow()
      this.draw()
      this.checkCollision(loop)
    }, 100)
  }
  grow(){
    var last = this.body[this.body.length - 1]
    let {x,y} = last
    // TODO 5: modify the values for x and y, depending on `this.direction`
    // such that:
    // if direction is right x is incremented
    // if direction is left x is decremented
    // if direction is up, y is decremented
    // if direction is down, y is incremented
    this.body.push({x,y})
  }
  checkCollision(loop){
    // TODO 6: Check for collisions
    var gameOver = false
    var head = this.body[this.body.length-1]
    // a collision happens when any of the following are true:
    // the snake's head's x is greater than or equal to 30
    // the snake's head's x is less than or equal to 0
    // the snake's head's y is greather than or equal to 15
    // the snake's head's y is less than 0
    // if the head of the snake touches the fruit, then grow the snake, and show another fruit

    // Bonus! How can you end the game if the snake touches itself?
    if(gameOver){
      this.gameOver(loop)
    }
  }
  gameOver(loop){
    // TODO 7: tell the user the game is over
    clearInterval(loop)
    console.log('game Over')
    // if they want to play a game, create a new Snake.
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
    this.fruit = {
      x: Math.floor(Math.random() * 30),
      y: Math.floor(Math.random() * 15)
    }
  }
}

new Snake()
