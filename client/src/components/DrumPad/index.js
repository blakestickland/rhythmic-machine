import React from 'react';

const DrumPad = (props) => (
    <div 
        className={"pad " + (props.state === 1 ? 'active' : '') + (props.pos === props.id ? ' playing' : '')}
        id = {"pad"+props.padNumber}
        onClick={() => props.toggleActive(props.rowIndex, props.id)}>
    </div>
);

export default DrumPad;