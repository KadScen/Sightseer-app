import React, { Component } from 'react';
import { MdSwapVert } from 'react-icons/md';

import "./DealCards.css";
class DealCards extends Component {
    state = {  }
    render() { 
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
                    <img src="https://images.dailyhive.com/20160912134211/The-view-from-Cypress-mountain-Josh-StuartFlickr.jpg" alt="dealPicture"/>
                </div>
                <div className="cardFooter">
                    <div className="activityInfos">
                        <p>Activity name</p>
                        <p>Activity location</p>
                        <p>Activity price</p>
                    </div>
                    <a href="/card" className="myButton">Go to deal</a>
                </div>
            </div>
        );
    }
}
 
export default DealCards;