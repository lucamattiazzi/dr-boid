import { useControls } from 'leva'
import { useEffect, useRef, useState } from "react"
import { useMeasure } from "react-use"
import { drawState } from "../utils/canvas"
import { SCALE, STATE_CONFIG, STATE_INIT } from '../utils/config'
import { resetCache } from '../utils/geom'
import { createState, updateState } from "../utils/lib"
import { getMeanCloseFlocksSize, getMeanFarFlocksSize, getMeanModulusSpeed } from '../utils/stats'

export function App() {
  const config = useControls(STATE_CONFIG)
  const { nBoids, dimensions } = useControls(STATE_INIT)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const state = useRef(createState(nBoids, dimensions, config))
  const requestAnimationRef = useRef<number>()
  const [measureRef, size] = useMeasure<HTMLCanvasElement>()
  const [meanCloseFlocksSize, setMeanCloseFlocksSize] = useState(0)
  const [meanFarFlocksSize, setMeanFarFlocksSize] = useState(0)
  const [meanModulusSpeed, setMeanModulusSpeed] = useState(0)
  
  function start() {
    cancelAnimationFrame(requestAnimationRef.current || 0)
    const ctx = canvasRef.current!.getContext("2d")!
    function loop() {
      drawState(state.current, ctx, SCALE)
      state.current = updateState(state.current)
      const newMeanCloseFlocksSize = getMeanCloseFlocksSize(state.current)
      const newMeanFarFlocksSize = getMeanFarFlocksSize(state.current)
      const newMeanModulusSpeed = getMeanModulusSpeed(state.current) * 1000
      setMeanCloseFlocksSize(newMeanCloseFlocksSize)
      setMeanFarFlocksSize(newMeanFarFlocksSize)
      setMeanModulusSpeed(newMeanModulusSpeed)
      resetCache()
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
    <div id="main">
      <canvas ref={canvasRef} width={size.width * SCALE} height={size.height * SCALE} />
      <div id="data">
        <p>Mean close flock size: {meanCloseFlocksSize.toFixed(2)}</p>
        <p>Mean far flock size: {meanFarFlocksSize.toFixed(2)}</p>
        <p>Mean modulus speed: {meanModulusSpeed.toFixed(2)}</p>
      </div>
    </div>
  )
}
