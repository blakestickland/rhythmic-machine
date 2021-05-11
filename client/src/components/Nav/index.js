import React from "react";
import "./style.css";

function Nav() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
               <h1>RHYTHMIC MACHINE</h1> 
            </a>
            <a className="navbar-brand" href="/">
               <h2>percussion sequencer</h2> 
            </a>
        </nav>
    );
}

export default Nav;
