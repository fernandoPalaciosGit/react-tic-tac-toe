import React from "react";
import Square from './Square';
import {calculateWinner} from '../logic/calculateWinner';

const PLAYERS = {
    FIRST: 'X',
    SECOND: 'O',
};

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: Array(9).fill(null),
            player: PLAYERS.FIRST,
            winner: null,
        }
    }

    getMatrix(index) {
        return this.state.matrix.slice(0)
            .fill(this.state.player, index, index + 1);
    }

    getPlayer() {
        return this.state.player === PLAYERS.FIRST ? PLAYERS.SECOND : PLAYERS.FIRST;
    }

    renderSquare(index) {
        return <Square
            index={this.state.matrix[index]}
            onClick={() => this.setSquareState(index)}
        />;
    }

    setSquareState(index) {
        let newMatrixState = this.getMatrix(index);

        this.setState({
            matrix: newMatrixState,
            player: this.getPlayer(),
            winner: calculateWinner(newMatrixState),
        });
    }

    getStatusGame() {
        return this.state.winner === null ?
            `Next player: ${this.state.player}` :
            `Winner: ${this.state.winner}`;
    }

    getBoardGame() {
        return this.state.winner === null && (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    getResetGame() {
        return (
            <div>
                <button onClick={alert}>reset game</button>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="status">{this.getStatusGame()}</div>
                {this.getBoardGame() || this.getResetGame()}
            </div>
        );
    }
}
