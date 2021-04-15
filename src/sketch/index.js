import { Engine, Bodies, Composite } from 'matter-js'
import { Perspectives } from './config'

import Ball from './bodies/ball'

export default function sketch(p5) {

  const WW = 600
  const WH = 600
  let engine, world, enginePointers

  let bodies = []
  let box1, floor, ball1

  p5.setup = () => {
    p5.createCanvas(WW, WH)
    engine = Engine.create()
    engine.gravity = Perspectives.natural
    
    world = engine.world
    world.worldSizes = {h: WH, w: WW}
    enginePointers = [world, p5]
  
    box1 = Bodies.rectangle(200, 0, 50, 50)
    ball1 = new Ball(300, 300, 50, ...enginePointers)
    floor = Bodies.rectangle(200, WH-30, WW, 30, {isStatic: true})

    Composite.add(world, [box1, floor, ball1])
  
    Engine.run(engine)
  }

  p5.draw = () => {
    p5.background(5, 255, 150)
    p5.rect(box1.position.x-25, box1.position.y-25, 50, 50)
    p5.rect(floor.position.x-300, floor.position.y-15, WW, 30)
    ball1.redraw()

    for(let b of bodies) b.redraw()
  }

  p5.mousePressed = () => {
    bodies.push(
      new Ball(p5.mouseX, p5.mouseY, p5.random(10,25), ...enginePointers)
    )
  }

}
