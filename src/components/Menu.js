import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import "../styles/Menu.css";
import Logo from "../images/logo.ico";
import ProfileButtonIcon from "../images/profileIcon.png";
import SettingsButtonIcon from "../images/settings_white.png";

{
    /*Comment*/
}

export default function Menu() {
    // reference to each button in the menu
    const MenuLogoRef = useRef(null);
    const MenuTextRef = useRef(null);
    const ProfileButtonRef = useRef(null);
    const ProfileTextRef = useRef(null);
    const SettingsButtonRef = useRef(null);
    const SettingsTextRef = useRef(null);
    // create a state for the size of the window
    const [width, setWindowWidth] = useState(0);

    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const updateDimensions = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
        if (width < 530) {
            MenuTextRef.current.style.display = "none";
        } else MenuTextRef.current.style.display = "flex";
    };

    // create the text
    const MenuText = (
        <a ref={MenuTextRef} className="LogoText">
            ypo
        </a>
    );
    const ProfileText = (
        <a ref={ProfileTextRef} className="MenuText">
            Login
        </a>
    );
    const SettingsText = (
        <a ref={SettingsTextRef} className="MenuText">
            Settings
        </a>
    );
    // create the buttons
    const MenuLogo = (
        <button ref={MenuLogoRef} type="button" className="MenuLogo">
            <img src={Logo} alt="logo" class="Logo" />
            {MenuText}
        </button>
    );
    const ProfileButton = (
        <button ref={ProfileButtonRef} type="button" className="ProfileButton">
            <img src={ProfileButtonIcon} alt="logo" class="ProfilePicture" />
            {ProfileText}
        </button>
    );
    const SettingsButton = (
        <button
            ref={SettingsButtonRef}
            type="button"
            className="SettingsButton"
        >
            <img src={SettingsButtonIcon} alt="logo" class="SettingsPicture" />
            {SettingsText}
        </button>
    );

    return (
        <div className="Menu">
            {/*Logo on the left of the menu needs to be a button*/}
            {MenuLogo}
            {/*Next item will be a profile button*/}
            {ProfileButton}
            {/*Next item will be a settings button*/}
            {SettingsButton}
        </div>
    );
}
