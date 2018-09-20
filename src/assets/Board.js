import React from "react";
import Square from './Square';

export default class Board extends React.Component {
    getStatusGame() {
        return this.props.winner === null ?
            `Next player: ${this.props.nextPlayer}` :
            `Winner: ${this.props.winner.player}`;
    }

    getStatusMovement() {
        let hasToShowLastMovement = this.props.totalMovements - 1 === this.props.moveNumber && this.props.winner !== null;

        return this.props.moveNumber === 0 ? 'First movement' :
            hasToShowLastMovement ? 'Last Movement' : `Movement: ${this.props.moveNumber + 1}`;
    }

    renderBoardSquare(rowsDimension) {
        return this.props.dimension.map((squareIndex) => {
            let squarePosition = rowsDimension + squareIndex;
            let player = this.props.matrix[squarePosition];

            return (
                <Square player={player}
                        highlighMove={this.props.winner === null && player === this.props.nextPlayer}
                        highlighWinner={this.props.winner !== null &&
                                        this.props.winner.line.indexOf(squarePosition) !== -1}
                        onClick={() => this.props.onClick(squarePosition)}/>
            );
        });
    }

    renderBoardRow() {
        return this.props.dimension.map((rowIndex) => {
            let rowDimension = rowIndex * this.props.dimension.length;

            return (
                <div className="board-row">{this.renderBoardSquare(rowDimension)}</div>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="status status--movement">{this.getStatusMovement()}</div>
                <div className="status status--game">{this.getStatusGame()}</div>
                {this.renderBoardRow()}
            </div>
        );
    }
}
