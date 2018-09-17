import React from "react";
import Square from './Square';

export default class Board extends React.Component {
    renderSquare(squarePosition) {
        return <Square
            index={this.props.matrix[squarePosition]}
            onClick={() => this.props.onClick(squarePosition)}
        />;
    }

    getStatusGame() {
        return this.props.winner === null ?
            `Next player: ${this.props.player}` :
            `Winner: ${this.props.winner}`;
    }

    getStatusMovement() {
        let hasToShowLastMovement = this.props.totalMovements - 1 === this.props.moveNumber && this.props.winner !== null;

        return this.props.moveNumber === 0 ? 'First movement' :
            hasToShowLastMovement ? 'Last Movement' : `Movement: ${this.props.moveNumber + 1}`;
    }

    getBoardGame() {
        return (
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

    render() {
        return (
            <div>
                <div className="status status--movement">{this.getStatusMovement()}</div>
                <div className="status status--game">{this.getStatusGame()}</div>
                {this.getBoardGame()}
            </div>
        );
    }
}
