import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';
import {db} from "../Config/firebaseConfig";

import './DropMenu.css';

export default function SimpleMenu() {
  const auth = firebase.auth();
  // Déclare une nouvelle variable d'état, "isLogged". Comme {this.state}
  const [isLogged, setIsLogged] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userData = useRef(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();
  const location = {
      pathname: '/',
      state: { fromDashboard: true }
  }

  function handleLogout() {
    firebase.auth().signOut().then(() => {
      Cookies.remove('id');
      // Sign-out successful
      alert("Disconnected");
      history.push(location);
    })
    .catch((error) => {
      // An error happened
    });
  }

    // Similaire à componentDidMount et componentDidUpdate :
    useEffect(() => {
      auth.onAuthStateChanged(user => {
          if (user) {
              setIsLogged(true);
          } else {
              setIsLogged(false);
          };
      });
      const fetchData = async() => {
        try {
            const response = await db
                .collection("Users")
                .doc(Cookies.get('id'))
                .get();
            let data = { title: 'not found' };

            if (response.exists) {
                data = response.data();
            }
            userData.current = data;
            console.log(userData.current);
        } catch(err) {
            console.error(err);
        }
      };
      fetchData();
    }, []);

    //Conditional rendering for admin button
    const adminButton = () => {
      if (userData.current.userRole === "ADMIN") {
        return <MenuItem onClick={handleClose}><Link to="/adminPage">Admin</Link></MenuItem>
      }
    }

  return (
    <div>
      <Button id="dropButtonTrigger" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuRoundedIcon
          fontSize="large"
        />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
        {isLogged ?
          <div>
              <MenuItem onClick={handleClose}><Link to="/addDeal">Add a deal</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to="/myAccount">My account</Link></MenuItem>
              {adminButton()}
              <MenuItem id="logout" onClick={() => {handleClose(); handleLogout();}}>Logout</MenuItem>
          </div>
          :  
          <div>
              <MenuItem onClick={handleClose}><Link to="/signInUp">Login/Sign up</Link></MenuItem>
          </div>
        }
      </Menu>
    </div>
  );
}
