import React, { useState, useEffect } from "react";
import Board from './Board';

const createEmptyBoard = (rows, cols, initialValue = null) => {
    return Array.from({ length: rows }, () => Array(cols).fill(initialValue));
}

const generateMines = (rows, cols, mines) => {
    const board = createEmptyBoard(rows, cols);
    let minesCount = 0;
    while (minesCount < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (board[row][col] !== 'mine') {
            board[row][col] = 'mine';
            minesCount++;
        }
    }
    return board;
}

const calculateNeighbourMines = (board, row, col) => {
    const neighbours = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    let minesCount = 0;
    neighbours.forEach(([offsetRow, offsetCol]) => {
        const newRow = row + offsetRow;
        const newCol = col + offsetCol;
        if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
            if (board[newRow][newCol] === 'mine') {
                minesCount++;
            }
        }
    });
    return minesCount;
}

const Game = ({ rows, cols, mines }) => {
    const [board, setBoard] = useState(createEmptyBoard(rows, cols));
    const [isGameOver, setIsGameOver] = useState(false);
    const [revealedCells, setRevealedCells] = useState(createEmptyBoard(rows, cols, false));
    const [gameStatus, setGameStatus] = useState('');

    const handleCellClick = (row, col) => {
        if (isGameOver || revealedCells[row][col]) {
            return;
        }

        const newRevealedCells = [...revealedCells.map(row => [...row])];
        newRevealedCells[row][col] = true;

        const newBoard = [...board.map(row => [...row])];
        if (newBoard[row][col] === 'mine') {
            setIsGameOver(true);
            setGameStatus('You catch a bomb. Sorry but you lose!:(');
        } else {
            const neighbourMines = calculateNeighbourMines(newBoard, row, col);
            newBoard[row][col] = neighbourMines;
            if (neighbourMines === 0) {
                // Тут захочешь допишешь логику открытия доп клеточек, по типу нажала на одну, а открылись еще три или четыре или больше
            }
        }
        setRevealedCells(newRevealedCells);
        setBoard(newBoard);
    };

    useEffect(() => {
        setBoard(generateMines(rows, cols, mines));
    }, [rows, cols, mines]);

    return (
        <div className="game">
            <Board board={board} onCellClick={handleCellClick} isGameOver={isGameOver} revealedCells={revealedCells} />
            {isGameOver && <div className="game-over">{gameStatus}</div>}
        </div>
    );
}

export default Game;