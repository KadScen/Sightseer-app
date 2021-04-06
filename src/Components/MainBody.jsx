import React, { Component } from 'react';
import firebase from 'firebase/app';

import DealCards from "./DealCards";
import "./MainBody.css";

class MainBody extends Component {
    state = { 
        deal: '',
        dealImageUrl: [],
        cards: [],
        cardReversed: []
    }

    componentDidMount() {
        //Init firebase DB
        const db = firebase.firestore();

        db.collection("Deals").orderBy("dateDealPosted", "desc").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                this.setState({
                    deal: doc.data(),
                    dealImageUrl: this.state.dealImageUrl.concat(doc.data().imageUrl[0].url),
                    cards: this.state.cards.concat(doc.data())
                });
            });
        }); 
    }

    render() { 
        // var mySet = this.state.cards;
        // for (let myNum of Array.from(mySet).reverse()) {
        // console.log(myNum.dealName);
        // this.setState({
        //     cardReversed: myNum
        // });
        // }
        return (
            <div className="mainBodyComponent">
                {this.state.cards.map((item, index)=>{
                    return <DealCards dealData={item} dealImageUrl={this.state.dealImageUrl[index]}/>
                })}
            </div>
        );
    }
}
 
export default MainBody;