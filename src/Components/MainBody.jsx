import React, { Component } from 'react';

import DealCards from "./DealCards";
import "./MainBody.css";

class MainBody extends Component {
    state = {  }
    render() { 
        return (
            <div className="mainBodyComponent">
                <DealCards />
            </div>
        );
    }
}
 
export default MainBody;