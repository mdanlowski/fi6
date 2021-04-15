import { Bodies, Composite } from 'matter-js'

export default class Ball {
  constructor(_x, _y, _r, world, renderer){
    this.radius = _r
    this.B = Bodies.circle(_x, _y, _r/2)
    this.W = world
    this.R = renderer
    Composite.add(world, this.B)

    this.isInactiveOrDestroyed = false
  }

  redraw() {
    if(this.isInactiveOrDestroyed) return
    this.R.ellipse.call(this.R,
      this.B.position.x,
      this.B.position.y,
      this.radius
    )

    if(this.outOfBounds()) this.destroyFromWorld()
  }

  destroyFromWorld() {
    Composite.remove(this.W, this.B)
    this.isInactiveOrDestroyed = true

    return this.W.bodies.length
  }

  outOfBounds() {
    let bx = this.B.position.x,
      by = this.B.position.y,
      wx = this.W.worldSizes.h,
      wy = this.W.worldSizes.w,
      r = this.radius

    return (bx+r < 0) || (bx-r > wx) || (by+r < 0) || (by-r > wy)
  }
}
