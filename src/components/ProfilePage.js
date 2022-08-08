import React, {
    useState,
    useLayoutEffect,
    useEffect,
    useRef,
    useContext,
} from "react";
import { AppContext } from "../App";
import { Colors } from "./Global";
import LoginPage from "./LoginPage";

export default function ProfilePage() {
    // here we import the states we have stored in the AppContext in the App.js file
    const { width, loggedIn, setLoggedIn } = useContext(AppContext);

    return (
        <div className="ProfilePage">
            {/*Display Log in (this will not show if logged in)*/}
            {loggedIn === false && <LoginPage />}
        </div>
    );
}
