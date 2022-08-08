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
import "../styles/ProfilePage.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";

export default function ProfilePage() {
    // here we import the states we have stored in the AppContext in the App.js file
    const { width, loggedIn, setLoggedIn, user, setUser } =
        useContext(AppContext);

    // rerender the page anytime we switch the user state
    useEffect(() => {}, [user]);

    const LogOut = async () => {
        await signOut(auth);
        setUser(null);
    };

    // Greeting on the profile page
    const ProfileGreetingText = (
        <p className="ProfileGreetingText">
            {loggedIn === true && "Welcome, " + user.email}
        </p>
    );

    // logout button on profile
    const LogoutButtonText = <h3 className="LoginButtonText">Log Out</h3>;
    // create the log in button
    const LogoutButton = (
        <button type="button" onClick={LogOut} className="LoginButton">
            {LogoutButtonText}
        </button>
    );

    const ProfilePageDiv = (
        <div className="ProfilePageDiv">
            {ProfileGreetingText}
            {LogoutButton}
        </div>
    );

    return (
        <div className="ProfilePage">
            {/*Display Log in page if not logged in*/}
            {loggedIn === false && <LoginPage />}
            {/*Display profile page if logged in*/}
            {loggedIn === true && ProfilePageDiv}
        </div>
    );
}
