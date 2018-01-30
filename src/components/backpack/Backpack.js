import React, { Component } from 'react';
import PokemonList from '../pokemon/PokemonList';
import ItemList from '../item/ItemList';

class Backpack extends Component {
  render() {
    return (
      <div className="Backpack">
        <PokemonList />
        <ItemList />
      </div>
    );
  }
}

export default Backpack;
