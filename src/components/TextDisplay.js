import React, { useState, useLayoutEffect, useRef } from "react";
import "../styles/TextDisplay.css";

{
    /**/
}

export default function TextDisplay() {
    const handleChange = (event) => {
        console.log(createColorWord("hello", "red").props.children);
        textBoxRef.current.value = "";
    };

    function createColorWord(text, color) {
        return <span style={{ color: color }}>{text}</span>;
    }

    const textBoxRef = useRef(null);

    const textBox = (
        <textarea
            ref={textBoxRef}
            type="text"
            autoFocus={true}
            onChange={handleChange}
            className="TextDisplay"
            id="textbox"
            rows="3"
            cols="50"
            placeholder="word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word "
        />
    );

    return (
        <div className="TextDisplay">
            {/*Needs to have a text box*/}
            <form>{textBox}</form>
        </div>
    );
}
