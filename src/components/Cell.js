import React from "react";

const Cell = ({ value, onClick, isGameOver, isRevealed }) => {
    let displayValue;
    let classNames = "cell";

    if (value === 'mine') {
        if (isGameOver || isRevealed) {
            displayValue = '💣';
            classNames += ' mine';
        }
    } else {
        displayValue = value;
    }

    return (
        <div className={classNames} onClick={onClick}>
            {displayValue}
        </div>
    );
}

export default Cell;
