import React from 'react';

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <h3>Juego de 3 en ralla, por cortesia de "{this.props.owner}"</h3>
        );
    }
}
