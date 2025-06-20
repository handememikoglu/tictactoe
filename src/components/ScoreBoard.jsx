// components/ScoreBoard.jsx
import React from 'react';

const ScoreBoard = ({ scores, players }) => {
  return (
    <div className="flex justify-center space-x-8 mb-6">
      <div className="bg-blue-100 px-4 py-2 rounded-lg text-blue-700 font-bold text-center">
        <div>{players.player1} (X)</div>
        <div className="text-2xl">{scores.X}</div>
      </div>
      <div className="bg-red-100 px-4 py-2 rounded-lg text-red-700 font-bold text-center">
        <div>{players.player2} (O)</div>
        <div className="text-2xl">{scores.O}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
