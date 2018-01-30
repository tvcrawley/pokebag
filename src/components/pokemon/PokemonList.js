import React, { Component } from 'react';
import './PokemonList.css';

class PokemonList extends Component {
  render() {
    const pokemonList = this.props.pokemon.map((data, index) =>
      <li key={index}>
        <span>{data.name}</span>
      </li>
    )
    return (
      <div className="PokemonList">
        <h2>PokemonList</h2>
        {pokemonList}
      </div>
    );
  }
}

export default PokemonList;
