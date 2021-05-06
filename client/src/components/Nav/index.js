import React from "react";
import "./style.css";

function Nav() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
                Rhythmic Masheeen
            </a>
            <audio
                src="./sounds/AstrudGilberto.mp3"
                crossOrigin="anonymous"
            ></audio>
            <button data-playing="false" role="switch" aria-checked="false">
                <span>Play/Pause</span>
            </button>
            <h4>Volume</h4>
            <input
                className="is-danger has-output"
                type="range"
                id="volume"
                min="0"
                max="2"
                defaultValue="1"
                step="0.01"
            ></input>
        </nav>
    );
}

export default Nav;
