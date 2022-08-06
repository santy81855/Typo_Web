import React, { useState, useLayoutEffect, useRef } from "react";
import "../styles/TextDisplay.css";

{
    /**/
}

export default function TextDisplay() {
    const handleChange = (event) => {
        console.log("value is:", event.target.value);
        textBoxRef.current.value = event.target.value;
    };

    const textBoxRef = useRef(null);

    const textBox = (
        <textarea
            ref={textBoxRef}
            type="text"
            autoFocus={true}
            onChange={handleChange}
            className="TextDisplay"
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
