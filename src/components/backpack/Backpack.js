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
    this.handlePokemonClick = this.handlePokemonClick.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handlePokemonClick(index){
  console.log('pokemon added')
  const backpackCopy = this.state.backpack.slice()
  backpackCopy.push(this.state.pokemon[index])
  this.setState({
    backpack: backpackCopy
  })
  console.log(this.state.backpack)
}

handleItemClick(index){
  console.log('item added')
  const backpackCopy = this.state.backpack.slice()
  backpackCopy.push(this.state.items[index])
  this.setState({
    backpack: backpackCopy
  })
  console.log(this.state.backpack)
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
        <PokemonList
          pokemon={this.state.pokemon}
          onPokemonClick={this.handlePokemonClick}
        />
        <ItemList
          items={this.state.items}
          onItemClick={this.handleItemClick}
        />
      </div>
    );
  }
}

export default Backpack;
