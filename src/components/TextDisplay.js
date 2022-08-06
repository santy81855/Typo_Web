import '../styles/TextDisplay.css';

{/**/}

export default function TextDisplay() {
  return (
    <div className="TextDisplay">  
      {/*Needs to have a text box*/}
      <textarea className="TextDisplay" rows="3" cols="80" placeholder="Type here...\nType here...\nType here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here..."></textarea>
    </div>
  );
}