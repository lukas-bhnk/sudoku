// App.js
import React, { useState } from 'react';
import './index.css';
//test
const initialBoard = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9]
];
const isValidSudoku = (board) => {
  const isValid = (nums) => {
    const filtered = nums.filter(n => n !== null);
    return new Set(filtered).size === filtered.length;
  };

  for (let i = 0; i < 9; i++) {
    if (!isValid(board[i]) || !isValid(board.map(row => row[i]))) return false;

    const block = [];
    for (let r = Math.floor(i / 3) * 3; r < Math.floor(i / 3) * 3 + 3; r++) {
      for (let c = (i % 3) * 3; c < (i % 3) * 3 + 3; c++) {
        block.push(board[r][c]);
      }
    }
    if (!isValid(block)) return false;
  }
  return true;
};
const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isSolved, setIsSolved] = useState(false);

  const handleChange = (row, col, value) => {
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 9)) {
      const newBoard = board.map(r => r.slice());
      newBoard[row][col] = value === '' ? null : parseInt(value);
      setBoard(newBoard);
    }
  };

  const getBorderClass = (row, col) => {
    // Füge eine dickere Grenze für jedes 3x3-Untergitter hinzu
    const top = row % 3 === 0 ? 'border-t-2' : '';
    const bottom = row % 3 === 2 ? 'border-b-2' : '';
    const left = col % 3 === 0 ? 'border-l-2' : '';
    const right = col % 3 === 2 ? 'border-r-2' : '';
    return `${top} ${bottom} ${left} ${right}`;
  };

  return (
    <div className="App flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Sudoku</h1>
      <div className="sudoku-board grid grid-cols-9 border-4 border-gray-700">
        {board.flat().map((cell, index) => {
          const row = Math.floor(index / 9);
          const col = index % 9;
          return (
            <input
              key={index}
              type="text"
              value={cell || ''}
              onChange={(e) => handleChange(row, col, e.target.value)}
              className={`w-10 h-10 text-center ${getBorderClass(row, col)} border-gray-400 ${
                initialBoard[row][col] !== null ? 'bg-gray-300' : 'bg-white'
              }`}
              disabled={initialBoard[row][col] !== null}
            />
          );
        })}
      </div>
      <button
        onClick={() => setIsSolved(isValidSudoku(board))}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Check Solution
      </button>
      {isSolved ? (
        <p className="mt-4 text-green-500 font-semibold">Congratulations, you've solved it!</p>
      ) : (
        <p className="mt-4 text-red-500 font-semibold">Keep trying!</p>
      )}
    </div>
  );
};

export default App;
