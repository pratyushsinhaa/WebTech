import React, { useState } from "react";
import "./Wheel.css";

const segments = [
  { color: "red", label: "2x", multiplier: 2 },
  { color: "blue", label: "3x", multiplier: 3 },
  { color: "green", label: "5x", multiplier: 5 },
  { color: "yellow", label: "10x", multiplier: 10 },
  { color: "purple", label: "20x", multiplier: 20 },
];

const Wheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [bet, setBet] = useState(0);
  const [balance, setBalance] = useState(1000);

  const spinWheel = () => {
    if (bet <= 0 || bet > balance) {
      alert("Invalid bet amount.");
      return;
    }

    setSpinning(true);
    const spinDuration = 5000; // 5 seconds
    const randomSegment = Math.floor(Math.random() * segments.length);
    const rotation = 360 * 5 + randomSegment * (360 / segments.length);

    setTimeout(() => {
      setSpinning(false);
      setResult(segments[randomSegment]);
      setBalance(balance + bet * segments[randomSegment].multiplier - bet);
    }, spinDuration);
  };

  return (
    <div className="wheel-game">
      <h1>Wheel Game</h1>
      <div className="wheel-container">
        <div
          className={`wheel ${spinning ? "spinning" : ""}`}
          style={{ transform: `rotate(${spinning ? rotation : 0}deg)` }}
        >
          {segments.map((segment, index) => (
            <div
              key={index}
              className="segment"
              style={{
                backgroundColor: segment.color,
                transform: `rotate(${index * (360 / segments.length)}deg) skewY(-60deg)`,
              }}
            >
              <span>{segment.label}</span>
            </div>
          ))}
        </div>
        <div className="pointer"></div>
      </div>
      <div className="controls">
        <label>
          Bet Amount:
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="bet-input"
          />
        </label>
        <button onClick={spinWheel} disabled={spinning}>
          Spin
        </button>
        <p>Balance: ${balance}</p>
        {result && !spinning && <p>Result: {result.label}</p>}
      </div>
    </div>
  );
};

export default Wheel;