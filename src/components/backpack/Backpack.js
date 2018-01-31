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
    this.handleDeleteFromBackpack = this.handleDeleteFromBackpack.bind(this)
    this.handleBackpackDetailClick = this.handleBackpackDetailClick.bind(this)
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

handleDeleteFromBackpack(index) {
  const backpackCopy = this.state.backpack.slice()
  backpackCopy.splice(index, 1)
  this.setState({
    backpack: backpackCopy
  })
  console.log(this.state.backpack)
}

handleBackpackDetailClick(index) {
  const backpackCopy = this.state.backpack.slice()
  backpackCopy[index] = Object.assign({}, backpackCopy[index])
  backpackCopy[index].showDetails = !backpackCopy[index].showDetails
  console.log(backpackCopy[index].showDetails)
  this.setState({backpack: backpackCopy})
}

  render() {
    const details = ((data) => {
      if(!data.showDetails) {
        return null
      }
      else {
        return <p>Type: {data.type}</p>
      }
    })

    const backpackList = this.state.backpack.map((data, index) =>
      <li key={index}>
        <span  onClick={() => this.handleBackpackDetailClick(index)}>{data.name}</span>
        <span onClick={() => this.handleDeleteFromBackpack(index)}>X</span>
        {details(data)}
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
