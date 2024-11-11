import { useEffect, useRef, useState } from "react"
import { BallManager } from "../game/classes/BallManager"
import { WIDTH } from "../game/constants"
import { pad } from "../game/padding"
import { useNavigate } from "react-router-dom"
import React from "react"

export function Home() {
  const navigate = useNavigate()

  const canvasRef = useRef()
  let [outputs, setOutputs] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: []
  })

  async function simulate(ballManager) {
    let i = 0
    while (1) {
      i++
      ballManager.addBall(pad(WIDTH / 2 + 20 * (Math.random() - 0.5)))
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current,
        (index, startX) => {
          setOutputs(outputs => {
            return {
              ...outputs,
              [index]: [...outputs[index], startX]
            }
          })
        }
      )
      simulate(ballManager)

      return () => {
        ballManager.stop()
      }
    }
  }, [canvasRef])

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row  items-center justify-between ">
      </div>
    </div>
  )
}
