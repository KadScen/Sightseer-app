import React, { Component } from 'react';

import "./Header.css";
import MainNav from './MainNav';
import SubNav from './SubNav';

class Header extends Component {
    state = {  }
    render() { 
        return (
            <div className="headerComponent">
                <MainNav />
                <SubNav />
            </div>
        );
    }
}
 
export default Header;