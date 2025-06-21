// components/GameBoard.jsx
import React from 'react';

export default function GameBoard({ board, onSquareClick, gridSize, isDisabled }) {
  return (
    <div
      className="grid gap-2 mb-6"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(60px, 1fr))`,
        gridAutoRows: 'minmax(60px, 1fr)'
      }}
    >
      {board.map((value, index) => (
        <button
          key={index}
          onClick={() => onSquareClick(index)}
          disabled={isDisabled || value}
          className={`w-full h-full text-2xl font-bold rounded-lg flex items-center justify-center
            ${value === 'X' ? 'bg-blue-100 text-blue-600' : ''}
            ${value === 'O' ? 'bg-red-100 text-red-600' : ''}
            ${!value ? 'bg-gray-100 hover:bg-gray-200' : ''}
            transition-colors duration-200`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
