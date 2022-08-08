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
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle, signInWithGithub } from "../firebase-config";

export default function Login() {
    // here we import the states we have stored in the AppContext in the App.js file
    const {
        width,
        loggedIn,
        setLoggedIn,
        isSigningUp,
        setIsSigningUp,
        user,
        setUser,
    } = useContext(AppContext);
    // state to track if the user login failed
    const [loginError, setLoginError] = useState(false);
    // track the email and password box states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // rerender the page anytime we switch from log in to sign up
    useEffect(() => {}, [isSigningUp]);

    const LogIn = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    // function called when small signup button is pressed
    function signupButtonClicked() {
        setIsSigningUp(true);
    }

    // title of the login page
    const LoginTitleText = <h3 className="LoginTitleText">Log In</h3>;

    // create the login input area for email and password
    const LoginEmailInput = (
        <input
            onChange={({ target }) => setEmail(target.value)}
            type="text"
            autoFocus={true}
            placeholder="Email"
            className="EmailInput"
        ></input>
    );
    const LoginPassInput = (
        <input
            onChange={({ target }) => setPassword(target.value)}
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
        <button type="button" onClick={LogIn} className="LoginButton">
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
        <button
            type="button"
            onClick={signupButtonClicked}
            className="SmallSignupButton"
        >
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
            type="button"
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
        return LogInForm;
    } else if (loggedIn == false && isSigningUp == true) {
        return <SignupPage />;
    }
}
