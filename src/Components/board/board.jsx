import React, { Component } from 'react';
import Square from "../square/square.jsx";
import BoardCSS from "./Board.css";

class Board extends React.Component {
	constructor(props) {
		super(props);
	}

	renderSquare(square) {

		return <Square
			key={"SquareX" + square.x + "Y" + square.y}
			id={"SquareX" + square.x + "Y" + square.y}
			value={square}
			clickFunction={this.props.clickFunction}
		/>;
  	}

	renderRow(currentRow, rowIndex) {

		let squares = [];

		currentRow.forEach((square) => {
			squares.push(this.renderSquare(square));
		});

		return (
			<div key={"BoardRow" + rowIndex} className={ BoardCSS.boardRow }>
				{squares}
			</div>
		);
	}

	render() {

		let rows = [];
		let index = 0;
		this.props.board.forEach((row) => {
			rows.push(this.renderRow(row, index++));
		});

		return (
			<div className="board">
				{rows}
			</div>
		);
	}
}

export default Board;