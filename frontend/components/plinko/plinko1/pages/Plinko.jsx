import { useEffect, useRef, useState } from "react"
import { BallManager } from "../game/classes/BallManager"
import axios from "axios"
import { Button } from "../components/ui"
import { baseURL } from "../utils"
import '@fontsource/quicksand'
import '@fontsource/comfortaa'

const Plinko = () => {
  const [ballManager, setBallManager] = useState()
  const [betAmount, setBetAmount] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const [result, setResult] = useState(null);
  const [walletBalance, setWalletBalance] = useState(1000); 
  const [showMultiplier, setShowMultiplier] = useState(false);
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
      if (betAmount > walletBalance) {
        alert("Insufficient balance!");
        return;
      }
      
      setResult(null);
      setShowMultiplier(false);
      // Deduct bet amount immediately
      setWalletBalance(prev => prev - betAmount);
      
      const url = `${baseURL}/game`;
      console.log("Request URL:", url);
      const response = await axios.post(url, {
        data: betAmount
      });
      
      if (ballManager) {
        ballManager.addBall(response.data.point);
        
        // Add delay for multiplier display
        setTimeout(() => {
          setShowMultiplier(true);
          setMultiplier(response.data.multiplier);
          const winAmount = betAmount * response.data.multiplier;
          setResult(winAmount);
          // Update wallet with winnings
          setWalletBalance(prev => prev + winAmount);
        }, 3200);
      }
    } catch (error) {
      console.error("Error adding ball:", error);
    }
  };
  return(
  <div className="min-h-screen bg-gradient-to-b from-[#A4D7E1] to-white font-['Quicksand']">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-[#004D4D] mb-8 font-['Comfortaa']">
          Plinko
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Control Panel */}
          <div className="w-full lg:w-1/4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-[#004D4D] font-['Comfortaa']">
              Controls
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Bet Amount
                </label>
                <input 
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004D4D] focus:border-transparent transition duration-200"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Multiplier
                </label>
                <div className="text-2xl font-bold text-[#004D4D]">
                  {multiplier}x
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Result
                </label>
                <div className="text-2xl font-bold text-[#004D4D]">
                  {result && `₹${result.toFixed(2)}`}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Wallet Balance
                </label>
                <div className="text-2xl font-bold text-[#004D4D]">
                  ₹{walletBalance.toFixed(2)}
                </div>
              </div>

              <button 
                onClick={handleAddBall}
                className="w-full bg-[#004D4D] hover:bg-[#003333] text-white font-medium py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Drop Ball
              </button>
            </div>
          </div>

          {/* Game Canvas */}
          <div className="w-full lg:w-[65%]">
            <canvas 
              ref={canvasRef} 
              width="800" 
              height="800"
              className="w-full bg-white rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Plinko;