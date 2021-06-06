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
        // Case comming from My Account page
        if (this.props.getUserDealId && this.props.userRole !== "ADMIN") {
            const userDeals = db.collection("Deals").orderBy("dateDealPosted", "desc").where("dealUserCreator", "==", this.props.getUserDealId).where("archived", "==", false);
            queryDeals(userDeals);
        // Case comming from Admin page
        } else if (this.props.getUserDealId && this.props.userRole === "ADMIN") {
            const pendingDeals = db.collection("Deals").orderBy("dateDealPosted", "desc").where("dealStatus", "==", "pending");
            queryDeals(pendingDeals);
        // Case comming from Main page
        } else {
        const allDeals = db.collection("Deals").orderBy("dateDealPosted", "desc").where("archived", "==", false).where("dealStatus", "==", "validated");
            queryDeals(allDeals);
        }
        
        this.setState({
            lastDoc: this.state.cards.length - 1
        });
    }

    fetchMore = () => {
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
        }
        // Case comming from My Account page
        if (this.props.getUserDealId && this.props.userRole !== "ADMIN") {
            const userDeals = db.collection("Deals").orderBy("dateDealPosted", "desc").where("dealUserCreator", "==", this.props.getUserDealId).where("archived", "==", false);
            fetchMoreDeals(userDeals);
        // Case comming from Admin page
        } else if (this.props.getUserDealId && this.props.userRole === "ADMIN") {
            const pendingDeals = db.collection("Deals").orderBy("dateDealPosted", "desc").where("dealStatus", "==", "pending");
            fetchMoreDeals(pendingDeals);
        // Case comming from Main page
        } else {
            const allDeals = db.collection("Deals").orderBy("dateDealPosted", "desc").where("archived", "==", false).where("dealStatus", "==", "validated");
            fetchMoreDeals(allDeals);
        }
        
    };

    handleDeleteDeal(item) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Deal!",
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

    handleValidateDeal(item) {
        swal({
            title: "Are you sure?",
            text: "If you approuve this Deal it will be shown to everybody!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willValidate) => {
            if (willValidate) {
                db.collection("Deals").doc(item.dealId).update({
                    dealStatus: "validated",
                    validatedBy: this.props.getUserDealId
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
                swal("Poof! The Deal has been validated!", {
                    icon: "success",
                })
                .then(() => {
                    window.location.href = "/adminPage";
                });
            } else {
                swal("Ok, let's see later!");
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
                    return  <div className="mainBodyCards">
                                <DealCards key={index} dealData={item} dealImageUrl={this.state.dealImageUrl[index]}/>
                                <div className="mainBodyCardsButtons">
                                    {this.props.getUserDealId ? <Button key={index} className="deleteDealButton" variant="contained" onClick={() => this.handleDeleteDeal(item)} color="secondary">Delete this deal?</Button> : <span/>}
                                    {this.props.getUserDealId && this.props.userRole === "ADMIN" ? <Button key={index} className="validateDealButton" variant="contained" onClick={() => this.handleValidateDeal(item)} color="primary">Approuve this deal?</Button> : <span/>}
                                </div>
                            </div>
                })}
                <button className="loadMore" onClick={this.fetchMore}>Load more...</button>
            </div>
        );
    }
}
 
export default MainBody;