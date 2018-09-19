import React from "react";
import Square from './Square';

export default class Board extends React.Component {
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

    renderBoardSquare(rowsDimension) {
        return this.props.dimension.map((squareIndex) => {
            let squarePosition = rowsDimension + squareIndex;

            return (
                <Square player={this.props.matrix[squarePosition]}
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
