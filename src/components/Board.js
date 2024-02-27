import React from "react";
import Cell from './Cell';

const Board = ({ board, onCellClick, isGameOver, revealedCells }) => {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <Cell 
                            key={`${rowIndex}-${colIndex}`} 
                            value={cell} 
                            onClick={() => onCellClick(rowIndex, colIndex)}
                            isGameOver={isGameOver}
                            isRevealed={revealedCells[rowIndex][colIndex]}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
