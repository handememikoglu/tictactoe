// utils/calculateWinner.js
export function calculateWinner(board, gridSize, winLength) {
  // 4×4 için winLength'ın 4 olduğundan emin olun
  const lines = [];
  
  // Yatay kontrol (4×4 için)
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col <= gridSize - winLength; col++) {
      lines.push(Array.from({length: winLength}, (_, i) => row * gridSize + col + i));
    }
  }

  // Dikey kontrol
  for (let col = 0; col < gridSize; col++) {
    for (let row = 0; row <= gridSize - winLength; row++) {
      lines.push(Array.from({length: winLength}, (_, i) => (row + i) * gridSize + col));
    }
  }

  // Çapraz kontrol (\) 
  for (let row = 0; row <= gridSize - winLength; row++) {
    for (let col = 0; col <= gridSize - winLength; col++) {
      lines.push(Array.from({length: winLength}, (_, i) => (row + i) * gridSize + (col + i)));
    }
  }

  // Çapraz kontrol (/)
  for (let row = 0; row <= gridSize - winLength; row++) {
    for (let col = winLength - 1; col < gridSize; col++) {
      lines.push(Array.from({length: winLength}, (_, i) => (row + i) * gridSize + (col - i)));
    }
  }

  for (let line of lines) {
    const first = board[line[0]];
    if (first && line.every(index => board[index] === first)) {
      return first;
    }
  }
  return null;
}