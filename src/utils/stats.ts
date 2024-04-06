import { computeDistance } from "./geom";
import { State } from "./types";

export function getMeanCloseFlocksSize(state: State): number {
  let total = 0
  const { boids, config } = state
  for (const boid of boids) {
    const closeBoids = boids.filter(b => b.id !== boid.id && computeDistance(boid, b) < config.CLOSE_RADIUS)
    total += closeBoids.length
  }

  return total / boids.length
}

export function getMeanFarFlocksSize(state: State): number {
  let total = 0
  const { boids, config } = state
  for (const boid of boids) {
    const closeBoids = boids.filter(b => b.id !== boid.id && computeDistance(boid, b) < config.FAR_RADIUS && computeDistance(boid, b) >= config.CLOSE_RADIUS)
    total += closeBoids.length
  }

  return total / boids.length
}

export function getMeanModulusSpeed(state: State): number {
  let total = 0
  const { boids } = state

  for (const boid of boids) {
    const modulusSpeed = Math.sqrt(boid.velocities.reduce((acc, speed) => acc + speed * speed, 0))
    total += modulusSpeed
  }

  return total / boids.length
}