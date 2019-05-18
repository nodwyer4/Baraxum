import React, { Component } from 'react';
import { Square } from "./square/square.jsx";
import BoardCSS from "../CSS/Board.module.css";

import PropTypes from 'prop-types';


export class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    renderSquare(square) {
        let id = "SquareX" + square.x + "Y" + square.y;

        return <Square
            key={id}
            id={id}
            value={square}
            clickFunction={this.props.clickFunction}
        />
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

Board.propTypes = {
    board: PropTypes.array.isRequired,
    clickFunction: PropTypes.func.isRequired
}