import React, {
    useState,
    useLayoutEffect,
    useEffect,
    useRef,
    useContext,
} from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, signInWithGoogle, signInWithGithub } from "../firebase-config";
import { AppContext } from "../App";
import GoogleButtonIcon from "../images/GoogleLogo.png";
import GithubButtonIcon from "../images/GithubLogo.png";
import "../styles/SignupPage.css";
import { Colors } from "./Global";

export default function SignUpPage() {
    // here we import the states we have stored in the AppContext in the App.js file
    const {
        width,
        loggedIn,
        setLoggedIn,
        isSigningUp,
        setIsSigningUp,
        user,
        setUser,
        setUsername,
    } = useContext(AppContext);
    // state to track if the user login failed
    const [signupError, setSignupError] = useState(false);
    // states to track the user info
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [inputUsername, setInputUsername] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();
        console.log(first);
        var empty = "";
        // if all input fields are not filled out return error
        if (email == empty || password == empty || confirmPassword == empty) {
            alert("Please fill out all fields");
        }
        // if both passwords don't match return error
        else if (password != confirmPassword) {
            alert("passwords don't match");
        }
        // otherwise try to create the account
        else {
            try {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                console.log(user);
                setLoggedIn(true);
                setUser(user);
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    // function called when small signup button is pressed
    function logInButtonClicked() {
        setIsSigningUp(false);
    }

    // title of the login page
    const SignupTitleText = <h3 className="SignupTitleText">Create Account</h3>;

    // input for first and last name
    const FirstNameInput = (
        <input
            onChange={({ target }) => setFirst(target.value)}
            type="text"
            autoFocus={true}
            placeholder="First"
            className="NameInput"
        ></input>
    );
    const LastNameInput = (
        <input
            onChange={({ target }) => setLast(target.value)}
            type="text"
            placeholder="Last"
            className="NameInput"
        ></input>
    );
    // div to wrap first and last name into the same line
    const FirstLastNameDiv = (
        <div className="FirstLastNameDiv">
            {FirstNameInput}
            {LastNameInput}
        </div>
    );

    // create an input for username
    const UsernameInput = (
        <input
            onChange={({ target }) => setInputUsername(target.value)}
            type="text"
            placeholder="Username"
            className="UsernameInput"
        ></input>
    );
    // create the login input area for email and password
    const SignupEmailInput = (
        <input
            onChange={({ target }) => setEmail(target.value)}
            type="text"
            placeholder="Email"
            className="EmailInput"
        ></input>
    );
    const SignupPassInput1 = (
        <input
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            placeholder="Password"
            className="PassInput"
        ></input>
    );
    const SignupPassInput2 = (
        <input
            onChange={({ target }) => setConfirmPassword(target.value)}
            type="password"
            placeholder="Confirm Password"
            className="PassInput"
        ></input>
    );
    // error message for if the login fails
    const SignupErrorText = (
        <p className="SignupError">Incorrect email or password</p>
    );
    // login button text
    const SignupButtonText = (
        <h3 className="SignupButtonText">Create Account</h3>
    );
    // create the log in button
    const SignupButton = (
        <button type="submit" className="SignupButton">
            {SignupButtonText}
        </button>
    );
    // create an option to go log in
    const LoginText = (
        <p className="SmallLoginText">
            <i>Already have an account?</i>
        </p>
    );
    // login button text
    const LoginButtonText = (
        <h3 className="SmallLoginButtonText">
            <u>Log in</u>
        </h3>
    );
    const LoginButton = (
        <button
            type="button"
            onClick={logInButtonClicked}
            className="SmallLoginButton"
        >
            {LoginButtonText}
        </button>
    );
    const LoginPrompt = (
        <div className="SmallLoginPrompt">
            {LoginText}
            {LoginButton}
        </div>
    );
    // "or" text for if you want to use google or github
    const OrText = <p className="OrText">Or</p>;
    // create the google button to continue with google
    const GoogleText = (
        <p className="AlternateSigninText">Continue with Google</p>
    );
    const GoogleButton = (
        <button
            type="button"
            onClick={signInWithGoogle}
            className="AlternateSigninButton"
        >
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
        <button
            type="submit"
            onClick={signInWithGithub}
            className="AlternateSigninButton"
        >
            <img
                src={GithubButtonIcon}
                alt="logo"
                className="AlternateSigninIcon"
            />
            {GithubText}
        </button>
    );
    // create the log in form
    const SignupForm = (
        <form onSubmit={registerUser} className="SignupPage">
            {SignupTitleText}
            {FirstLastNameDiv}
            {UsernameInput}
            {SignupEmailInput}
            {SignupPassInput1}
            {SignupPassInput2}
            {signupError === true && SignupErrorText}
            {SignupButton}
            {LoginPrompt}
            {OrText}
            {GoogleButton}
            {GithubButton}
        </form>
    );
    return SignupForm;
}
