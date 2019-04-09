import React, { Component } from 'react';
import './App.css';
import Board from "./Components/board/board.jsx";
import PriorityQueue from "./priorityQueue.js";
import lodash from 'lodash';
import moment from "moment";


class App extends Component {

    constructor(props) {
        super(props);

        let board = [];

        for ( let x=0; x<props.rows; x++ ) {
            board.push([]);
            for ( let y=0; y<props.columns; y++ ) {
                board[x].push({
                    "imageColor": "white",
                    "imageName": "blank",
                    "movementCost": 1,
                    "x": x,
                    "y": y
                });
            }
        }

        board[0][0] = {
            "imageColor": "white",
            "imageName": "target",
            "movementCost": 1,
            "x": 0,
            "y": 0
        };


        board [5][5] = {
            "imageColor": "white",
            "imageName": "stump",
            "movementCost": false,
            "x": 5,
            "y": 5
        };

        board [4][6] = {
            "imageColor": "white",
            "imageName": "stump",
            "movementCost": false,
            "x": 4,
            "y": 6
        };

        board [6][4] = {
            "imageColor": "white",
            "imageName": "stump",
            "movementCost": false,
            "x": 6,
            "y": 4
        };


        board [7][3] = {
            "imageColor": "white",
            "imageName": "stump",
            "movementCost": false,
            "x": 6,
            "y": 4
        };

        board [3][7] = {
            "imageColor": "white",
            "imageName": "stump",
            "movementCost": false,
            "x": 6,
            "y": 4
        };
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                board [i][7+j] = {
                    "imageColor": "white",
                    "imageName": "swamp",
                    "movementCost": 3,
                    "x": i,
                    "y": 7+j
                };
            }
        }


        /*for (let i=0; i<8; i++) {
            board [7][i] = {
                "imageColor": "white",
                "imageName": "stump",
                "movementCost": false,
                "x": 7,
                "y": i
            };

            board [9][i] = {
                "imageColor": "white",
                "imageName": "stump",
                "movementCost": false,
                "x": 9,
                "y": i
            };
        }*/

        this.state = {
            "targets": [
                {
                    "x": 0,
                    "y": 0
                }
            ],
            "board": board
        };

        this.moveGoblins = this.moveGoblins.bind(this);
        this.createGoblin = this.createGoblin.bind(this);
        this.getNeighbors = this.getNeighbors.bind(this);
    }



    moveGoblins() {

        let goblins = [];
        let newGoblins = [];
        let board = Object.assign([], this.state.board);


        for ( let x=0; x<this.props.rows; x++ ) {
            for ( let y=0; y<this.props.columns; y++ ) {
                if (this.state.board[x][y].imageName === "goblin") {
                    goblins.push(
                        {
                            "x": x,
                            "y": y
                        }
                    )
                }
            }
        }

        for (let i=0;i<goblins.length;i++) {

            let x = goblins[i].x;
            let y = goblins[i].y;


            let neighbors = this.getNeighbors(goblins[i]);
            let atTarget=false;
            Object.keys(neighbors).forEach( (key, index) => {
                let currentNeighbor = neighbors[key];

                if ( currentNeighbor.x === this.state.targets[0].x && currentNeighbor.y === this.state.targets[0].y ) {
                    atTarget = true;
                    goblins = goblins.slice(0, i).concat(goblins.slice(i+1));
                    i--;
                }

            });

            if (! atTarget) {
                let newGoblinPos = this.AStar(
                    this.state.board[ x ][ y ],
                    this.state.board[ this.state.targets[0].x ][ this.state.targets[0].y ]
                );

                //if unable to find path don't move
                if (newGoblinPos === false) {
                    newGoblins.push({"x": x, "y": y});
                } else {
                    newGoblins.push(newGoblinPos);
                }
            } else {
                board[x][y].imageName = "blank";
            }

        }

        for (let i=0;i<goblins.length;i++) {
        	board[goblins[i].x][goblins[i].y].imageName = "blank";
            board[newGoblins[i].x][newGoblins[i].y].imageName = "goblin";
        }
        this.setState({board: board});

    }


    AStar(from, to) {

        let start = new moment();

        from = lodash.cloneDeep(from);
        to = lodash.cloneDeep(to);

        let frontier = new PriorityQueue(function(a, b) {
			return a.priority < b.priority;
		});

        from.priority = 0;

        frontier.push(from);

        let cameFrom = {};
        let costSoFar = {};
        cameFrom[0] = false;
        let originalNodeId = "X" + from.x + "Y" + from.y;
        costSoFar[originalNodeId] = 0;

        let attempts = 0;

        while ( frontier.length !== 0 ) {

        	if (attempts++ > 20000) {
        		return false;
			}

            let current = frontier.pop();
        	if (current === undefined ) {
        	    return false;
            }
            let currentId = "X" + current.x + "Y" + current.y;

            if ( current.x === to.x && current.y === to.y ) {
                break;
            }

            let neighbors = this.getMoveableNeighbors(current);

            Object.keys(neighbors).forEach( (key, index) => {
                let currentNeighbor = neighbors[key];

                let neighborKey = "X" + currentNeighbor.x + "Y" + currentNeighbor.y;

                let newCost = costSoFar[currentId] + currentNeighbor.movementCost;

                //if you dont already have a cost, or the new cost is smaller than the current cost, use this path
                if ( costSoFar[neighborKey] === undefined || newCost < costSoFar[neighborKey] ) {

                    //set cost to access this tile to be newCost
                    costSoFar[neighborKey] = newCost;

                    //the next tile to check should be prioritised by how close you are to it
                    currentNeighbor.priority = newCost + this.determineDistanceBetweenTiles(to, currentNeighbor);

                    //Adding a new element to the queue so we can keep going towards the end
                    frontier.push(currentNeighbor);

                    //tells us the easiest way to get to this tile
                    cameFrom[neighborKey] = current;

                }

            });

        }

        let tileToMoveTo = cameFrom[ `X${to.x}Y${to.y}` ];
        let prevTile = tileToMoveTo;

        while ( cameFrom[ `X${tileToMoveTo.x}Y${tileToMoveTo.y}` ] !== undefined ) {
            prevTile = tileToMoveTo;
            tileToMoveTo = cameFrom[`X${tileToMoveTo.x}Y${tileToMoveTo.y}`];
        }

        let finish = new moment();
        let timeTaken = finish.diff(start);

        console.log("A Star took: " + timeTaken + " ms");

        return(prevTile);

    }

    getNeighbors(position) {

        let neighbors = {};
        let x = parseInt(position.x);
        let y = parseInt(position.y);

        if ( x - 1 >= 0 ) {
            neighbors.left = this.state.board[x-1][y];
        }
        if ( x + 1 < this.props.columns ) {
            neighbors.right = this.state.board[x+1][y];
        }
        if ( y - 1 >= 0 ) {
            neighbors.top = this.state.board[x][y-1];
        }
        if ( y + 1 < this.props.rows ) {
            neighbors.bottom = this.state.board[x][y+1];
        }

        return lodash.cloneDeep(neighbors);

    }

    getMoveableNeighbors(position) {

        let neighbors = {};
        let x = parseInt(position.x);
        let y = parseInt(position.y);

        if ( x - 1 >= 0 && this.state.board[x-1][y].movementCost !== false) {
            neighbors.left = this.state.board[x-1][y];
        }
        if ( x + 1 < this.props.columns && this.state.board[x+1][y].movementCost !== false ) {
            neighbors.right = this.state.board[x+1][y];
        }
        if ( y - 1 >= 0  && this.state.board[x][y-1].movementCost !== false) {
            neighbors.top = this.state.board[x][y-1];
        }
        if ( y + 1 < this.props.rows  && this.state.board[x][y+1].movementCost !== false) {
            neighbors.bottom = this.state.board[x][y+1];
        }

        return lodash.cloneDeep(neighbors);

    }

    determineDistanceBetweenTiles(pos1, pos2) {
        let xDistance = Math.pow((pos1.x - pos2.x), 2);
        let yDistance = Math.pow((pos1.y - pos2.y), 2);
        return Math.sqrt(xDistance + yDistance);
    }

    getSum(total, num) {
        return total + num;
    }

    roll10() {
        return Math.floor((Math.random() * 10) + 1);
    }

    roll100() {
        return Math.floor((Math.random() * 100) + 1);
    }

    createGoblin(x, y) {

        let tempState = Object.assign({}, this.state, {});

        console.log("X: " + x);
        console.log("Y: " + y);

        tempState.board[x][y].imageName = "goblin";

        console.log(tempState);

        this.setState(tempState);
    }

    render() {
        return (
            <div>
                <Board
                    columns={this.props.columns}
                    rows={this.props.columns}
                    board={this.state.board}
                    clickFunction={this.createGoblin}
                />
                <button onClick={this.moveGoblins}>End Turn</button>
            </div>
        );
    }



}

export default App;
