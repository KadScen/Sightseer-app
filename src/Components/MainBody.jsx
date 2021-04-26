import React, { Component } from 'react';
import {db} from "../Config/firebaseConfig";

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
        db.collection("Deals").orderBy("dateDealPosted", "desc").limit(5).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({
                    deal: doc.data(),
                    dealImageUrl: this.state.dealImageUrl.concat(doc.data().imageUrl[0].url),
                    cards: this.state.cards.concat(doc.data()),
                    lastDoc: querySnapshot.docs[querySnapshot.docs.length-1]
                });
            });
        }); 
        this.setState({
            lastDoc: this.state.cards.length - 1
        });
    }

    fetchMore = () => {
        db.collection("Deals").orderBy("dateDealPosted", "desc").startAfter(this.state.lastDoc).limit(5).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({
                    deal: doc.data(),
                    dealImageUrl: this.state.dealImageUrl.concat(doc.data().imageUrl[0].url),
                    cards: this.state.cards.concat(doc.data()),
                    lastDoc: querySnapshot.docs[querySnapshot.docs.length-1]
                });
            });
        });
    };

    render() { 
        if (this.state.cards.length === 0) {
            return <h2>Loading...</h2>
        }

        return (
            <div className="mainBodyComponent">
                {this.state.cards.map((item, index)=>{
                    return <DealCards key={index} dealData={item} dealImageUrl={this.state.dealImageUrl[index]}/>
                })}
                <button className="loadMore" onClick={this.fetchMore}>Load more...</button>
            </div>
        );
    }
}
 
export default MainBody;