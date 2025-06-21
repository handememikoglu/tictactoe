import { calculateWinner } from './calculateWinner';
import { findBestQuickMove } from './findBestQuickMove';

export const getBestMove = (board, computer, player, gridSize = 3, depth = 0, maxDepth = 2) => {
  const winner = calculateWinner(board, gridSize, gridSize);
  if (winner === computer) return { score: 10 - depth };
  if (winner === player) return { score: depth - 10 };
  if (board.every(cell => cell !== null)) return { score: 0 };

  // 4x4 için hızlı karar
  if (gridSize === 4 && depth > maxDepth) {
    return {
      index: findBestQuickMove(board, computer, player, gridSize),
      score: 0
    };
  }

  const moves = [];

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const newBoard = [...board];
      newBoard[i] = (depth % 2 === 0) ? computer : player;

      const result = getBestMove(newBoard, computer, player, gridSize, depth + 1, maxDepth);

      moves.push({
        index: i,
        score: result.score
      });
    }
  }

  // Bilgisayar (max)
  if (depth % 2 === 0) {
    return moves.reduce((best, move) =>
      move.score > best.score ? move : best,
      { score: -Infinity }
    );
  }

  // Oyuncu (min)
  return moves.reduce((best, move) =>
    move.score < best.score ? move : best,
    { score: Infinity }
  );
};
