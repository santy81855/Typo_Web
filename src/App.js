import React, {
    useState,
    useLayoutEffect,
    useEffect,
    useRef,
    createContext,
} from "react";
import logo from "./logo.svg";
import "./styles/App.css";
import Menu from "./components/Menu";
import OptionsMenu from "./components/OptionsMenu";
import TextDisplay from "./components/TextDisplay";
import ProfilePage from "./components/ProfilePage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

// app context to access states from any component
export const AppContext = createContext(null);

function App() {
    // state to track window width
    const [width, setWindowWidth] = useState(window.innerWidth);
    const [page, setPage] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    // create a state for when the user is logged in
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("Login");
    const [menuWidth, setMenuWidth] = useState(0);
    const PassedStates = {
        width,
        page,
        setPage,
        loggedIn,
        setLoggedIn,
        isSigningUp,
        setIsSigningUp,
        user,
        setUser,
        username,
        setUsername,
        menuWidth,
        setMenuWidth,
    };

    useEffect(() => {
        console.log("page changed to " + page);
    }, [page]);

    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // function to set the current window width state
    const updateDimensions = () => {
        const width = window.innerWidth;
        console.log(width);
        setWindowWidth(width);
    };
    const textPage = (
        <div className="OptionsAndText">
            <OptionsMenu />
            <TextDisplay />
        </div>
    );
    return (
        <AppContext.Provider value={PassedStates}>
            <div className="App">
                <Menu />
                {/*Display text page if page state == 0*/}
                {page === 0 && textPage}
                {/*Display profile page if page state == 1*/}
                {page === 1 && <ProfilePage />}
            </div>
        </AppContext.Provider>
    );
}

export default App;
