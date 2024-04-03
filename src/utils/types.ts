export interface Boid {
  coords: number[]
  velocities: number[]
  id: string
}

export interface State {
  boids: Boid[]
  dimensions: number
  config: {
    FLEE_FACTOR: number
    ALIGNMENT_FACTOR: number
    CENTERING_FACTOR: number
    TURN_FACTOR: number
    EDGE_SIZE: number
    CLOSE_RADIUS: number
    FAR_RADIUS: number
  }
}