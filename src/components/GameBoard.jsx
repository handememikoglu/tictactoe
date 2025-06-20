// components/GameBoard.jsx
import React from 'react';

const GameBoard = ({ board, onSquareClick, isDisabled }) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      {board.map((value, i) => (
        <button
          key={i}
          onClick={() => onSquareClick(i)}
        //   disabled={value || isDisabled}
          className={`w-20 h-20 text-3xl font-bold rounded-lg flex items-center justify-center 
            ${value === 'X' ? 'bg-blue-100 text-blue-600' : ''}
            ${value === 'O' ? 'bg-red-100 text-red-600' : ''}
            ${!value ? 'bg-gray-300 hover:bg-gray-200' : ''}
            transition-colors duration-200`}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
