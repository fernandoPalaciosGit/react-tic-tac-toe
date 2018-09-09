import React from "react";
import Square from './Square';

export default class Board extends React.Component {
    renderSquare(index) {
        return <Square
            index={this.props.matrix[index]}
            onClick={() => this.props.onClick(index)}
        />;
    }

    getStatusGame() {
        return this.props.winner === null ?
            `Next player: ${this.props.player}` :
            `Winner: ${this.props.winner}`;
    }

    getBoardGame() {
        return this.props.winner === null && (
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

    static getResetGame() {
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
                {this.getBoardGame() || Board.getResetGame()}
            </div>
        );
    }
}
