// components/ScoreBoard.jsx
import React from 'react';

const ScoreBoard = ({ scores, players, playerSymbol, gameMode }) => {
  const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';

  const getName = symbol => {
    if (gameMode === 'singlePlayer') {
      if (symbol === playerSymbol) return players.player1;
      return 'Bilgisayar';
    }
    return symbol === 'X' ? players.player1 : players.player2;
  };

  return (
    <div className="flex justify-center space-x-8 mb-4">
      <div className="bg-blue-100 px-4 py-2 rounded text-blue-800 text-center">
        {getName('X')} (X): <span className="font-bold">{scores.X}</span>
      </div>
      <div className="bg-red-100 px-4 py-2 rounded text-red-800 text-center">
        {getName('O')} (O): <span className="font-bold">{scores.O}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
