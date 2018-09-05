import React from 'react';
import _ from 'lodash';

class Square extends React.Component {
    render() {
        return (
            <button className="square"
            onClick={_.partial(alert, this.props.index)}>
                {this.props.index}
            </button>
        );
    }
}

export default Square;
