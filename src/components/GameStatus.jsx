// components/GameStatus.jsx
import React from 'react';

const GameStatus = ({ winner, isDraw, currentPlayer, playerSymbol, gameMode, players }) => {
  const status = winner
    ? `Kazanan: ${winner}`
    : isDraw
      ? 'Berabere!'
      : `Sıradaki: ${currentPlayer}`;

  const winnerName =
    gameMode === 'singlePlayer'
      ? (winner === playerSymbol ? "Tebrikler, kazandınız!" : "Bilgisayar kazandı!")
      : `Tebrikler, ${winner === 'X' ? players.player1 : players.player2} kazandı!`

  return (
    <div className="text-center mb-4">
      <div className={`text-xl font-semibold mb-2
        ${winner ? (winner === 'X' ? 'text-blue-600' : 'text-red-600') : 'text-gray-700'}`}>
        {status}
      </div>
      {winner && (
        <div className="text-lg text-gray-600">
          {winnerName}
        </div>
      )}
    </div>
  );
};

export default GameStatus;
