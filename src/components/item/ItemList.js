import React from 'react';
import './ItemList.css';

function ItemList(props) {
  const itemList = props.items.map((data, index) =>
    <li key={index}>
      <span onClick={() => props.onItemClick(index)}>{data.name}</span>
    </li>
  )

  // loop through items array
  // render new array with item names and click functionality
  return (
    <div className="ItemList">
      <h2>ItemList</h2>
      <ul>
        {props.items.map((item, index) => (
          <li key={item.name}>
            <span onClick={() => props.onItemClick(index)}>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
