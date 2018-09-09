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
        };
    }

    getCurrentHistory() {
        let history = this.state.history;
        return history[history.length - 1];
    }

    getHistoryProperty(property) {
        return this.getCurrentHistory()[property];
    }

    getHistoryListStatus() {
        return this.state.history.map((step, index) => {
            let move = index === 0 ? 'Go to game start' : `Go to move ${index + 1}`;
            let isLastMovement = this.state.history.length - 1 === index && this.getHistoryProperty('winner') !== null;

            return !isLastMovement && (
                <li>
                    <button onClick={() => this.jumpToMove(index)}>{move}</button>
                </li>
            );
        });
    }

    jumpToMove(index) {
    }

    getMatrix(index) {
        return this.getHistoryProperty('matrix').slice(0)
            .fill(this.getHistoryProperty('player'), index, index + 1);
    }

    getPlayer() {
        return this.getHistoryProperty('player') === PLAYERS.FIRST ? PLAYERS.SECOND : PLAYERS.FIRST;
    }

    setSquareState(index) {
        let newMatrixState = this.getMatrix(index);

        this.setState({
            history: this.state.history.concat({
                matrix: newMatrixState,
                player: this.getPlayer(),
                winner: calculateWinner(newMatrixState),
            })
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
                        onClick={(index) => this.setSquareState(index)}
                    />
                </div>
                <div className="game-info">
                    <ol>{this.getHistoryListStatus()}</ol>
                </div>
            </div>
        );
    }
}
