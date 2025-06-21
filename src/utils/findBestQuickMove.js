import { calculateWinner } from './calculateWinner';

export function findBestQuickMove(board, computer, player, gridSize) {
  // 1. Kazanma fırsatı
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const newBoard = [...board];
      newBoard[i] = computer;
      if (calculateWinner(newBoard, gridSize, gridSize) === computer) {
        return i;
      }
    }
  }

  // 2. Bloklama (rakibi engelle)
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const newBoard = [...board];
      newBoard[i] = player;
      if (calculateWinner(newBoard, gridSize, gridSize) === player) {
        return i;
      }
    }
  }

  // 3. Stratejik kare (merkez/köşe)
  const prioritySquares = getPrioritySquares(gridSize);
  for (let i of prioritySquares) {
    if (!board[i]) return i;
  }

  // 4. Rastgele boş kare
  const empties = board.map((v, i) => v === null ? i : null).filter(i => i !== null);
  return empties[Math.floor(Math.random() * empties.length)];
}

function getPrioritySquares(gridSize) {
  if (gridSize === 3) return [4, 0, 2, 6, 8, 1, 3, 5, 7];
  return [5, 6, 9, 10, 0, 3, 12, 15, 1, 2, 4, 7, 8, 11, 13, 14];
}
