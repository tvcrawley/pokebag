import React from 'react'
import './ItemList.css'

function ItemList(props) {
  // loop through items array
  // render new array with item names and click functionality
  return (
    <div className="ItemList">
      <h2>Item List</h2>
      <ul>
        {props.items.map((item, index) => (
          <li key={item.name}>
            <span onClick={() => props.onItemClick(index)}>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ItemList
