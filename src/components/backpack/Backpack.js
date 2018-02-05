import React, { Component } from 'react';
import './Backpack.css';
import axios from 'axios';
import PokemonList from '../pokemon/PokemonList';
import ItemList from '../item/ItemList';
import pokemonData from '../../data/pokemonData.json';
import itemsData from '../../data/itemsData.json';
import mediumSlow from '../../data/growth-rate/mediumSlow.json';
import sunStone from '../../data/itemDetails/sunStone.json';
import thunderStone from '../../data/itemDetails/thunderStone.json';
import moonStone from '../../data/itemDetails/moonStone.json';
import fireStone from '../../data/itemDetails/fireStone.json';
import waterStone from '../../data/itemDetails/waterStone.json';
import leafStone from '../../data/itemDetails/leafStone.json';
import pikachu from '../../data/evolution/pikachu.json';
import poliwag from '../../data/evolution/poliwag.json';
import charmander from '../../data/evolution/charmander.json';


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
    this.handleAddExperienceClick = this.handleAddExperienceClick.bind(this)
  }

  componentDidMount() {
    pokemonData.pokemon_entries.forEach((pokemon) => {
      pokemon.pokemon_species.level = 1
      pokemon.pokemon_species.experience = 0
    })
    itemsData.results.forEach((item) => {
      switch(item.name) {
        case 'sun-stone':
          item.effect = sunStone.effect_entries[0].effect
          break
        case 'thunder-stone':
          item.effect = thunderStone.effect_entries[0].effect
          break
        case 'moon-stone':
          item.effect = moonStone.effect_entries[0].effect
          break
        case 'fire-stone':
          item.effect = fireStone.effect_entries[0].effect
          break
        case 'water-stone':
          item.effect = waterStone.effect_entries[0].effect
          break
        case 'leaf-stone':
          item.effect = leafStone.effect_entries[0].effect
          break
        default:
          console.log(item)
          break
      }

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

    // creates a deep copy of an array
    const copy = (obj) => {
      let output
      let value
      let key

      output = Array.isArray(obj) ? [] : {}
      for(key in obj) {
        value = obj[key]
        output[key] = (typeof value === "object") ? copy(value) : value
      }
      return output
    }

    const backpackCopy = this.state.backpack.slice()
    const pokemonCopy = copy(this.state.pokemon)

    backpackCopy.push(pokemonCopy[index])
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

  handleAddExperienceClick(index) {
    const backpackCopy = this.state.backpack.slice()
    backpackCopy[index].pokemon_species.experience += 5

    mediumSlow.levels.map((levelInfo) => {
      if(backpackCopy[index].pokemon_species.level === levelInfo.level) {
        if(backpackCopy[index].pokemon_species.experience >= levelInfo.experience) {
          backpackCopy[index].pokemon_species.level++
          console.log(backpackCopy[index])
        }
      }
    })

    let apiData = charmander.chain
    while(backpackCopy[index].pokemon_species.name != apiData.species.name) {
      apiData = apiData.evolves_to[0]
    }
    if(backpackCopy[index].pokemon_species.level === apiData.evolves_to[0].evolution_details[0].min_level) {

        // creates a deep copy of an array
        const copy = (obj) => {
          let output
          let value
          let key

          output = Array.isArray(obj) ? [] : {}
          for(key in obj) {
            value = obj[key]
            output[key] = (typeof value === "object") ? copy(value) : value
          }
          return output
        }

        const pokemonCopy = copy(this.state.pokemon)
        if(pokemonCopy[backpackCopy[index].entry_number - 1].pokemon_species.name === apiData.species.name) {

          pokemonCopy[backpackCopy[index].entry_number].pokemon_species.experience = backpackCopy[index].pokemon_species.experience
          pokemonCopy[backpackCopy[index].entry_number].pokemon_species.level = backpackCopy[index].pokemon_species.level

          backpackCopy.splice(index, 1, pokemonCopy[backpackCopy[index].entry_number])
          backpackCopy.splice(index + 1, 1)
        }
    }

    this.setState({backpack: backpackCopy})
  }

  handleUseItemClick (index) {
    const backpackCopy = this.state.backpack
    backpackCopy.forEach((content, contentIndex) => {
      if(content.pokemon_species != undefined) {

        if (backpackCopy[index].effect.includes(content.pokemon_species.name)) {
          let apiData = pikachu.chain
          while(content.pokemon_species.name != apiData.species.name) {
            apiData = apiData.evolves_to[0]
          }

           // creates a deep copy of an array
           const copy = (obj) => {
             let output
             let value
             let key

             output = Array.isArray(obj) ? [] : {}
             for(key in obj) {
               value = obj[key]
               output[key] = (typeof value === "object") ? copy(value) : value
             }
             return output
           }

           const pokemonCopy = copy(this.state.pokemon)
           if(backpackCopy[index].effect.includes(pokemonCopy[content.entry_number].pokemon_species.name)) {

             pokemonCopy[content.entry_number].pokemon_species.experience = content.pokemon_species.experience
             pokemonCopy[content.entry_number].pokemon_species.level = content.pokemon_species.level

             backpackCopy.splice(contentIndex, 1, pokemonCopy[content.entry_number])
             backpackCopy.splice(contentIndex + 1, 1)
           }
         }
      }
    })
    this.setState({backpack: backpackCopy})
  }

  render() {
    const details = ((data, index) => {
      if(!data.showDetails) {
        return null
      } else {
        if (data.pokemon_species != undefined) {
          return <div>
            <p>
              Experience: {data.pokemon_species.experience}
              <span onClick={() => this.handleAddExperienceClick(index)}>+</span>
            </p>
            <p>Level: {data.pokemon_species.level}</p>
          </div>
        } else {
          return <div>
            <p>
              Effect: {data.effect}
            </p>
          </div>
        }

      }
    })

    const backpackList = this.state.backpack.map((data, index) => {
    if (data.pokemon_species != undefined) {
      return (<li key={index}>
        <span onClick={() => this.handleBackpackDetailClick(index)}>{data.pokemon_species.name}</span>
        <span onClick={() => this.handleDeleteFromBackpack(index)}>X</span>
        {details(data, index)}
      </li>)
    } else {
      return (<li key={index}>
        <span onClick={() => this.handleBackpackDetailClick(index)}>{data.name}</span>
        <span onClick={() => this.handleUseItemClick(index)}>Use</span>
        <span onClick={() => this.handleDeleteFromBackpack(index)}>X</span>
        {details(data, index)}
      </li> )
    }
  })

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
