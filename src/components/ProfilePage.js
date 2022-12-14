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
    const {
        width,
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        setIsSigningUp,
        username,
        setUsername,
        page,
    } = useContext(AppContext);

    // rerender the page anytime we switch the user state
    useEffect(() => {}, [user]);

    useEffect(() => {
        console.log(username);
    }, [page]);

    const LogOut = async () => {
        await signOut(auth);
        setUser(null);
        setLoggedIn(false);
        setIsSigningUp(false);
        setUsername("Login");
    };

    // Greeting on the profile page
    const ProfileGreetingText = (
        <p className="ProfileGreetingText">
            {loggedIn === true && "Welcome, " + username + "!"}
        </p>
    );

    // logout button on profile
    const LogoutButtonText = <h3 className="LogoutButtonText">Log Out</h3>;
    // create the log in button
    const LogoutButton = (
        <button type="button" onClick={LogOut} className="LogoutButton">
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
