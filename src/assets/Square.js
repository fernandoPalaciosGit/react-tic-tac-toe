import React from 'react';

class Square extends React.Component {
    render() {
        return (
            <button className="square"
                    onClick={() => alert(this.props.index)}>
                {this.props.index}
            </button>
        );
    }
}

export default Square;
