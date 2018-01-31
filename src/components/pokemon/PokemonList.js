import React, { Component } from 'react';
import './PokemonList.css';


class PokemonList extends Component {
  render() {
    const pokemonList = this.props.pokemon.map((data, index) =>
      <li key={index}>
        <span onClick={() => this.props.onPokemonClick(index)}>{data.name}</span>
      </li>
    )
    return (
      <div className="PokemonList">
        <h2>PokemonList</h2>
        <ul>
          {this.props.pokemon.map((pokemon, index) => (
            <li key={pokemon.pokemon_species.name}>
              <span onClick={() => this.props.onPokemonClick(index)}>{pokemon.pokemon_species.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PokemonList;
