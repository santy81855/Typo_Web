import React, {
    useState,
    useLayoutEffect,
    useEffect,
    useRef,
    useContext,
} from "react";
import { AppContext } from "../App";
import GoogleButtonIcon from "../images/GoogleLogo.png";
import GithubButtonIcon from "../images/GithubLogo.png";
import { Colors } from "./Global";
import SignupPage from "./SignupPage";
import "../styles/LoginPage.css";

export default function Login() {
    // here we import the states we have stored in the AppContext in the App.js file
    const { width, loggedIn, setLoggedIn, isSigningUp, setIsSigningUp } =
        useContext(AppContext);
    // state to track if the user login failed
    const [loginError, setLoginError] = useState(false);

    // function called when login button is pressed
    function signupButtonClicked() {
        setIsSigningUp(true);
    }

    // title of the login page
    const LoginTitleText = <h3 className="LoginTitleText">Log In</h3>;

    // create the login input area for email and password
    const LoginEmailInput = (
        <input
            type="text"
            autoFocus={true}
            placeholder="Email"
            className="EmailInput"
        ></input>
    );
    const LoginPassInput = (
        <input
            type="password"
            placeholder="Password"
            className="PassInput"
        ></input>
    );
    // error message for if the login fails
    const LoginErrorText = (
        <p className="LoginError">Incorrect email or password</p>
    );
    // login button text
    const LoginButtonText = <h3 className="LoginButtonText">Log In</h3>;
    // create the log in button
    const LoginButton = (
        <button type="button" className="LoginButton">
            {LoginButtonText}
        </button>
    );
    // create an option to go sign-up
    const SignupText = (
        <p className="SmallSignupText">
            <i>Don't have an account?</i>
        </p>
    );
    // login button text
    const SignupButtonText = (
        <h3 className="SmallSignupButtonText">
            <u>Sign Up</u>
        </h3>
    );
    const SignupButton = (
        <button type="button" className="SmallSignupButton">
            {SignupButtonText}
        </button>
    );
    const SignupPrompt = (
        <div className="SmallSignupPrompt">
            {SignupText}
            {SignupButton}
        </div>
    );
    // "or" text for if you want to use google or github
    const OrText = <p className="OrText">Or</p>;
    // create the google button to continue with google
    const GoogleText = (
        <p className="AlternateSigninText">Continue with Google</p>
    );
    const GoogleButton = (
        <button type="button" className="AlternateSigninButton">
            <img
                src={GoogleButtonIcon}
                alt="logo"
                className="AlternateSigninIcon"
            />
            {GoogleText}
        </button>
    );
    // create the github button to continue with github
    const GithubText = (
        <p className="AlternateSigninText">Continue with GitHub</p>
    );
    const GithubButton = (
        <button type="button" className="AlternateSigninButton">
            <img
                src={GithubButtonIcon}
                alt="logo"
                className="AlternateSigninIcon"
            />
            {GithubText}
        </button>
    );
    // create the log in form
    const LogInForm = (
        <div className="LoginPage">
            {LoginTitleText}
            {LoginEmailInput}
            {LoginPassInput}
            {loginError === true && LoginErrorText}
            {LoginButton}
            {SignupPrompt}
            {OrText}
            {GoogleButton}
            {GithubButton}
        </div>
    );
    if (loggedIn == false && isSigningUp == false) {
        console.log("here");
        return LogInForm;
    } else if (loggedIn == false && isSigningUp == true) {
        console.log("here2");
        return <SignupPage />;
    }
}
