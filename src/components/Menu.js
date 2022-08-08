import React, {
    useState,
    useLayoutEffect,
    useEffect,
    useRef,
    useContext,
} from "react";
import { AppContext } from "../App";
import "../styles/Menu.css";
import Logo from "../images/logo.ico";
import ProfileButtonIcon from "../images/profileIcon.png";
import SettingsButtonIcon from "../images/settings_white.png";
import { TextPage, ProfilePage, SettingsPage } from "./Global";
import { auth } from "../firebase-config";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

export default function Menu() {
    // here we import the states we have stored in the AppContext in the App.js file
    const {
        width,
        page,
        setPage,
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        menuWidth,
        setMenuWidth,
        username,
    } = useContext(AppContext);
    // reference to each button in the menu
    const MenuLogoRef = useRef(null);
    const MenuTextRef = useRef(null);
    const ProfileButtonRef = useRef(null);
    const ProfileTextRef = useRef(null);
    const SettingsButtonRef = useRef(null);
    const SettingsTextRef = useRef(null);
    const MenuRef = useRef(null);
    const [MenuXPosition, setMenuXPosition] = useState(0);

    // whenever we change the auth state we want to change the user's name on the profile button
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser == null) setLoggedIn(false);
        else setLoggedIn(true);
    });

    // get the exact place the menu ends on the screen
    useLayoutEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // function to set the current window width state
    const updateDimensions = () => {
        setMenuXPosition(
            MenuRef.current.offsetLeft + MenuRef.current.offsetWidth
        );
        console.log(MenuXPosition);
    };

    // object to determine what should be showing at different window widths
    const responsive = {
        showProfileText: width > 530 + username.length * 10,
        showMenuText: width > 470,
        showSettingsText: width > 350,
        stackIcons: width > 270 || width < 210,
        stackMenu: width > 210,
    };
    const showMenuText = {
        display: responsive.showMenuText ? "flex" : "none",
    };
    const showProfileText = {
        display: responsive.showProfileText ? "flex" : "none",
    };
    const showSettingsText = {
        display: responsive.showSettingsText ? "flex" : "none",
    };
    const stackIcons = {
        flexDirection: responsive.stackIcons ? "row" : "column",
    };
    const stackMenu = {
        flexDirection: responsive.stackMenu ? "row" : "column",
    };

    // create the text
    const MenuText = (
        <a ref={MenuTextRef} className="LogoText" style={showMenuText}>
            ypo
        </a>
    );
    const ProfileText = (
        <a ref={ProfileTextRef} className="MenuText" style={showProfileText}>
            {username}
        </a>
    );
    const SettingsText = (
        <a ref={SettingsTextRef} className="MenuText" style={showSettingsText}>
            Settings
        </a>
    );
    // create the buttons
    const MenuLogo = (
        <button
            ref={MenuLogoRef}
            onClick={() => setPage(TextPage)}
            type="button"
            className="MenuLogo"
        >
            <img src={Logo} alt="logo" className="Logo" />
            {MenuText}
        </button>
    );
    const ProfileButton = (
        <button
            ref={ProfileButtonRef}
            onClick={() => setPage(ProfilePage)}
            type="button"
            className="ProfileButton"
        >
            <img
                src={ProfileButtonIcon}
                alt="logo"
                className="ProfilePicture"
            />
            {ProfileText}
        </button>
    );
    const SettingsButton = (
        <button
            ref={SettingsButtonRef}
            onClick={() => setPage(SettingsPage)}
            type="button"
            className="SettingsButton"
        >
            <img
                src={SettingsButtonIcon}
                alt="logo"
                className="SettingsPicture"
            />
            {SettingsText}
        </button>
    );
    const Menu = (
        <div ref={MenuRef} className="Menu" style={stackMenu}>
            {/*Logo on the left of the menu needs to be a button*/}
            {MenuLogo}
            {/*put profile and settings in their own div so we can add responsiveness*/}
            <div className="ProfileAndSettings" style={stackIcons}>
                {/*Next item will be a settings button*/}
                {SettingsButton}
                {/*Next item will be a profile button*/}
                {ProfileButton}
            </div>
        </div>
    );

    return Menu;
}
