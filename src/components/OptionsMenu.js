import React, {useState} from "react";
import '../styles/OptionsMenu.css';
import '../styles/global.css';

{/**/}

export default function Menu() {

  const [active, setActive] = useState("words");
  const Colors = {
    background: "#121e26",
    accent: "#f4efeb",
    highlight: "#8FBCBB",
  };

  var activeSuboption = 0;

  const wordButton = <button onMouseDown={wordsClicked} onMouseUp={optionReleased} onMouseOver={wordsHoverEntered} onMouseOut={wordsHoverExit} type="button" className="WordOption" id="words">
  words
  </button>;

  const timeButton = <button onMouseDown={timeClicked} onMouseUp={optionReleased} onMouseOver={timeHoverEntered} onMouseOut={timeHoverExit} type="button" className="TimeOption" id="time">
  time
  </button>;

  /* create array of buttons */
  const wordSuboptions = [
  <button type="button" className="SubOption" onClick={() => suboptionClicked(0)} onMouseOver={() => suboptionHoverEnter(0)} onMouseOut={() => suboptionHoverExit(0)}>
  10
  </button>,
  <button type="button" className="SubOption" onClick={() => suboptionClicked(1)} onMouseOver={() => suboptionHoverEnter(1)} onMouseOut={() => suboptionHoverExit(1)}>
  25
  </button>,
  <button type="button" className="SubOption" onClick={() => suboptionClicked(2)} onMouseOver={() => suboptionHoverEnter(2)} onMouseOut={() => suboptionHoverExit(2)}>
  50
  </button>
  ,
  <button type="button" className="SubOption" onClick={() => suboptionClicked(3)} onMouseOver={() => suboptionHoverEnter(3)} onMouseOut={() => suboptionHoverExit(3)}>
  100
  </button>
  ];

  const timeSuboptions = 
  [
    <button type="button" className="SubOption" onClick={() => suboptionClicked(0)} onMouseOver={() => suboptionHoverEnter(0)} onMouseOut={() => suboptionHoverExit(0)}>
  15
  </button>
  ,
  <button type="button" className="SubOption" onClick={() => suboptionClicked(1)} onMouseOver={() => suboptionHoverEnter(1)} onMouseOut={() => suboptionHoverExit(1)}>
  30
  </button>
  ,
  <button type="button" className="SubOption" onClick={() => suboptionClicked(2)} onMouseOver={() => suboptionHoverEnter(2)} onMouseOut={() => suboptionHoverExit(2)}>
  60
  </button>
  ,
  <button type="button" className="SubOption" onClick={() => suboptionClicked(3)} onMouseOver={() => suboptionHoverEnter(3)} onMouseOut={() => suboptionHoverExit(3)}>
  120
  </button>
];

  // this is the function that needs to change the text display
  function changeText() {
    console.log(activeSuboption);
  }

  function suboptionClicked(e) {
    var i = 0;
    var list = document.getElementsByClassName("SubOption");
    for (const button of list) {
      // this is the one that we need to put in the active state
      if (i === e) {
        button.style.color = Colors.highlight;
        activeSuboption = i;
        changeText()
      } else {
        button.style.color = Colors.accent;
      }
      i++;
    }

  }

  function suboptionHoverEnter(e) {
    var list = document.getElementsByClassName("SubOption");
    if (list[e] !== list[activeSuboption]) {
      list[e].style.color = Colors.highlight;
    }
    
  }

  function suboptionHoverExit(e) {
    var list = document.getElementsByClassName("SubOption");
    if (list[e] !== list[activeSuboption]) {
      list[e].style.color = Colors.accent;
    }
  }

  function wordsHoverEntered() {
    var button1 = document.getElementById("words");
    if (active === "time")
    {
      button1.style.color = Colors.highlight;
    }
  }

  function wordsHoverExit() {
    var button1 = document.getElementById("words");
    if (active === "time")
    {
      button1.style.color = Colors.accent;
    }
  }

  function timeHoverEntered() {
    var button1 = document.getElementById("time");
    if (active === "words")
    {
      button1.style.color = Colors.highlight;
    }
  }

  function timeHoverExit() {
    var button1 = document.getElementById("time");
    if (active === "words")
    {
      button1.style.color = Colors.accent;
    }
  }

  function wordsClicked() {
    var button1 = document.getElementById("words");
    button1.style.color = Colors.highlight;
    var button2 = document.getElementById("time");
    button2.style.color = Colors.accent;
    setActive("words");
  }

  function optionReleased() {
    // get the list of the current suboptions
    var list = document.getElementsByClassName("SubOption");
    // select the first one
    list[0].style.color = Colors.highlight;
    // uncolor the rest
    for (let i = 1; i < list.length; i++) {
      list[i].style.color = Colors.accent;
    }
  }

  function timeClicked() {
    document.getElementById("time").style.color = Colors.highlight;
    document.getElementById("words").style.color = Colors.accent;
    setActive("time");
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
      {active === "words" && wordSuboptions}
      {active === "time" && timeSuboptions}      
    </div>
    
    </div>
  );
}