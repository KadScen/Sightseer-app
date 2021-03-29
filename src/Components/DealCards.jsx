import React from 'react';
import { MdSwapVert } from 'react-icons/md';

import "./DealCards.css";

function DealCards(props) {
    return (
        <div className="dealCardsComponent">
            <div className="cardHeader">
                <div className="userInfos">
                    <img src="https://assets.dryicons.com/uploads/icon/svg/3349/black_business_user.svg" alt="userPic"/>
                    <p>User name</p>
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
                    <p>{props.dealData.dealLocation}</p>
                    <p>{props.dealData.dealPrice}</p>
                </div>
                <a href="/card" className="myButton">Go to deal</a>
            </div>
        </div>
    );
}
  
  export default DealCards;