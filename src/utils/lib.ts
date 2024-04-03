import { v4 } from "uuid"
import { Boid, State } from "./types"


function createBoid(dimensions: number): Boid {
  return {
    coords: Array.from({ length: dimensions }, () => Math.random()),
    velocities: Array.from({ length: dimensions }, () => 0.1 * (0.5 - Math.random())),
    id: v4(),
  }
}

export function createState(nBoids: number, dimensions: number, config: State["config"]): State {
  const boids = Array.from({ length: nBoids }, () => createBoid(dimensions))
  return { boids, dimensions, config }
}

export function updateState(state: State): State {
  const distances = new Map()
  const { config } = state

  function computeDistance(boid1: Boid, boid2: Boid): number {
    const key = [boid1.id, boid2.id].sort().join("-")
    if (distances.has(key)) return distances.get(key)
    const sum = boid1.coords.reduce((acc, coord, i) => {
      const diff = coord - boid2.coords[i]
      return acc + diff * diff
    }, 0)
    const distance = Math.sqrt(sum)
    distances.set(key, distance)
    return distance
  }

  const boids = state.boids.map<Boid>((boid) => {
    const closeBoids = state.boids.filter(b => b.id !== boid.id && computeDistance(boid, b) < config.CLOSE_RADIUS)
    const farBoids = state.boids.filter(b => b.id !== boid.id && computeDistance(boid, b) >= config.CLOSE_RADIUS && computeDistance(boid, b) < config.FAR_RADIUS)

    const velocities = boid.velocities.map((velocity, i) => {
      // lose velocity over time
      velocity *= 0.99

      // flee close boids
      for (const closeBoid of closeBoids) {
        velocity += (boid.coords[i] - closeBoid.coords[i]) * config.FLEE_FACTOR
      }

      for (const farBoid of farBoids) {
        // align to far boids
        velocity += (farBoid.velocities[i] - velocity) * config.ALIGNMENT_FACTOR / farBoids.length

        // move towards centroid of far boids
        velocity += (farBoid.coords[i] - boid.coords[i]) * config.CENTERING_FACTOR / farBoids.length
      }

      // flee edges
      if (boid.coords[i] < config.EDGE_SIZE) {
        velocity += config.TURN_FACTOR
      } else if (boid.coords[i] > 1 - config.EDGE_SIZE) {
        velocity -= config.TURN_FACTOR
      }

      return velocity
    })

    const coords = boid.coords.map((coord, i) => (1 + coord + boid.velocities[i]) % 1)
    return { ...boid, coords, velocities }
  })
  return { ...state, boids }
}