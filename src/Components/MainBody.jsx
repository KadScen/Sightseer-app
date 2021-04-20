import React, { Component } from 'react';
import firebase from 'firebase/app';

import DealCards from "./DealCards";
import "./MainBody.css";

class MainBody extends Component {
    state = { 
        deal: '',
        dealImageUrl: [],
        cards: [],
        cardReversed: [],
        lastDoc: ''
    }

    componentDidMount() {
        //Init firebase DB
        const db = firebase.firestore();

        db.collection("Deals").orderBy("dateDealPosted", "desc").limit(5).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                this.setState({
                    deal: doc.data(),
                    dealImageUrl: this.state.dealImageUrl.concat(doc.data().imageUrl[0].url),
                    cards: this.state.cards.concat(doc.data()),
                    lastDoc: querySnapshot.docs[querySnapshot.docs.length-1]
                });
                console.log("last", this.state.lastDoc);
            });
        }); 
        console.log('cards: ' + this.state.cards);

        this.setState({
            lastDoc: this.state.cards.length - 1
        });

        const fetchMore = () => {
            db.collection("Deals").orderBy("dateDealPosted", "desc").startAfter(this.state.lastDoc).limit(5).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    this.setState({
                        deal: doc.data(),
                        dealImageUrl: this.state.dealImageUrl.concat(doc.data().imageUrl[0].url),
                        cards: this.state.cards.concat(doc.data()),
                        lastDoc: querySnapshot.docs[querySnapshot.docs.length-1]
                    });
                });
            });
            console.log("fetch more works")
        };

        document.querySelector(".fetchMore").addEventListener("click", function() {
            fetchMore();
        })
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
                <button className="fetchMore">More</button>
            </div>
        );
    }
}
 
export default MainBody;