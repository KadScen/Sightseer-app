import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';

import './DropMenu.css';

export default function SimpleMenu() {
  const auth = firebase.auth();
  // Déclare une nouvelle variable d'état, "isLogged". Comme {this.state}
  const [isLogged, setIsLogged] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  function handleLogout(e) {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Disconnected");
        history.push(location);
      }).catch((error) => {
        // An error happened.
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
    });

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
        {isLogged ?
          <div>
              <MenuItem><Link to="/addDeal">Add a deal</Link></MenuItem>
              <MenuItem><Link to="/myAccount">My account</Link></MenuItem>
              <MenuItem id="logout" onClick={() => {handleClose(); handleLogout();}}>Logout</MenuItem>
          </div>
          :  
          <div>
              <MenuItem><Link to="/signInUp">Login/Sign up</Link></MenuItem>
          </div>
        }
      </Menu>
    </div>
  );
}
