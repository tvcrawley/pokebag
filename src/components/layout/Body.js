import React, { Component } from 'react';
import './Body.css';
import DataContainer from '../dataContainer/DataContainer';

class Body extends Component {
  render() {
    return (
      <div className="Body">
        <DataContainer />
      </div>
    );
  }
}

export default Body;
