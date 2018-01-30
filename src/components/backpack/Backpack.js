import React, { Component } from 'react';
import './Backpack.css';
import PokemonList from '../pokemon/PokemonList';
import ItemList from '../item/ItemList';

class Backpack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      backpack: [],
      pokemon: [
        {
          name: 'Charmander',
          type: 'Fire'
        },
        {
          name: 'Squirtle',
          type: 'Water'
        },
        {
          name: 'Bulbasaur',
          type: 'Grass'
        }
      ],
      items: [
        {
          name: 'Charmander Candy'
        },
        {
          name: 'Squirtle Candy'
        },
        {
          name: 'Bulbasaur Candy'
        }
      ]
    }
  }
  render() {
    const backpackList = this.state.backpack.map((data, index) =>
      <li key={index}>
        <span>{data.name}</span>
      </li>
    )
    return (
      <div className="Backpack">
        <h2>Backpack</h2>
        {backpackList}
        <PokemonList pokemon={this.state.pokemon}/>
        <ItemList items={this.state.items}/>
      </div>
    );
  }
}

export default Backpack;
