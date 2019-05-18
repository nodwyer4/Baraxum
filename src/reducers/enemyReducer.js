//import {  } from "../constants/ActionTypes";

const numGoblins = Math.floor((Math.random() * 30) + 1);
const height = Math.floor((Math.random() * 30) + 1);

function generateDefaultBoard(width, height) {

    let board = [];

    for (let x=0; x<height; x++) {
        board.push([]);
        for (let y=0; y<width; y++) {
            board[x].push({
                imageColor: "white",
                imageName: "blank",
                movementCost: 1,
                x,
                y
            })
        }
    }
    return board;
}

export const enemyReducer = (
    state = [],
    action
) => {
    switch(action.type) {
        default:
            return state
    }
};