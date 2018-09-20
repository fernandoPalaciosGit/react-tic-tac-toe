import React from 'react';

export default function Square(props) {
    return (
        <button className={`square
                    ${props.highlighMove ? 'active' : ''}
                    ${props.highlighWinner ? 'winner' : ''}
                `}
                onClick={props.onClick}>
            {props.player}
        </button>
    );
};
