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
import {
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
} from "firebase/firestore";
import {
    auth,
    signInWithGoogle,
    signInWithGithub,
    db,
} from "../firebase-config";

export default function Login() {
    // here we import the states we have stored in the AppContext in the App.js file
    const {
        loggedIn,
        setLoggedIn,
        isSigningUp,
        setIsSigningUp,
        setUser,
        setUsername,
        page,
    } = useContext(AppContext);
    // state to track if the user login failed
    const [loginError, setLoginError] = useState(false);
    // track the email and password box states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // create references to the email and password
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const loginErrorRef = useRef(null);

    // rerender the page anytime we switch from log in to sign up
    useEffect(() => {}, [isSigningUp]);
    // anytime the page gets changed we want to set the issigningup state to false
    useEffect(() => {
        setIsSigningUp(false);
    }, [page]);

    const LogIn = async () => {
        var error = 0;
        var empty = "";

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
        if (error == 0) {
            // regex to check if string is email address
            const regexExp =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
            // check if they are using a username instead of email
            var isEmail = regexExp.test(email);
            // if they are using a username we need to use it to find their email from the database
            if (!isEmail) {
                // find the user using this username
                // check if this username exists
                const docRef = doc(db, "users", email);
                const docSnap = await getDoc(docRef);
                // if we find the username, then we get the email from it
                if (docSnap.exists()) {
                    setEmail(docSnap.data().email);
                }
            }
            try {
                const user = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                // get the users collection
                const userRef = collection(db, "users");
                // Create a query against the collection.
                const q = query(userRef, where("email", "==", email));
                // retrieve the results of the query
                const querySnap = await getDocs(q);
                // get the username associated with this
                var docs = [];
                querySnap.forEach((doc) => {
                    docs.push(doc);
                });
                // if the login is successful then set the user state, the logged in state, and the username state
                setUser(user);
                setLoggedIn(true);
                setIsSigningUp(false);
                setUsername(docs[0].data().username);
                setLoginError(false);
            } catch (error) {
                setLoginError(true);
            }
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
            ref={emailRef}
            onChange={({ target }) => setEmail(target.value)}
            type="text"
            autoFocus={true}
            placeholder="Email"
            className="EmailInput"
        ></input>
    );
    const LoginPassInput = (
        <input
            ref={passwordRef}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            placeholder="Password"
            className="PassInput"
        ></input>
    );
    // error message for if the login fails
    const LoginErrorText = (
        <p ref={loginErrorRef} className="LoginError">
            Incorrect email or password
        </p>
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
