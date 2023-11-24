import React, { useRef, useState, useEffect } from 'react';
import { MdSwapVert } from 'react-icons/md';
import firebase from 'firebase/compat/app';
import { Link } from "react-router-dom";
import AddLike from "./AddLike";
import 'firebase/auth';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';

import "./DealCards.css";

function DealCards(props) {
    const db = firebase.firestore();
    const [userData, setUserData] = useState(null);
    const userDataInfos = useRef(0);
    userDataInfos.current = userData;
    const [userPicUrl, setUserPicUrl] = useState(null);
    const userPic = useRef(0);
    userPic.current = userPicUrl;

    useEffect(() => {
        db.collection("Users").doc(props.dealData.dealUserCreator).get().then((doc) => {
            if (doc.exists) {
                setUserData(doc.data().name);
                setUserPicUrl(doc.data().profilPicture);
                
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    })

    const renderPrice = () => {
        if (props.dealData.dealPrice === 0) {
          return "Free";
        } else {
          return props.dealData.dealPrice;
        }
    }

    return (
        <div className="dealCardsComponent">
            <div className="cardHeader">
                <div className="userInfos">
                    <img 
                        src={userPic.current ? userPic.current : "https://assets.dryicons.com/uploads/icon/svg/3349/black_business_user.svg"}
                        alt={userDataInfos.current}
                    />
                    <p>By: {userDataInfos.current}</p>
                </div>
                {props.dealData.dealStatus === "pending" 
                    ? 
                    <div className="interestInfos">
                        <HelpRoundedIcon color="primary"/>
                        <p>This deal is waiting for a validation</p> 
                    </div>
                    : 
                    <div className="interestInfos">
                        <AddLike dealData={props.dealData}/>
                        <MdSwapVert size="30px"/>
                    </div>
                }
            </div>
            <div className="cardBody">
                <p className="dealTitle">{props.dealData.dealName}</p>
                <p className="dealPrice">${renderPrice()}</p>
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
                <Link className="buttonText myButton" to={{ pathname: "/card", state: {state: props.dealData, dealCreator: userDataInfos.current, dealCreatorPicture: userPic.current}}}>See the deal</Link>
            </div>
        </div>
    );
}
  
  export default DealCards;