import { useEffect, useRef, useState } from "react"
import { BallManager } from "../game/classes/BallManager"
import axios from "axios"
import { Button } from "../components/ui"
import { baseURL } from "../utils"

const Plinko = () => {
  const [ballManager, setBallManager] = useState()
  const [betAmount, setBetAmount] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const [result, setResult] = useState(null);
  const canvasRef = useRef()

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(canvasRef.current);
      // Add callback for when ball lands
      ballManager.onBallLand = () => {
        setShowResult(true);
      };
      setBallManager(ballManager);
    }
  }, [canvasRef]);

  const handleAddBall = async () => {
    try {
      setResult(null);
      const url = `${baseURL}/game`;
      console.log("Request URL:", url);
      const response = await axios.post(url, {
        data: betAmount
      });
      if (ballManager) {
        ballManager.addBall(response.data.point);
        setMultiplier(response.data.multiplier);
        setResult(betAmount * response.data.multiplier);
      }
    } catch (error) {
      console.error("Error adding ball:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Plinko Game</h1>
      <div className="flex flex-row items-start justify-center gap-8 max-w-7xl mx-auto">
        {/* Left Panel */}
        <div className="w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Controls</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Bet Amount
              </label>
              <input 
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Multiplier
              </label>
              <div className="text-2xl font-bold text-green-400">
                {multiplier}x
              </div>
            </div>
            <div className="space-y-2">
          <label className="block text-sm font-medium">Result</label>
          <div className="text-2xl font-bold text-yellow-400">
            {result}
          </div>
        </div>

            
            <Button 
              onClick={handleAddBall}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              Drop Ball
            </Button>
          </div>
        </div>

        {/* Right Panel - Canvas */}
        <div className="w-3/4">
          <canvas 
            ref={canvasRef} 
            width="800" 
            height="800"
            className="bg-gray-800 rounded-lg shadow-lg"
          ></canvas>
        </div>
      </div>
    </div>
  );
};
export default Plinko;