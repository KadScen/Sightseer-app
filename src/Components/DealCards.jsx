import React, { useRef, useState } from 'react';
import { MdSwapVert } from 'react-icons/md';
import firebase from 'firebase/app';
import { Link } from "react-router-dom";

import "./DealCards.css";

function DealCards(props) {
    const db = firebase.firestore();
    const [userData, setUserData] = useState(null);
    const userDataInfos = useRef(0);
    userDataInfos.current = userData;
        console.log("user: " + props.dealData.dealUserCreator)
        db.collection("Users").doc(props.dealData.dealUserCreator).get().then((doc) => {
            if (doc.exists) {
                setUserData(doc.data().name);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    return (
        <div className="dealCardsComponent">
            <div className="cardHeader">
                <div className="userInfos">
                    <img src="https://assets.dryicons.com/uploads/icon/svg/3349/black_business_user.svg" alt="userPic"/>
                    <p>By: {userDataInfos.current}</p>
                </div>
                <div className="interestInfos">
                    <p>Interest level</p>
                    <MdSwapVert size="30px"/>
                </div>
            </div>
            <div className="cardBody">
                <img src={props.dealImageUrl} alt="dealPicture"/>
            </div>
            <div className="cardFooter">
                <div className="activityInfos">
                    <p>{props.dealData.dealName}</p>
                    <p>Location: {props.dealData.dealLocation}</p>s
                    <p>Price: ${props.dealData.dealPrice}</p>
                </div>
                <a href="/card" className="myButton"><Link to={{ pathname: "/card", state: props.dealData}}>Go to the deal</Link></a>
            </div>
        </div>
    );
}
  
  export default DealCards;