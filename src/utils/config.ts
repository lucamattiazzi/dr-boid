export const SCALE = 2
export const STATE_INIT = {
  nBoids: {
    value: 100,
    min: 1,
    max: 1000,
    step: 1
  },
  dimensions: {
    value: 2,
    min: 1,
    max: 100,
    step: 1
  }
}
export const STATE_CONFIG = {
  FLEE_FACTOR: {
    value: 0.001,
    min: 0,
    max: 0.1,
    step: 0.001
  },
  ALIGNMENT_FACTOR: {
    value: 0.001,
    min: 0,
    max: 0.1,
    step: 0.001
  },
  CENTERING_FACTOR: {
    value: 0.001,
    min: 0,
    max: 0.1,
    step: 0.001
  },
  TURN_FACTOR: {
    value: 0.001,
    min: 0,
    max: 0.1,
    step: 0.001
  },
  EDGE_SIZE: {
    value: 0.1,
    min: 0,
    max: 1,
    step: 0.001
  },
  CLOSE_RADIUS: {
    value: 0.1,
    min: 0,
    max: 1,
    step: 0.001
  },
  FAR_RADIUS: {
    value: 0.2,
    min: 0,
    max: 1,
    step: 0.001
  },
}
