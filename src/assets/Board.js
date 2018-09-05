import React from "react";
import Square from './Square';

export default class Board extends React.Component {
    static renderSquare(index) {
        return <Square index={index}/>;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {Board.renderSquare(0)}
                    {Board.renderSquare(1)}
                    {Board.renderSquare(2)}
                </div>
                <div className="board-row">
                    {Board.renderSquare(3)}
                    {Board.renderSquare(4)}
                    {Board.renderSquare(5)}
                </div>
                <div className="board-row">
                    {Board.renderSquare(6)}
                    {Board.renderSquare(7)}
                    {Board.renderSquare(8)}
                </div>
            </div>
        );
    }
}
