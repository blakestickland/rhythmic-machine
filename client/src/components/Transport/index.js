import React from 'react';

const Transport = (props) => {
	let buttonText = props.playing ? 'Stop' : 'Play';
	return (
		<div className="transport">
			<button onClick={() => props.togglePlaying()}>{buttonText}</button>
			<div className="bpm">
				<label>BPM:</label>
				<input 
					type="range" 
					id="bpm" 
					min="45" 
					max="220" 
					step="1" 
					defaultValue={props.bpm} 
					onChange={props.handleChange} />
				<output>
					{ props.bpm }
				</output>
			</div>
		</div>			
	);
}

export default Transport;