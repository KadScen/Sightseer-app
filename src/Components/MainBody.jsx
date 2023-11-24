import React, { Component } from "react";
import { db } from "../Config/firebaseConfig";
import DealCards from "./DealCards";
import swal from "sweetalert";
import { Button } from "@material-ui/core";
import styled from "styled-components";

class MainBody extends Component {
  state = {
    deal: "",
    dealImageUrl: [],
    cards: [],
    cardReversed: [],
    lastDoc: "",
  };

  componentDidMount() {
    const queryDeals = (whichCollection) => {
      whichCollection
        .limit(15)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.setState({
              deal: doc.data(),
              dealImageUrl: this.state.dealImageUrl.concat(
                doc.data().imageUrl[0].url
              ),
              cards: this.state.cards.concat(doc.data()),
              lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
            });
          });
        });
    };
    // Case comming from My Account page
    if (this.props.getUserDealId && this.props.userRole !== "ADMIN") {
      const userDeals = db
        .collection("Deals")
        .orderBy("dateDealPosted", "desc")
        .where("dealUserCreator", "==", this.props.getUserDealId)
        .where("archived", "==", false);
      queryDeals(userDeals);
      // Case comming from Admin page
    } else if (this.props.getUserDealId && this.props.userRole === "ADMIN") {
      const pendingDeals = db
        .collection("Deals")
        .orderBy("dateDealPosted", "desc")
        .where("dealStatus", "==", "pending");
      queryDeals(pendingDeals);
      // Case comming from Main page
    } else {
      const allDeals = db
        .collection("Deals")
        .orderBy("dateDealPosted", "desc")
        .where("archived", "==", false)
        .where("dealStatus", "==", "validated");
      queryDeals(allDeals);
    }

    this.setState({
      lastDoc: this.state.cards.length - 1,
    });
  }

  fetchMore = () => {
    const fetchMoreDeals = (whichCollection) => {
      whichCollection
        .startAfter(this.state.lastDoc)
        .limit(10)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.setState({
              deal: doc.data(),
              dealImageUrl: this.state.dealImageUrl.concat(
                doc.data().imageUrl[0].url
              ),
              cards: this.state.cards.concat(doc.data()),
              lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
            });
          });
        });
    };
    // Case comming from My Account page
    if (this.props.getUserDealId && this.props.userRole !== "ADMIN") {
      const userDeals = db
        .collection("Deals")
        .orderBy("dateDealPosted", "desc")
        .where("dealUserCreator", "==", this.props.getUserDealId)
        .where("archived", "==", false);
      fetchMoreDeals(userDeals);
      // Case comming from Admin page
    } else if (this.props.getUserDealId && this.props.userRole === "ADMIN") {
      const pendingDeals = db
        .collection("Deals")
        .orderBy("dateDealPosted", "desc")
        .where("dealStatus", "==", "pending")
        .where("archived", "==", false);
      fetchMoreDeals(pendingDeals);
      // Case comming from Main page
    } else {
      const allDeals = db
        .collection("Deals")
        .orderBy("dateDealPosted", "desc")
        .where("archived", "==", false)
        .where("dealStatus", "==", "validated");
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
    }).then((willDelete) => {
      if (willDelete) {
        db.collection("Deals")
          .doc(item.dealId)
          .update({
            archived: true,
            dealStatus: "archived",
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        swal("Poof! Your Deal has been deleted!", {
          icon: "success",
        }).then(() => {
          console.log("Document successfully written!");
          window.location.href = "/adminPage";
        });
      } else {
        swal("Ok, your Deal is safe!");
      }
    });
  }

  handleValidateDeal(item) {
    swal({
      title: "Are you sure?",
      text: "If you approuve this Deal it will be shown to everybody!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willValidate) => {
      if (willValidate) {
        db.collection("Deals")
          .doc(item.dealId)
          .update({
            dealStatus: "validated",
            validatedBy: this.props.getUserDealId,
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        swal("Poof! The Deal has been validated!", {
          icon: "success",
        }).then(() => {
          console.log("Document successfully written!");
          window.location.href = "/adminPage";
        });
      } else {
        swal("Ok, let's see later!");
      }
    });
  }

  render() {
    if (this.state.cards.length === 0) {
      return <h2>Loading...</h2>;
    }

    return (
      <MainBodyComponentStyled>
        {this.state.cards.map((item, index) => {
          return (
            <MainBodyCardsStyled key={index}>
              <DealCards
                dealData={item}
                dealImageUrl={this.state.dealImageUrl[index]}
              />
              <MainBodyCardsButtonsStyled>
                {this.props.getUserDealId ? (
                  <DeleteDealButtonStyled
                    variant="contained"
                    onClick={() => this.handleDeleteDeal(item)}
                    color="secondary"
                  >
                    Delete this deal?
                  </DeleteDealButtonStyled>
                ) : (
                  <span />
                )}
                {this.props.getUserDealId && this.props.userRole === "ADMIN" ? (
                  <ValidateDealButtonStyled
                    variant="contained"
                    onClick={() => this.handleValidateDeal(item)}
                    color="primary"
                  >
                    Approuve this deal?
                  </ValidateDealButtonStyled>
                ) : (
                  <span />
                )}
              </MainBodyCardsButtonsStyled>
            </MainBodyCardsStyled>
          );
        })}
        <LoadMoreStyled onClick={this.fetchMore}>Load more...</LoadMoreStyled>
      </MainBodyComponentStyled>
    );
  }
}

export default MainBody;

const MainBodyComponentStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainBodyCardsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
`;

const MainBodyCardsButtonsStyled = styled.div``;

const DeleteDealButtonStyled = styled(Button)`
  width: 100%;
`;

const ValidateDealButtonStyled = styled(Button)`
  width: 100%;
`;

const LoadMoreStyled = styled.button`
  width: 100%;
`;
