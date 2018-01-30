import React, { Component } from 'react';
import './ItemList.css';

class ItemList extends Component {
  render() {
    const itemList = this.props.items.map((data, index) =>
      <li key={index}>
        <span>{data.name}</span>
      </li>
    )
    return (
      <div className="ItemList">
        <h2>ItemList</h2>
        {itemList}
      </div>
    );
  }
}

export default ItemList;
