import React, { Component } from 'react';
import './Body.css';
import Backpack from '../backpack/Backpack';

class Body extends Component {
  render() {
    return (
      <div className="Body">
        <Backpack />
      </div>
    );
  }
}

export default Body;
