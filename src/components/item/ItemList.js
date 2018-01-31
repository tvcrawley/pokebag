import React, { Component } from 'react';
import './ItemList.css';

class ItemList extends Component {
  render() {
    const itemList = this.props.items.map((data, index) =>
      <li key={index}>
        <span onClick={() => this.props.onItemClick(index)}>{data.name}</span>
      </li>
    )
    return (
      <div className="ItemList">
        <h2>ItemList</h2>
        <ul>
          {this.props.items.map((item, index) => (
            <li key={item.name}>
              <span onClick={() => this.props.onItemClick(index)}>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ItemList;
