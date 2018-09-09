import React from "react";
import Square from './Square';

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
        this.setState({
            matrix: this.getMatrix(index),
            player: this.getPlayer(),
        });
    }

    render() {
        const status = `Next player: ${this.state.player}`;

        return (
            <div>
                <div className="status">{status}</div>
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
}
