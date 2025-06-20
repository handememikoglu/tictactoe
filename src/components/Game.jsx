import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import GameStatus from './GameStatus';
import ScoreBoard from './ScoreBoard';
import Settings from './Settings';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { getBestMove } from '../utils/minimax';
import { calculateWinner } from '../utils/calculateWinner';

function XOXGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState('twoPlayer');
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [difficulty, setDifficulty] = useState('easy');
  const [players, setPlayers] = useState({ player1: 'Oyuncu 1', player2: 'Oyuncu 2' });
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const { width, height } = useWindowSize();
  const winner = calculateWinner(board);
  const isDraw = board.every(square => square !== null) && !winner;
  const currentPlayer = isXNext ? 'X' : 'O';
  const showConfetti = Boolean(winner);

  // Bilgisayar hamlesi
  useEffect(() => {
    const isComputerTurn =
      gameStarted &&
      gameMode === 'singlePlayer' &&
      ((playerSymbol === 'X' && !isXNext) || (playerSymbol === 'O' && isXNext)) &&
      !winner;

    if (isComputerTurn) {
      const timeout = setTimeout(() => {
        if (difficulty === 'easy') {
          makeRandomMove();
        } else {
          makeSmartMove();
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isXNext, board, gameStarted, gameMode, playerSymbol, winner, difficulty]);

  // Skor takibi
  useEffect(() => {
    if (winner) {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    }
  }, [winner]);

  const handleSquareClick = (i) => {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(prev => !prev);
  };

  const makeRandomMove = () => {
    const empty = board.map((val, i) => (val === null ? i : null)).filter(i => i !== null);
    if (empty.length === 0) return;
    const index = empty[Math.floor(Math.random() * empty.length)];
    const newBoard = [...board];
    newBoard[index] = playerSymbol === 'X' ? 'O' : 'X';
    setBoard(newBoard);
    setIsXNext(prev => !prev);
  };

  const makeSmartMove = () => {
    const computer = playerSymbol === 'X' ? 'O' : 'X';
    const player = playerSymbol;
    const best = getBestMove(board, computer, player);
    if (best.index !== undefined) {
      const newBoard = [...board];
      newBoard[best.index] = computer;
      setBoard(newBoard);
      setIsXNext(prev => !prev);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleStart = () => {
    // Bilgisayar için varsayılan isim
    const updatedPlayers = {
      ...players,
      player2: gameMode === 'singlePlayer' ? 'Bilgisayar' : players.player2
    };
    setPlayers(updatedPlayers);

    setBoard(Array(9).fill(null));
    setIsXNext(playerSymbol === 'O');
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">XOX Oyunu</h1>

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
          onStart={handleStart}
          setScores={setScores}
        />
      ) : (
        <>
          <ScoreBoard scores={scores} players={players} />

          <GameStatus
            winner={winner}
            isDraw={isDraw}
            currentPlayer={currentPlayer}
            playerSymbol={playerSymbol}
            gameMode={gameMode}
            players={players}
          />

          <GameBoard
            board={board}
            onSquareClick={handleSquareClick}
            isDisabled={
              winner || (gameMode === 'singlePlayer' &&
                ((playerSymbol === 'X' && !isXNext) || (playerSymbol === 'O' && isXNext)))
            }
          />

          <div className="flex space-x-4 mt-4">
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Yeni Oyun
            </button>
            <button
              onClick={() => setGameStarted(false)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default XOXGame;
