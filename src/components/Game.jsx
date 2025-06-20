import React, { useState, useEffect } from 'react';
import Settings from './Settings';
import { calculateWinner } from '../utils/calculateWinner';
import GameStatus from './GameStatus';
import GameBoard from './GameBoard';
import { getBestMove } from '../utils/minimax';

function XOXGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState('twoPlayer');
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [difficulty, setDifficulty] = useState('easy');
  const [players, setPlayers] = useState({ player1: 'Oyuncu 1', player2: 'Oyuncu 2' });
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const winner = calculateWinner(board);
  const isDraw = board.every(square => square !== null) && !winner;
  const currentPlayer = isXNext ? 'X' : 'O';

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Tic Tac Toe</h1>

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
          onStart={() => {
            setGameStarted(true);
            setBoard(Array(9).fill(null));
            setIsXNext(playerSymbol === 'O');
          }}
        />
      ) : (
        <>
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

          <button
            onClick={resetGame}
            className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Yeni Oyun
          </button>
          <button
            onClick={() => setGameStarted(false)}
            className="mt-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Ana Sayfaya Dön
          </button>
        </>
      )}
    </div>
  );
}

export default XOXGame;
