import React from 'react';
import './PokemonList.css';

function PokemonList(props) {
  const pokemonList = props.pokemon.map((data, index) =>
    <li key={index}>
      <span onClick={() => props.onPokemonClick(index)}>{data.name}</span>
    </li>
  )

  // loop through pokemon array
  // render new array with pokemon names and click functionality
  return (
    <div className="PokemonList">
      <h2>PokemonList</h2>
      <ul>
        {props.pokemon.map((pokemon, index) => (
          <li key={pokemon.pokemon_species.name}>
            <span onClick={() => props.onPokemonClick(index)}>{pokemon.pokemon_species.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
