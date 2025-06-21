// components/GameStatus.jsx
import React from 'react';

const GameStatus = ({ winner, isDraw, currentPlayer, gameMode, playerSymbol, players }) => {
  const displayName = symbol => {
    if (gameMode === 'singlePlayer') {
      if (symbol === playerSymbol) return players.player1;
      return 'Bilgisayar';
    }
    return symbol === 'X' ? players.player1 : players.player2;
  };

  if (winner) {
    return <div className="text-green-600 font-bold text-xl mb-4">Kazanan: {displayName(winner)}</div>;
  }
  if (isDraw) {
    return <div className="text-gray-700 font-semibold text-xl mb-4">Berabere!</div>;
  }
  return <div className="text-gray-800 font-semibold text-xl mb-4">Sıra: {displayName(currentPlayer)}</div>;
};

export default GameStatus;
