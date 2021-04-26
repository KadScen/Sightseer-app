import React, {useRef, useState} from 'react';
import { Button } from '@material-ui/core';
import "./AddLike.css";
import firebase from 'firebase/app';
import {db} from "../Config/firebaseConfig";
import 'firebase/auth';

function AddLike(props) {
    const auth = firebase.auth();
    console.log("dealID: " + JSON.stringify(props.dealData.dealId));
    const [likeColor, setLikeColor] = useState('');
    const [disLikeColor, setDisLikeColor] = useState('');
    const [likeData, setLikeData] = useState(props.dealData.interestLevel);
    const nbOfLike = useRef(0);
    nbOfLike.current = likeData;

    const handleLike = () => {
        const likeRef = db.collection('Deals').doc(props.dealData.dealId);
        likeRef.get().then((doc) => {
            if (doc.exists) {
                auth.onAuthStateChanged(user => {
                    if (user) {
                        const haveLiked = doc.data().usersLiked.find(element => element === user.uid);
                        const haveDisLiked = doc.data().usersDisLiked.find(element => element === user.uid);
                        if (haveDisLiked) {
                            likeRef.update({
                                interestLevel: firebase.firestore.FieldValue.increment(2),
                                usersLiked: firebase.firestore.FieldValue.arrayUnion(user.uid),
                                usersDisLiked: firebase.firestore.FieldValue.arrayRemove(haveDisLiked)
                            });
                            setLikeColor('primary');
                            setDisLikeColor('');
                        } else if (haveLiked) {
                            likeRef.update({
                                interestLevel: firebase.firestore.FieldValue.increment(-1),
                                usersLiked: firebase.firestore.FieldValue.arrayRemove(haveLiked)
                            });
                            setLikeColor('');
                        } else {
                            likeRef.update({
                                interestLevel: firebase.firestore.FieldValue.increment(1),
                                usersLiked: firebase.firestore.FieldValue.arrayUnion(user.uid)
                            });
                            setLikeColor('primary');
                        }
                    } else {
                        alert("You need to be logged to vote for a post");
                    }

                });    
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        likeRef.onSnapshot((doc) => {
            setLikeData(doc.data().interestLevel);
        });
    }

    const handleDislike = () => {
        const likeRef = db.collection('Deals').doc(props.dealData.dealId);
        likeRef.get().then((doc) => {
            if (doc.exists) {
                auth.onAuthStateChanged(user => {
                    if (user) {
                        const haveDisLiked = doc.data().usersDisLiked.find(element => element === user.uid);
                        const haveLiked = doc.data().usersLiked.find(element => element === user.uid);
                        if (haveLiked) {
                            likeRef.update({
                                interestLevel: firebase.firestore.FieldValue.increment(-2),
                                usersDisLiked: firebase.firestore.FieldValue.arrayUnion(user.uid),
                                usersLiked: firebase.firestore.FieldValue.arrayRemove(haveLiked)
                            });
                            setDisLikeColor('secondary');
                            setLikeColor('');
                        } else if (haveDisLiked) {
                            likeRef.update({
                                interestLevel: firebase.firestore.FieldValue.increment(1),
                                usersDisLiked: firebase.firestore.FieldValue.arrayRemove(haveDisLiked)
                            });
                            setDisLikeColor('');
                        } else {
                            likeRef.update({
                                interestLevel: firebase.firestore.FieldValue.increment(-1),
                                usersDisLiked: firebase.firestore.FieldValue.arrayUnion(user.uid)
                            });
                            setDisLikeColor('secondary');
                        }
                    } else {
                        alert("You need to be logged to vote for a post");
                    }

                });    
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        likeRef.onSnapshot((doc) => {
            setLikeData(doc.data().interestLevel);
        });
    }

    return (
        <div className="addLikeContainer">
            <Button onClick={handleDislike} color={disLikeColor}>-</Button>
            <span>{nbOfLike.current}</span>
            <Button onClick={handleLike} color={likeColor}>+</Button>
        </div>
    )
}

export default AddLike;