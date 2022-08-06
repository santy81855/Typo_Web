import "../styles/TextDisplay.css";

{
    /**/
}

export default function TextDisplay() {
    const handleChange = (event) => {
        console.log("value is:", event.target.value);
    };

    return (
        <div className="TextDisplay">
            {/*Needs to have a text box*/}
            <form>
                <textarea
                    type="text"
                    onChange={handleChange}
                    className="TextDisplay"
                    rows="3"
                    cols="50"
                    placeholder="Type here...\nType here...\nType here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here...Type here..."
                />
            </form>
        </div>
    );
}
