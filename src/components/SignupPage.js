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
import {
    auth,
    signInWithGoogle,
    signInWithGithub,
    db,
} from "../firebase-config";
import { collection, doc, setDoc, addDoc, getDoc } from "firebase/firestore";
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
    // create references to input fields
    const firstRef = useRef(null);
    const lastRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordErrorRef = useRef(null);

    const registerUser = async (e) => {
        e.preventDefault();
        var empty = "";
        var error = 0;

        if (first == empty) {
            firstRef.current.style.border = "1px solid red";
            error = 1;
        } else {
            firstRef.current.style.border =
                "2px solid " + Colors.lighterBackground;
        }
        if (last == empty) {
            lastRef.current.style.border = "1px solid red";
            error = 1;
        } else {
            lastRef.current.style.border =
                "2px solid " + Colors.lighterBackground;
        }
        if (inputUsername == empty) {
            usernameRef.current.style.border = "1px solid red";
            error = 1;
        } else {
            usernameRef.current.style.border =
                "2px solid " + Colors.lighterBackground;
        }
        if (email == empty) {
            emailRef.current.style.border = "1px solid red";
            error = 1;
        } else {
            emailRef.current.style.border =
                "2px solid " + Colors.lighterBackground;
        }
        if (password == empty) {
            passwordRef.current.style.border = "1px solid red";
            error = 1;
        } else {
            passwordRef.current.style.border =
                "2px solid " + Colors.lighterBackground;
        }
        if (confirmPassword == empty) {
            confirmPasswordRef.current.style.border = "1px solid red";
            error = 1;
        } else {
            confirmPasswordRef.current.style.border =
                "2px solid " + Colors.lighterBackground;
        }
        // if passwords don't match return error
        if (
            password != confirmPassword &&
            password != empty &&
            confirmPassword != empty
        ) {
            setSignupError(true);
            error = 1;
        } else if (password == confirmPassword) {
            setSignupError(false);
        } // otherwise try to create the account
        if (error == 0) {
            // check if username is taken
            const docRef = doc(db, "users", inputUsername);
            const docSnap = await getDoc(docRef);
            // if username is not taken
            if (!docSnap.exists()) {
                console.log("did not find it");
                try {
                    const user = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    console.log(user);
                    // add the user to the database if they were successfully created
                    setLoggedIn(true);
                    setUser(user);
                    setUsername(inputUsername);
                    // create the new user
                    const userRef = collection(db, "users");
                    const data = {
                        email: email,
                        first: first,
                        last: last,
                        username: inputUsername,
                        results: [],
                    };
                    // add the user to the database
                    await setDoc(doc(userRef, inputUsername), data);
                } catch (error) {
                    alert("" + error.message);
                }
            }
            // if username is taken
            else {
                alert("username is taken");
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
            ref={firstRef}
            type="text"
            autoFocus={true}
            placeholder="First"
            className="NameInput"
        ></input>
    );
    const LastNameInput = (
        <input
            onChange={({ target }) => setLast(target.value)}
            ref={lastRef}
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
            ref={usernameRef}
            type="text"
            placeholder="Username"
            className="UsernameInput"
        ></input>
    );
    // create the login input area for email and password
    const SignupEmailInput = (
        <input
            onChange={({ target }) => setEmail(target.value)}
            ref={emailRef}
            type="text"
            placeholder="Email"
            className="EmailInput"
        ></input>
    );
    const SignupPassInput1 = (
        <input
            onChange={({ target }) => setPassword(target.value)}
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="PassInput"
        ></input>
    );
    const SignupPassInput2 = (
        <input
            onChange={({ target }) => setConfirmPassword(target.value)}
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm Password"
            className="PassInput"
        ></input>
    );
    // error message for if the login fails
    const SignupErrorText = (
        <p ref={passwordErrorRef} className="SignupError">
            Passwords do not match
        </p>
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
