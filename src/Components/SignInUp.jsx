import React, { useEffect } from 'react';
import $ from 'jquery';
import { useDispatch } from "react-redux";
import { signinup } from "../Actions";
import { isLogged } from "../Actions";
import '../Config/firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import Cookies from 'js-cookie';

import "./SignInUp.css";

function SignInUp() {
    //Call and run signinup from Redux Actions
    const dispatch = useDispatch();
    dispatch(signinup());
    const auth = firebase.auth();
    //Init firebase DB
    const db = firebase.firestore();

    // Similaire à componentDidMount et componentDidUpdate :
    useEffect(() => {
        $("#signUpTab").click(function () {
            $(".signup").toggle();
            $("#login").toggle();
            $("#signUpTab").toggleClass('active');
            $("#signInTab").toggleClass('active');
            $("#signInTab").toggleClass('inactive');
        });
        $("#signInTab").click(function () {
            $(".signup").toggle();
            $("#login").toggle();
            $("#signInTab").toggleClass('active');
            $("#signUpTab").toggleClass('active');
            $("#signUpTab").toggleClass('inactive');
        });

        const signup = document.getElementById("signup");
        const login = document.getElementById("login");
        const submitSignup = document.getElementById("submitSignup");
        const submitLogin = document.getElementById("submitLogin");
  
        submitSignup.addEventListener("click", function(e) {
            e.preventDefault();
            let name = signup.name.value;
            let email = signup.email.value;
            let password = signup.password.value;
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                // Add a new document in collection
                db.collection("Users").doc(cred.user.uid).set({
                    name: name,
                    email: email,
                    registerDate: firebase.firestore.Timestamp.now(),
                    location: "to be defined"
                })
                .then(function() {
                    Cookies.set('id', cred.user.uid);
                    console.log("Document successfully written!");
                    window.location.href = "/";
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
                alert("User sucessfully signed up")
            })
            .catch((error) => {
                //var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });
        });

        submitLogin.addEventListener("click", function(e) {
            e.preventDefault();
            let email = login.email.value;
            let password = login.password.value;
            auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch(isLogged());
                auth.onAuthStateChanged(user => {
                        Cookies.set('id', user.uid);
                });
                login.reset();
                window.location.href = "/";
                alert("User sucessfully signed in")
            })
            .catch((error) => {
                //var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
        });
    });



    return (
        <div className="signInUpComponent">
            <div className="loginDiv">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        {/* <!-- Tabs Titles --> */}
                        <h2 id="signInTab" className="active underlineHover"> Sign In </h2>
                        <h2 id="signUpTab" className="inactive underlineHover">Sign Up </h2>

                        {/* <!-- Signup Form --> */}
                        <form id="signup" className="signup">
                            <div className="inputField">
                                <input type="text" id="signup-name" className="fadeIn second" name="name" placeholder="name*" required />
                                <input type="email" id="signup-email" className="fadeIn second" name="email" placeholder="email*" required />
                                <input type="password" id="signup-password" className="fadeIn third" name="password" placeholder="password*" required />
                            </div>
                            <input type="submit" id="submitSignup" className="fadeIn fourth" value="Sign Up" />
                        </form>

                        {/* <!-- Login Form --> */}
                        <form id="login">
                            <div className="inputField">
                                <input type="email" id="loginEmail" className="fadeIn second" name="email" placeholder="login" required />
                                <input type="password" id="loginPassword" className="fadeIn third" name="password" placeholder="password" required />
                            </div>
                            <input type="submit" id="submitLogin" className="fadeIn fourth" value="Log In" />
                            {/* <!-- Remind Passowrd --> */}
                            <div id="formFooter">
                                <a className="underlineHover" href="!#">Forgot Password?</a>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInUp;