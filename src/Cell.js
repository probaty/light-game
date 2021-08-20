import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  handleFlipAround = () => {
    this.props.handle(this.props.cell);
  };

  render() {
    return (
      <td
        onClick={this.handleFlipAround}
        className={`Cell ${this.props.isLight ? "light" : ""}`}
      ></td>
    );
  }
}

export default Cell;
