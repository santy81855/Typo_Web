import React, { useState, useLayoutEffect, useRef } from "react";
import "../styles/OptionsMenu.css";
import { Colors } from "../components/Global";

{
    /**/
}

export default function Menu() {
    // variable to store the colors we are using based on the theme
    // useState for which mode we are on (words or time)
    const [testType, setTestType] = useState("words");
    // useState for the active suboption
    const [activeSub, setActiveSub] = useState(0);
    // store the active option
    const [activeOptionRef, setActiveOptionRef] = useState(null);
    // store the active suboption
    const [activeSubRef, setActiveSubRef] = useState(null);
    // create useRef for each button in options menu
    const wordButtonRef = useRef(null);
    const timeButtonRef = useRef(null);
    // create useRef for each button in the suboptions menu
    const word1 = useRef(null);
    const word2 = useRef(null);
    const word3 = useRef(null);
    const word4 = useRef(null);
    const time1 = useRef(null);
    const time2 = useRef(null);
    const time3 = useRef(null);
    const time4 = useRef(null);

    // create a useLayoutEffect to change the active button when we change testType
    useLayoutEffect(() => {
        // set the active suboption to 0
        setActiveSub(0);
        if (testType == "words") {
            setActiveOption(wordButtonRef, timeButtonRef);
            setActiveOptionRef(wordButtonRef);
            setActiveSuboption(word1, word2, word3, word4, 0);
            setActiveSubRef(word1);
        } else {
            setActiveOption(timeButtonRef, wordButtonRef);
            setActiveOptionRef(timeButtonRef);
            setActiveSuboption(time1, time2, time3, time4, 0);
            setActiveSubRef(time1);
        }
    }, [testType]);

    // create a useLayoutEffect to highlight the correct suboption button when we change activeSub
    useLayoutEffect(() => {
        if (testType == "words") {
            setActiveSuboption(word1, word2, word3, word4, activeSub);
        } else {
            setActiveSuboption(time1, time2, time3, time4, activeSub);
        }
    }, [activeSub]);

    const wordButton = (
        <button
            ref={wordButtonRef}
            onClick={() => setTestType("words")}
            onMouseOver={() => hoverEnter(wordButtonRef)}
            onMouseOut={() => hoverExit(wordButtonRef)}
            type="button"
            className="WordOption"
            id="words"
        >
            words
        </button>
    );

    const timeButton = (
        <button
            ref={timeButtonRef}
            onClick={() => setTestType("time")}
            onMouseOver={() => hoverEnter(timeButtonRef)}
            onMouseOut={() => hoverExit(timeButtonRef)}
            type="button"
            className="TimeOption"
            id="time"
        >
            time
        </button>
    );

    /* create array of buttons */
    const wordSuboptions = [
        <button
            ref={word1}
            type="button"
            className="SubOption"
            onClick={() => setActiveSub(0)}
            onMouseOver={() => hoverEnter(word1)}
            onMouseOut={() => hoverExit(word1)}
        >
            10
        </button>,
        <button
            ref={word2}
            type="button"
            className="SubOption"
            onClick={() => setActiveSub(1)}
            onMouseOver={() => hoverEnter(word2)}
            onMouseOut={() => hoverExit(word2)}
        >
            25
        </button>,
        <button
            ref={word3}
            type="button"
            className="SubOption"
            onClick={() => setActiveSub(2)}
            onMouseOver={() => hoverEnter(word3)}
            onMouseOut={() => hoverExit(word3)}
        >
            50
        </button>,
        <button
            ref={word4}
            type="button"
            className="SubOption"
            onClick={() => setActiveSub(3)}
            onMouseOver={() => hoverEnter(word4)}
            onMouseOut={() => hoverExit(word4)}
        >
            100
        </button>,
    ];

    const timeSuboptions = [
        <button
            ref={time1}
            type="button"
            className="SubOption"
            onClick={() => setActiveSub(0)}
            onMouseOver={() => hoverEnter(time1)}
            onMouseOut={() => hoverExit(time1)}
        >
            15
        </button>,
        <button
            ref={time2}
            type="button"
            className="SubOption"
            onClick={() => setActiveSub(1)}
            onMouseOver={() => hoverEnter(time2)}
            onMouseOut={() => hoverExit(time2)}
        >
            30
        </button>,
        <button
            ref={time3}
            type="button"
            className="SubOption"
            onClick={() => setActiveSub(2)}
            onMouseOver={() => hoverEnter(time3)}
            onMouseOut={() => hoverExit(time3)}
        >
            60
        </button>,
        <button
            ref={time4}
            type="button"
            className="SubOption"
            onClick={() => setActiveSub(3)}
            onMouseOver={() => hoverEnter(time4)}
            onMouseOut={() => hoverExit(time4)}
        >
            120
        </button>,
    ];

    // toggles the correct option (words or time) to be active based on which was clicked
    function setActiveOption(active, inactive) {
        active.current.style.color = Colors.highlight;
        inactive.current.style.color = Colors.accent;
    }

    // function to set the active suboption based on which was clicked
    // the last item in the arguments is an integer marking the index of the active suboption
    function setActiveSuboption(...buttons) {
        console.log(activeSub);
        var index = buttons[buttons.length - 1];
        for (var i = 0; i < buttons.length - 1; i++) {
            if (i == index) {
                buttons[i].current.style.color = Colors.highlight;
                setActiveSubRef(buttons[i]);
            } else {
                buttons[i].current.style.color = Colors.accent;
            }
        }
    }

    // this is the function that needs to change the text display
    function changeText() {
        console.log(activeSub);
    }

    function hoverEnter(button) {
        button.current.style.color = Colors.highlight;
    }

    function hoverExit(button) {
        if (button != activeOptionRef && button != activeSubRef) {
            button.current.style.color = Colors.accent;
        }
    }

    return (
        <div className="OptionsMenu">
            {/*Div to hold the top row*/}
            <div className="TopRow">
                {/*Add the two options (time) (words)*/}
                {wordButton}
                {timeButton}
            </div>

            {/*Div to hold the bottom row*/}
            <div className="BottomRow">
                {testType === "words" && wordSuboptions}
                {testType === "time" && timeSuboptions}
            </div>
        </div>
    );
}
