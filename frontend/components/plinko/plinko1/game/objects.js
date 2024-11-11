import {
    HEIGHT,
    NUM_SINKS,
    WIDTH,
    obstacleRadius,
    sinkWidth
  } from "./constants"
  import { pad } from "./padding"
  
  const MULTIPLIERS = {
    1: 16,
    2: 9,
    3: 2,
    4: 1.4,
    5: 1.4,
    6: 1.2,
    7: 1.1,
    8: 1,
    9: 0.5,
    10: 1,
    11: 1.1,
    12: 1.2,
    13: 1.4,
    14: 1.4,
    15: 2,
    16: 9,
    17: 16
  }

  
/**
 * @typedef {Object} Obstacle
 * @property {number} x
 * @property {number} y
 * @property {number} radius
 */

/**
 * @typedef {Object} Sink
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {number} [multiplier]
 */

/**
 * Creates obstacles.
 * @returns {Obstacle[]} Array of obstacles.
 */
  
  export const createObstacles = () => {
    const obstacles = []
    const rows = 18
    for (let row = 2; row < rows; row++) {
      const numObstacles = row + 1
      const y = 0 + row * 35
      const spacing = 36
      for (let col = 0; col < numObstacles; col++) {
        const x = WIDTH / 2 - spacing * (row / 2 - col)
        obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius })
      }
    }
    return obstacles
  }
  
  export const createSinks = () => {
    const sinks = []
    const SPACING = obstacleRadius * 2
  
    for (let i = 0; i < NUM_SINKS; i++) {
      const x =
        WIDTH / 2 + sinkWidth * (i - Math.floor(NUM_SINKS / 2)) - SPACING * 1.5
      const y = HEIGHT - 170
      const width = sinkWidth
      const height = width
      sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i + 1] })
    }
  
    return sinks
  }
  
export const Obstacle = {};
export const Sink = {};