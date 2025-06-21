// components/XOXGame.jsx
import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

import GameBoard from './GameBoard';
import GameStatus from './GameStatus';
import ScoreBoard from './ScoreBoard';
import Settings from './Settings';

import { calculateWinner } from '../utils/calculateWinner';
import { getBestMove } from '../utils/minimax';
import { findBestQuickMove } from '../utils/findBestQuickMove';

function XOXGame() {
  const [gridSize, setGridSize] = useState(3);
  const winLength = gridSize;
  const totalSquares = gridSize * gridSize;

  const [board, setBoard] = useState(Array(totalSquares).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState('twoPlayer');
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [difficulty, setDifficulty] = useState('easy');
  const [players, setPlayers] = useState({ player1: 'Oyuncu 1', player2: 'Oyuncu 2' });
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const { width, height } = useWindowSize();
  const winner = calculateWinner(board, gridSize, winLength);
  const isDraw = board.every(s => s !== null) && !winner;
  const currentPlayer = isXNext ? 'X' : 'O';
  const showConfetti = Boolean(winner);
  const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';

  useEffect(() => {
    setBoard(Array(totalSquares).fill(null));
    setIsXNext(true);
  }, [gridSize]);

  // Bilgisayar hamlesi
  useEffect(() => {
  const isComputerTurn = 
    gameStarted && 
    gameMode === 'singlePlayer' && 
    currentPlayer === computerSymbol && 
    !winner && 
    !isDraw;

  console.log("Computer turn check:", {
    gameStarted,
    gameMode,
    currentPlayer,
    computerSymbol,
    winner,
    isDraw,
    isComputerTurn
  });

  if (isComputerTurn) {
    const timer = setTimeout(() => {
      difficulty === 'easy' ? makeRandomMove() : makeSmartMove();
    }, 500);
    return () => clearTimeout(timer);
  }
}, [board, currentPlayer, gameStarted, gameMode, winner, isDraw, difficulty, playerSymbol]); // currentPlayer'ı ekledik

  useEffect(() => {
    if (winner) {
      setScores(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
    }
  }, [winner]);

  const handleSquareClick = i => {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Kolay mod için rastgele hamle
const makeRandomMove = () => {
  const empties = board.map((v, i) => v === null ? i : null).filter(i => i !== null);
  const idx = empties[Math.floor(Math.random() * empties.length)];
  const nb = [...board];
  nb[idx] = computerSymbol;
  setBoard(nb);
  setIsXNext(!isXNext);
};

// Zor mod için optimize edilmiş minimax
const makeSmartMove = () => {
  // 4×4 için farklı strateji
  if (gridSize === 4) {
    const quickMove = findBestQuickMove(board, computerSymbol, playerSymbol, gridSize);
    const nb = [...board];
    nb[quickMove] = computerSymbol;
    setBoard(nb);
    setIsXNext(!isXNext);
    return;
  }

  // 3×3 için normal minimax
  const best = getBestMove(board, computerSymbol, playerSymbol, gridSize);
  if (best.index !== undefined) {
    const nb = [...board];
    nb[best.index] = computerSymbol;
    setBoard(nb);
    setIsXNext(!isXNext);
  }
};

  const resetGame = () => {
    setBoard(Array(totalSquares).fill(null));
    setIsXNext(true);
  };

  const handleStart = () => {
    setPlayers(prev => ({
      ...prev,
      player2: gameMode === 'singlePlayer' ? 'Bilgisayar' : prev.player2
    }));
     setGameStarted(true); // Bu mutlaka olmalı!
      setBoard(Array(totalSquares).fill(null));
      setIsXNext(playerSymbol === 'X'); // X başlıyorsa true, O başlıyorsa false
      setScores({ X: 0, O: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">XOX Oyunu</h1>
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}

      {!gameStarted ? (
        <Settings
          gameMode={gameMode}
          setGameMode={setGameMode}
          playerSymbol={playerSymbol}
          setPlayerSymbol={setPlayerSymbol}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          players={players}
          setPlayers={setPlayers}
          gridSize={gridSize}
          setGridSize={setGridSize}
          onStart={handleStart}
          setScores={setScores}
        />
      ) : (
        <>
          <ScoreBoard
            scores={scores}
            players={players}
            playerSymbol={playerSymbol}
            gameMode={gameMode}
          />
          <GameStatus
            winner={winner}
            isDraw={isDraw}
            currentPlayer={currentPlayer}
            gameMode={gameMode}
            playerSymbol={playerSymbol}
            players={players}
          />
          <GameBoard
            board={board}
            onSquareClick={handleSquareClick}
            gridSize={gridSize}
            isDisabled={Boolean(winner)}
          />
          <div className="flex space-x-2 mt-4">
            <button onClick={resetGame} className="px-4 py-2 bg-gray-600 text-white rounded">
              Yeni Oyun
            </button>
            <button onClick={() => setGameStarted(false)} className="px-4 py-2 bg-red-600 text-white rounded">
              Ana Sayfaya Dön
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default XOXGame;
