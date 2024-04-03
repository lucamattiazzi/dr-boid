import { useControls } from 'leva'
import { useEffect, useRef } from "react"
import { useMeasure } from "react-use"
import { drawState } from "../utils/canvas"
import { createState, updateState } from "../utils/lib"

const SCALE = 2
const STATE_INIT = {
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
const STATE_CONFIG = {
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


export function App() {
  const config = useControls(STATE_CONFIG)
  const { nBoids, dimensions } = useControls(STATE_INIT)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const state = useRef(createState(nBoids, dimensions, config))
  const requestAnimationRef = useRef<number>()
  const [measureRef, size] = useMeasure<HTMLCanvasElement>()
  
  function start() {
    cancelAnimationFrame(requestAnimationRef.current || 0)
    const ctx = canvasRef.current!.getContext("2d")!
    function loop() {
      drawState(state.current, ctx, SCALE)
      state.current = updateState(state.current)
      requestAnimationRef.current = requestAnimationFrame(() => loop())
    }
    loop()
  }
  
  useEffect(() => {
    if (!canvasRef.current) return
    measureRef(canvasRef.current)
    if (size.width === 0 || size.height === 0) return
    start()

  }, [canvasRef, measureRef, size])

  useEffect(() => {
    state.current.config = config
  }, [config])

  useEffect(() => {
    state.current = createState(nBoids, dimensions, state.current.config)
  }, [nBoids, dimensions])


  return (
    <canvas ref={canvasRef} width={size.width * SCALE} height={size.height * SCALE} />
  )
}
