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
  onStart,
  setScores
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Oyun Ayarları</h2>

      <div className="mb-4">
        <p className="text-gray-600 mb-2 font-medium">Oyun Modu:</p>
        <div className="flex space-x-4">
          <button
            onClick={() => setGameMode('twoPlayer')}
            className={`px-4 py-2 rounded-lg font-medium transition
              ${gameMode === 'twoPlayer' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            2 Oyuncu
          </button>
          <button
            onClick={() => setGameMode('singlePlayer')}
            className={`px-4 py-2 rounded-lg font-medium transition
              ${gameMode === 'singlePlayer' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Tek Oyuncu
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 mb-2 font-medium">Oyuncu İsimleri:</p>
        <input
          type="text"
          value={players.player1}
          onChange={(e) => setPlayers(prev => ({ ...prev, player1: e.target.value }))}
          className="w-full mb-2 p-2 rounded border"
          placeholder="X oyuncusu"
        />
        
        {gameMode === 'twoPlayer' ? (
            <>
                <input
                type="text"
                value={players.player2}
                onChange={(e) => setPlayers(prev => ({ ...prev, player2: e.target.value }))}
                className="w-full p-2 rounded border mb-4"
                placeholder="O oyuncusu"
              />
              <button
                onClick={() => {
                  setPlayers({ player1: 'Oyuncu 1', player2: 'Oyuncu 2' });
                  setScores({ X: 0, O: 0 });
                }}
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
              >
                Sıfırla
              </button>
            </>
          
        ) : (
          <input
            type="text"
            value={players.player2}
            onChange={(e) => setPlayers(prev => ({ ...prev, player2: e.target.value }))}
            className="w-full p-2 rounded border bg-gray-100"
            readOnly
            placeholder="Bilgisayar"
          />
        )}
      </div>

      {/* Sembol seçimi */}
      {gameMode === 'singlePlayer' && (
        <div className="mb-4">
          <p className="text-gray-600 mb-2 font-medium">Sembol Seç:</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setPlayerSymbol('X')}
              className={`w-16 h-16 text-2xl rounded-lg transition
                ${playerSymbol === 'X' ? 'bg-blue-200 text-blue-700 border border-blue-400' : 'bg-gray-100'}`}
            >
              X
            </button>
            <button
              onClick={() => setPlayerSymbol('O')}
              className={`w-16 h-16 text-2xl rounded-lg transition
                ${playerSymbol === 'O' ? 'bg-red-200 text-red-700 border border-red-400' : 'bg-gray-100'}`}
            >
              O
            </button>
          </div>
        </div>
      )}

      {/* Zorluk seçimi */}
      {gameMode === 'singlePlayer' && (
        <div className="mb-6">
          <p className="text-gray-600 mb-2 font-medium">Zorluk:</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setDifficulty('easy')}
              className={`px-4 py-2 rounded-lg font-medium transition
                ${difficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Kolay
            </button>
            <button
              onClick={() => setDifficulty('hard')}
              className={`px-4 py-2 rounded-lg font-medium transition
                ${difficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Zor
            </button>
          </div>
        </div>
      )}

      {/* Başlat */}
      <button
        onClick={onStart}
        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
      >
        Oyunu Başlat
      </button>
    </div>
  );
};

export default Settings;
