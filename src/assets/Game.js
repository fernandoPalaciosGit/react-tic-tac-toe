import React from 'react';
import Board from './Board';
import {calculateWinner} from "../logic/calculateWinner";
import _ from 'lodash';

const PLAYERS = {
    FIRST: 'X',
    SECOND: 'O',
};

// todo: cuando hay un empate, notificarlo.

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                matrix: Array(9).fill(null),
                player: PLAYERS.FIRST,
                winner: null,
            }],
            orderMovementsAsc: true,
            moveNumber: 0,
            dimension: _.range(3)
        };
    }

    getCurrentHistory() {
        let history = this.state.history;
        return history[this.state.moveNumber];
    }

    getHistoryProperty(property) {
        return this.getCurrentHistory()[property];
    }

    getPlayersPosition(matrix, player) {
        return matrix.map(function(val, index) {
            return player === val ? index + 1 : null;
        }).filter(function(val) {
            return val !== null;
        });
    }

    getHistoryMovements() {
        let historyLength = this.state.history.length;
        let listOfMovements = this.state.history.map((step, index) => {
            let isLastStep = historyLength - 1 === index;
            let hasWinnerGame = step.winner !== null;
            let hasToShowLastMovement = isLastStep && hasWinnerGame;
            let move = index === 0 ? 'Go to game start' :
                hasToShowLastMovement ? `Last movement` : `Go to move ${index + 1}`;

            return (
                <li key={'move-' + index}>
                    <button onClick={() => this.jumpToMove(index)}>{move}</button>
                    {this.getHistoryPlayersPosition(step.matrix, index)}
                </li>
            );
        });

        return this.state.orderMovementsAsc ? listOfMovements : listOfMovements.reverse();
    }

    getHistoryPlayersPosition(matrix, index) {
        return index !== 0 && (
            <span>
                <strong> Player positions --> </strong>
                <span>{PLAYERS.FIRST} : ({this.getPlayersPosition(matrix, PLAYERS.FIRST).join('-')})</span>
                <strong>, </strong>
                <span>{PLAYERS.SECOND} : ({this.getPlayersPosition(matrix, PLAYERS.SECOND).join('-')})</span>
            </span>
        );
    }

    jumpToMove(indexMove) {
        this.setState({
            moveNumber: indexMove,
        });
    }

    getMatrix(index) {
        return this.getHistoryProperty('matrix').slice(0)
            .fill(this.getHistoryProperty('player'), index, index + 1);
    }

    getHistory() {
        return this.state.history.slice(0, this.state.moveNumber + 1);
    }

    getNextPlayer() {
        return this.getHistoryProperty('player') === PLAYERS.FIRST ? PLAYERS.SECOND : PLAYERS.FIRST;
    }

    checkSquareState(squarePosition) {
        if (this.getHistoryProperty('matrix')[squarePosition] === null && this.getHistoryProperty('winner') === null) {
            this.setSquareState(squarePosition)
        }
    }

    setSquareState(squarePosition) {
        let newMatrixState = this.getMatrix(squarePosition);
        let newHistory = this.getHistory();

        this.setState({
            history: newHistory.concat({
                matrix: newMatrixState,
                player: this.getNextPlayer(),
                winner: calculateWinner(newMatrixState),
            }),
            moveNumber: newHistory.length,
        })
    }

    setOrderedList() {
        this.setState({
            orderMovementsAsc: !this.state.orderMovementsAsc,
        });
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        matrix={this.getHistoryProperty('matrix')}
                        nextPlayer={this.getHistoryProperty('player')}
                        winner={this.getHistoryProperty('winner')}
                        moveNumber={this.state.moveNumber}
                        totalMovements={this.state.history.length}
                        dimension={this.state.dimension}
                        onClick={(squarePosition) => this.checkSquareState(squarePosition)}
                    />
                </div>
                <div className="game-info">
                    <a className="" href="#"
                       onClick={() => this.setOrderedList()}
                    >Order list {this.state.orderMovementsAsc ? 'Descending' : 'Ascending'}</a>
                    <ul>{this.getHistoryMovements()}</ul>
                </div>
            </div>
        );
    }
}
