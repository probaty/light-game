import React, { Component } from "react";
import "./Board.css";
import Cell from "./Cell";

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 1.4,
  };
  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(this.props.nRows, this.props.nCols),
      hasWon: false,
    };
  }
  randomLightsOnBoard() {
    return Math.floor(Math.random() * this.props.chanceLightStartsOn) > 0
      ? true
      : false;
  }
  createBoard(nRows, nCols) {
    let board = new Array(nRows);
    for (let i = 0; i < nRows; i++) {
      board[i] = new Array(nCols);
      for (let j = 0; j < nCols; j++) {
        board[i][j] = this.randomLightsOnBoard();
      }
    }
    return board;
  }
  fillBoard() {
    return this.state.board.map((row, idx) => (
      <tr key={idx}>
        {row.map((cell, idx2) => {
          const key = `${idx}-${idx2}`;
          return (
            <Cell
              key={key}
              cell={key}
              handle={this.flipLightsAround}
              isLight={cell}
            />
          );
        })}
      </tr>
    ));
  }
  restart = () => {
    this.setState({
      board: this.createBoard(this.props.nRows, this.props.nCols),
      hasWon: false,
    });
  };
  flipLightsAround = (key) => {
    const { nRows, nCols } = this.props;
    const [tableRow, tableCol] = key.split("-").map(Number);
    const newBoard = this.state.board;
    let newHasWon = true;

    const cells = getAroundCells(tableRow, tableCol);
    cells.forEach((cell) => {
      flipLight(cell[0], cell[1]);
    });

    newBoard.forEach((row) => {
      if (row.includes(true)) {
        newHasWon = false;
      }
    });
    this.setState({
      board: newBoard,
      hasWon: newHasWon,
    });

    function flipLight(row, col) {
      if (row >= 0 && row < nRows && col >= 0 && col < nCols) {
        newBoard[row][col] = !newBoard[row][col];
      }
    }
    function getAroundCells(row, col) {
      const aroundCells = [[row, col]];
      if (row - 1 >= 0) aroundCells.push([row - 1, col]);
      if (row + 1 < nRows) aroundCells.push([row + 1, col]);
      if (col - 1 >= 0) aroundCells.push([row, col - 1]);
      if (col + 1 < nCols) aroundCells.push([row, col + 1]);
      return aroundCells;
    }

    // console.log(newBoard);
  };
  render() {
    return !this.state.hasWon ? (
      <table>
        <tbody>{this.fillBoard()}</tbody>
      </table>
    ) : (
      <div className="won">
        You won <button onClick={this.restart}>Restart</button>
      </div>
    );
  }
}
export default Board;
