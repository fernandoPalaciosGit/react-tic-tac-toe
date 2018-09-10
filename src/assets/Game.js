import React from 'react';
import Board from './Board';
import {calculateWinner} from "../logic/calculateWinner";

const PLAYERS = {
    FIRST: 'X',
    SECOND: 'O',
};

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                matrix: Array(9).fill(null),
                player: PLAYERS.FIRST,
                winner: null,
            }],
            moveNumber: 0,
        };
    }

    getCurrentHistory() {
        let history = this.state.history;
        return history[this.state.moveNumber];
    }

    getHistoryProperty(property) {
        return this.getCurrentHistory()[property];
    }

    getHistoryListStatus() {
        return this.state.history.map((step, index) => {
            let move = index === 0 ? 'Go to game start' : `Go to move ${index + 1}`;
            let isLastMovement = this.state.history.length - 1 === index && this.getHistoryProperty('winner') !== null;

            return !isLastMovement && (
                <li key={'move-' + index}>
                    <button onClick={() => this.jumpToMove(index)}>{move}</button>
                </li>
            );
        });
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

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        matrix={this.getHistoryProperty('matrix')}
                        player={this.getHistoryProperty('player')}
                        winner={this.getHistoryProperty('winner')}
                        onClick={(squarePosition) => this.setSquareState(squarePosition)}
                    />
                </div>
                <div className="game-info">
                    <ol>{this.getHistoryListStatus()}</ol>
                </div>
            </div>
        );
    }
}
