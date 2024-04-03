import { State } from "./types";

const SIZE = 10

export function drawState(state: State, ctx: CanvasRenderingContext2D, scale: number) {
  const { canvas } = ctx
  const { width, height } = canvas
  ctx.clearRect(0, 0, width, height)

  for (const boid of state.boids) {
    ctx.beginPath()
    ctx.fillStyle = "black"
    const x = boid.coords[0] * width
    const y = (boid.coords[1] || .5) * height
    ctx.fillRect(x, y, SIZE * scale, SIZE * scale)
    ctx.stroke()
  }
}