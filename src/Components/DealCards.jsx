import React, { useRef, useState, useEffect } from 'react';
import { MdSwapVert } from 'react-icons/md';
import firebase from 'firebase/app';
import { Link } from "react-router-dom";
import AddLike from "./AddLike";
import 'firebase/auth';

import "./DealCards.css";

function DealCards(props) {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const [userData, setUserData] = useState(null);
    const [likeColor, setLikeColor] = useState('');
    const [disLikeColor, setDisLikeColor] = useState('');
    const userDataInfos = useRef(0);
    userDataInfos.current = userData;

    useEffect(() => {
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
    })

    // Liked or Dislaked color change
    const likeRef = db.collection('Deals').doc(props.dealData.dealId);
    likeRef.onSnapshot((doc) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                const haveLiked = doc.data().usersLiked.find(element => element === user.uid);
                const haveDisLiked = doc.data().usersDisLiked.find(element => element === user.uid);
                if (haveLiked) {
                    setLikeColor('primary');
                    setDisLikeColor('');
                } else if (haveDisLiked) {
                    setDisLikeColor('secondary');
                    setLikeColor('');
                } else {
                    setLikeColor('');
                    setDisLikeColor('');
                }
            }
        });   
    });

    return (
        <div className="dealCardsComponent">
            <div className="cardHeader">
                <div className="userInfos">
                    <img src="https://assets.dryicons.com/uploads/icon/svg/3349/black_business_user.svg" alt="userPic"/>
                    <p>By: {userDataInfos.current}</p>
                </div>
                <div className="interestInfos">
                    <AddLike dealData={props.dealData} likeColor={likeColor} disLikeColor={disLikeColor}/>
                    <MdSwapVert size="30px"/>
                </div>
            </div>
            <div className="cardBody">
                <p className="dealTitle">{props.dealData.dealName}</p>
                <p className="dealPrice">${props.dealData.dealPrice}</p>
                <p>Location: {props.dealData.dealLocation}</p>
                {props.dealImageUrl ?
                    <img src={props.dealImageUrl} alt="dealPicture"/>
                    :  
                    <div>
                        <p>*No image added*</p>
                    </div>
                }
            </div>
            <div className="cardFooter">
                <Link className="buttonText myButton" to={{ pathname: "/card", state: props.dealData, dealCreator: userDataInfos.current}}>See the deal</Link>
            </div>
        </div>
    );
}
  
  export default DealCards;