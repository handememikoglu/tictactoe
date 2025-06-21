// components/Settings.jsx
import React from 'react';

const Settings = ({
  gameMode,
  setGameMode,
  playerSymbol,
  setPlayerSymbol,
  difficulty,
  setDifficulty,
  players,
  setPlayers,
  gridSize,
  setGridSize,
  onStart,
  setScores
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
    <h2 className="text-center text-2xl font-bold">Oyun Ayarları</h2>

    <div>
      <p className="font-medium mb-1">Oyun Modu:</p>
      <div className="flex space-x-2">
        <button
          onClick={() => setGameMode('twoPlayer')}
          className={`px-3 py-2 rounded ${
            gameMode === 'twoPlayer' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          2 Oyuncu
        </button>
        <button
          onClick={() => setGameMode('singlePlayer')}
          className={`px-3 py-2 rounded ${
            gameMode === 'singlePlayer' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          Tek Oyuncu
        </button>
      </div>
    </div>

    <div>
      <p className="font-medium mb-1">Tahta Boyutu:</p>
      <div className="flex space-x-2">
        <button
          onClick={() => setGridSize(3)}
          className={`px-3 py-2 rounded ${
            gridSize === 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          3 × 3
        </button>
        <button
          onClick={() => setGridSize(4)}
          className={`px-3 py-2 rounded ${
            gridSize === 4 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          4 × 4
        </button>
      </div>
    </div>

    {gameMode === 'singlePlayer' && (
      <>
        <div>
          <p className="font-medium mb-1">Sembol Seçimi:</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setPlayerSymbol('X')}
              className={`px-3 py-2 rounded ${
                playerSymbol === 'X' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              X
            </button>
            <button
              onClick={() => setPlayerSymbol('O')}
              className={`px-3 py-2 rounded ${
                playerSymbol === 'O' ? 'bg-red-500 text-white' : 'bg-gray-200'
              }`}
            >
              O
            </button>
          </div>
        </div>

        <div>
          <p className="font-medium mb-1">Zorluk:</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setDifficulty('easy')}
              className={`px-3 py-2 rounded ${
                difficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              Kolay
            </button>
            <button
              onClick={() => setDifficulty('hard')}
              className={`px-3 py-2 rounded ${
                difficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-200'
              }`}
            >
              Zor
            </button>
          </div>
        </div>
      </>
    )}

    <div>
      <input
        type="text"
        value={players.player1}
        onChange={e => setPlayers(prev => ({ ...prev, player1: e.target.value }))}
        placeholder="Oyuncu 1 ismi"
        className="w-full p-2 border rounded mb-2"
      />
      {gameMode === 'twoPlayer' ? (
        <input
          type="text"
          value={players.player2}
          onChange={e => setPlayers(prev => ({ ...prev, player2: e.target.value }))}
          placeholder="Oyuncu 2 ismi"
          className="w-full p-2 border rounded"
        />
      ) : (
        <input
          type="text"
          value="Bilgisayar"
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
      )}
    </div>

    <div className="flex space-x-2">
      <button
        onClick={() => {
          setPlayers({ player1: 'Oyuncu 1', player2: 'Oyuncu 2' });
          setScores({ X: 0, O: 0 });
        }}
        className="flex-1 py-2 bg-yellow-500 text-white rounded"
      >
        Sıfırla
      </button>
      <button onClick={onStart} className="flex-1 py-2 bg-green-500 text-white rounded">
        Başlat
      </button>
    </div>
  </div>
);

export default Settings;
