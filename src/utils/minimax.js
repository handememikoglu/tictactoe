// utils/minimax.js
export const getBestMove = (board, computer, player) => {
  const emptyIndexes = board.map((val, idx) => (val === null ? idx : null)).filter(i => i !== null);

  const winner = calculateWinner(board);
  if (winner === computer) return { score: 10 };
  if (winner === player) return { score: -10 };
  if (emptyIndexes.length === 0) return { score: 0 };

  const moves = [];

  for (let i of emptyIndexes) {
    const newBoard = [...board];
    newBoard[i] = computer;

    const result = getBestMove(newBoard, player, computer); // swap roles
    moves.push({ index: i, score: -result.score });
  }

  // en iyi skoru bul
  const best = moves.reduce((best, move) => move.score > best.score ? move : best, moves[0]);
  return best;
};

import { calculateWinner } from './calculateWinner';
