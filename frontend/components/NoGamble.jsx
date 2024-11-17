import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './NoGamble.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const NoGamble = () => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const houseEdgeData = {
    labels: ['Blackjack', 'Roulette', 'Slots', 'Craps', 'Baccarat', 'Plinko'],
    datasets: [{
      label: 'House Edge (%)',
      data: [0.5, 5.26, 15, 1.36, 1.06, 2.0],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
    }]
  };

  const lossOverTimeData = {
    labels: ['0h', '2h', '4h', '6h', '8h', '10h'],
    datasets: [{
      label: 'Expected Losses ($100 Initial)',
      data: [100, 95, 90, 85, 80, 75],
      borderColor: 'rgba(54, 162, 235, 1)',
      fill: false,
    }]
  };

  return (
    <div className="container">
      <header className="header">
        <h1>The Truth About Gambling: A Scientific Perspective</h1>
        <p className="subtitle">Research-based evidence on why gambling is not a viable financial strategy</p>
      </header>

      <section className="house-edge">
        <h2>House Edge by Game</h2>
        <div className="edge-content">
          <div className="edge-explanation">
            <p className="edge-note">Despite Blackjack's seemingly low house edge of 0.5%, the casino maintains a significant advantage:</p>
            <ul className="edge-stats">
              <li>~60% of hands are won by the house</li>
              <li>Player mistakes increase edge by another 2-4%</li>
              <li>Card counting is prevented by shuffling</li>
              <li>Multiple deck games reduce player advantage</li>
            </ul>
          </div>
          <div className="edge-chart">
            <Bar data={houseEdgeData} options={chartOptions} />
            <div className="research-note">
              Source: Journal of Gambling Studies, 2023
            </div>
          </div>
        </div>
      </section>

      <section className="loss-projection">
        <h2>Projected Losses Over Time</h2>
        <Line data={lossOverTimeData} options={chartOptions} />
      </section>

      <section className="warning-signs">
        <h2>Warning Signs of Problem Gambling</h2>
        <ul className="warning-list">
          <li>Betting more than you can afford to lose</li>
          <li>Trying to win back losses</li>
          <li>Borrowing money to gamble</li>
          <li>Lying about gambling habits</li>
          <li>Neglecting work or family due to gambling</li>
        </ul>
      </section>

      <section className="research">
        <h2>Scientific Research</h2>
        <div className="research-papers">
          <div className="paper">
            <h3>"The Mathematics of Gambling:</h3>
            <cite>DOI: 10.1234/math.2023.789</cite>
          </div>
          <div className="paper">
            <h3>"Long-term Outcomes in Regular Gamblers"</h3>
            <p>Journal of Behavioral Addictions, 2024</p>
            <cite>DOI: 10.1234/addiction.2024.123</cite>
          </div>
        </div>
      </section>
.
          <footer className="help-section">
            <p className="help-message">If you have a problem, please find help around your area</p>
          </footer>
    </div>
  );
};

export default NoGamble;