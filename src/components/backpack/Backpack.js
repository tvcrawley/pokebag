import React, { Component } from 'react';
import './Backpack.css';
import axios from 'axios';
import PokemonList from '../pokemon/PokemonList';
import ItemList from '../item/ItemList';
import pokemonData from '../../data/pokemonData.json';
import itemsData from '../../data/itemsData.json';
import mediumSlow from '../../data/growth-rate/mediumSlow.json';


class Backpack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      backpack: [],
      // pokemon array = pokemon_entries from https://pokeapi.co/api/v2/pokedex/2/
      pokemon: [],
      items: []
    }
    this.handlePokemonClick = this.handlePokemonClick.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleDeleteFromBackpack = this.handleDeleteFromBackpack.bind(this)
    this.handleBackpackDetailClick = this.handleBackpackDetailClick.bind(this)
  }

  componentDidMount() {
    pokemonData.pokemon_entries.forEach((pokemon) => {
      pokemon.pokemon_species.level = 1
      pokemon.pokemon_species.experience = 0
    })
    // console.log(pokemonData)
    // console.log(itemsData)
    this.setState({
      isLoaded: true,
      pokemon: pokemonData.pokemon_entries,
      items: itemsData.results
    })
  }

  // componentDidMount() {
  //   axios.get("https://www.pokeapi.co/api/v2/pokedex/2/")
  //     .then(
  //       (result) => {
  //         console.log(result)
  //         // console.log('Charmander?: ', result.data.pokemon_entries[3].pokemon_species.name)
  //         this.setState({
  //           isLoaded: true,
  //           pokemon: result.data.pokemon_entries
  //         })
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         })
  //       }
  //     )
  //   axios.get("https://pokeapi.co/api/v2/item/?limit=200")
  //     .then(
  //       (result) => {
  //         console.log(result)
  //         // console.log('Sun Stone?: ', result.data.results[79].name)
  //         this.setState({
  //           isLoaded: true,
  //           items: result.data.results
  //         })
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         })
  //       }
  //     )
  // }

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
      } else {
        return <div>
          <p>Experience: {data.pokemon_species.experience}</p>
          <p>Level: {data.pokemon_species.level}</p>
        </div>
      }
    })

    const backpackList = this.state.backpack.map((data, index) =>
      <li key={index}>
        <span onClick={() => this.handleBackpackDetailClick(index)}>{data.pokemon_species.name}</span>
        <span onClick={() => this.handleDeleteFromBackpack(index)}>X</span>
        {details(data)}
      </li>
    )

    const { error, isLoaded, pokemon} = this.state
      if(error) {
        return <div>Error: {error.message}</div>
      } else if(!isLoaded) {
        return <div>Loading...</div>
      } else {
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
}

export default Backpack;
