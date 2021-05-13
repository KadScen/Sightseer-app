import React, { Component } from 'react';
import {db} from "../Config/firebaseConfig";
import DealCards from "./DealCards";
import "./MainBody.css";
import swal from 'sweetalert';
import { Button } from '@material-ui/core';

class MainBody extends Component {
    state = { 
        deal: '',
        dealImageUrl: [],
        cards: [],
        cardReversed: [],
        lastDoc: ''
    }

    componentDidMount() {
        const allDeals = db.collection("Deals").orderBy("dateDealPosted", "desc").where("archived", "==", false);
        const queryDeals = (whichCollection) => {
            whichCollection.limit(5).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        deal: doc.data(),
                        dealImageUrl: this.state.dealImageUrl.concat(doc.data().imageUrl[0].url),
                        cards: this.state.cards.concat(doc.data()),
                        lastDoc: querySnapshot.docs[querySnapshot.docs.length-1]
                    });
                });
            }); 
        }
        if (this.props.getUserDealId) {
            const userDeal = db.collection("Deals").orderBy("dateDealPosted", "desc").where("dealUserCreator", "==", this.props.getUserDealId).where("archived", "==", false);
            queryDeals(userDeal);
        } else {
            queryDeals(allDeals);
        }
        
        this.setState({
            lastDoc: this.state.cards.length - 1
        });
    }

    fetchMore = () => {
        const allDeals = db.collection("Deals").orderBy("dateDealPosted", "desc").where("archived", "==", false);
        const fetchMoreDeals = (whichCollection) => {
            whichCollection.startAfter(this.state.lastDoc).limit(5).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        deal: doc.data(),
                        dealImageUrl: this.state.dealImageUrl.concat(doc.data().imageUrl[0].url),
                        cards: this.state.cards.concat(doc.data()),
                        lastDoc: querySnapshot.docs[querySnapshot.docs.length-1]
                    });
                });
            });
            if (this.props.getUserDealId) {
                const userDeal = db.collection("Deals").orderBy("dateDealPosted", "desc").where("dealUserCreator", "==", this.props.getUserDealId).where("archived", "==", false);
                fetchMoreDeals(userDeal);
            } else {
                fetchMoreDeals(allDeals);
            }
        }
    };

    handleDeleteDeal(item) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                db.collection("Deals").doc(item.dealId).update({
                    archived: true
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
                swal("Poof! Your Deal has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Ok, your Deal is safe!");
            }
          });
    };

    render() { 
        if (this.state.cards.length === 0) {
            return <h2>Loading...</h2>
        }

        return (
            <div className="mainBodyComponent">
                {this.state.cards.map((item, index)=>{
                    return <div className="mainBodyCards">
                            <DealCards key={index} dealData={item} dealImageUrl={this.state.dealImageUrl[index]}/>
                            {this.props.getUserDealId ? <Button className="deleteButton" variant="contained" onClick={() => this.handleDeleteDeal(item)} color="secondary">Delete this deal?</Button> : <span/>}
                        </div>
                })}
                <button className="loadMore" onClick={this.fetchMore}>Load more...</button>
            </div>
        );
    }
}
 
export default MainBody;