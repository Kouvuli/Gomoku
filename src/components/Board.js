import React from "react";
import Square from "./Square";

const Board = ({ squares, winner, onClick, current }) => {
  const currIndexArr = current.moveLocation.split(", ");
  const currentIndex =
    (parseInt(currIndexArr[0]) - 1) * Math.sqrt(squares.length) +
    parseInt(currIndexArr[1]) -
    1;

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        winner={winner && winner.includes(i) ? "winner" : ""}
        // last={last ?"last":""}
        last={i === currentIndex ? "last" : ""}
      />
    );
  };
  const renderBoard = () => {
    const rowsWidth = Array(Math.sqrt(squares.length) + 0).fill(null);
    const celsWidth = rowsWidth;
    const board = rowsWidth.map((row, i) => {
      const squares = celsWidth.map((cel, j) => {
        const squareIndex = i * rowsWidth.length + j;
        return <span key={squareIndex}>{renderSquare(squareIndex)}</span>;
      });
      return <div key={i}>{squares}</div>;
    });
    return board;
  };
  const board = renderBoard();
  return <div>{board}</div>;
};

export default Board;
