import React, { Component } from 'react';
import './DataContainer.css';
import axios from 'axios';
import Backpack from '../backpack/Backpack';
import PokemonList from '../pokemon/PokemonList';
import ItemList from '../item/ItemList';
import pokemonData from '../../data/pokemonData.json';
import itemsData from '../../data/itemsData.json';

class DataContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoadedPokemon: false,
      isLoadedItems: false,
      backpack: [],
      pokemon: [],
      items: []
    }
    this.handlePokemonClick = this.handlePokemonClick.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleDeleteFromBackpack = this.handleDeleteFromBackpack.bind(this)
    this.handleBackpackDetailClick = this.handleBackpackDetailClick.bind(this)
    this.handleAddExperienceClick = this.handleAddExperienceClick.bind(this)
    this.handleUseItemClick = this.handleUseItemClick.bind(this)
    this.copy = this.copy.bind(this)
    this.buildPokemon = this.buildPokemon.bind(this)
    this.buildItem = this.buildItem.bind(this)
    this.evolvePokemonByItem = this.evolvePokemonByItem.bind(this)

  }

  componentDidMount() {
    this.setState({
      isLoadedPokemon: true,
      isLoadedItems: true,
      pokemon: pokemonData.pokemon_entries,
      items: itemsData.results
    })
  }

  // componentDidMount() {
  //   axios.get("https://www.pokeapi.co/api/v2/pokedex/2/")
  //     .then(
  //       (result) => {
  //
  //         this.setState({
  //           isLoadedPokemon: true,
  //           pokemon: result.data.pokemon_entries
  //         })
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoadedPokemon: true,
  //           error
  //         })
  //       }
  //     )
  //   axios.get("https://pokeapi.co/api/v2/item/?limit=200")
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoadedItems: true,
  //           items: result.data.results
  //         })
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoadedItems: true,
  //           error
  //         })
  //       }
  //     )
  // }

  // creates a deep copy of an array
  copy(obj){
    let output
    let value
    let key

    output = Array.isArray(obj) ? [] : {}
    for(key in obj) {
      value = obj[key]
      output[key] = (typeof value === "object") ? this.copy(value) : value
    }
    return output
  }

  // builds one pokemon obj
  buildPokemon(index, pokemonCopy){
    // find kanto region pokemon description
    const flavorTextObj = (pokemon) =>
      pokemon.flavor_text_entries.find((element) => {
        return element.version.name === ("red" || "yellow" || "blue")
      })

    axios.get(pokemonCopy[index].pokemon_species.url)
      .then((result) => {
        pokemonCopy[index].pokemon_species.description = flavorTextObj(result.data).flavor_text
        return result
      })
      .then((result) => {
        axios.get(result.data.growth_rate.url)
          .then((result) => {
            pokemonCopy[index].pokemon_species.growth_rate = result.data.levels
          })
          return result
      })
      .then((result) => {
        axios.get(result.data.evolution_chain.url)
          .then((result) => {
            pokemonCopy[index].pokemon_species.evolution_chain = result.data.chain
          })
      })
      .catch((err) => {
        console.error('error: ', err);
      })
      return pokemonCopy[index]
  }

  // builds one item obj
  buildItem(index, itemCopy){
    axios.get(itemCopy[index].url)
      .then((result) => {
        itemCopy[index].effect = result.data.effect_entries[0].effect
        return result
      })
      .catch((err) => {
        console.error('error: ', err);
      })
      return itemCopy[index]
  }

  evolvePokemonByItem(index, contentIndex, contentEntryNumber, backpackCopy, content) {
    const pokemonCopy = this.copy(this.state.pokemon)

    if(backpackCopy[index].effect.includes(pokemonCopy[contentEntryNumber].pokemon_species.name)) {
      pokemonCopy[contentEntryNumber].pokemon_species.experience = content.pokemon_species.experience
      pokemonCopy[contentEntryNumber].pokemon_species.level = content.pokemon_species.level

      backpackCopy.splice(contentIndex, 1, this.buildPokemon(contentEntryNumber, pokemonCopy))
    }
  }

  handlePokemonClick(index){
    const backpackCopy = this.state.backpack.slice()
    const pokemonCopy = this.copy(this.state.pokemon)
    pokemonCopy[index].pokemon_species.experience = 0
    pokemonCopy[index].pokemon_species.level = 1

    backpackCopy.push(this.buildPokemon(index, pokemonCopy))
    this.setState({
      backpack: backpackCopy
    })
  }

  handleItemClick(index){
    const backpackCopy = this.state.backpack.slice()
    const itemCopy = this.copy(this.state.items)

    backpackCopy.push(this.buildItem(index, itemCopy))
    this.setState({
      backpack: backpackCopy
    })
  }

  handleDeleteFromBackpack(index) {
    const backpackCopy = this.state.backpack.slice()
    backpackCopy.splice(index, 1)
    this.setState({
      backpack: backpackCopy
    })
  }

  handleBackpackDetailClick(index) {
    const backpackCopy = this.state.backpack.slice()
    backpackCopy[index] = Object.assign({}, backpackCopy[index])
    backpackCopy[index].showDetails = !backpackCopy[index].showDetails
    this.setState({backpack: backpackCopy})
  }

  handleAddExperienceClick(index) {
    const backpackCopy = this.state.backpack.slice()
    backpackCopy[index].pokemon_species.experience += 20

    backpackCopy[index].pokemon_species.growth_rate.map((levelInfo) => {
      if(backpackCopy[index].pokemon_species.level === levelInfo.level) {
        if(backpackCopy[index].pokemon_species.experience >= levelInfo.experience) {
          backpackCopy[index].pokemon_species.level++
        }
      }
    })

    let evolutionChain = backpackCopy[index].pokemon_species.evolution_chain
    while(backpackCopy[index].pokemon_species.name !== evolutionChain.species.name) {
      evolutionChain = evolutionChain.evolves_to[0]
    }

    if(evolutionChain.evolves_to.length !== 0) {
      if(backpackCopy[index].pokemon_species.level === evolutionChain.evolves_to[0].evolution_details[0].min_level) {

        const pokemonCopy = this.copy(this.state.pokemon)
        if(pokemonCopy[backpackCopy[index].entry_number - 1].pokemon_species.name === evolutionChain.species.name) {

          pokemonCopy[backpackCopy[index].entry_number].pokemon_species.experience = backpackCopy[index].pokemon_species.experience
          pokemonCopy[backpackCopy[index].entry_number].pokemon_species.level = backpackCopy[index].pokemon_species.level

          backpackCopy.splice(index, 1, this.buildPokemon(backpackCopy[index].entry_number, pokemonCopy))
        }
      }
    }
    this.setState({backpack: backpackCopy})
  }

  handleUseItemClick (index) {
    const backpackCopy = this.state.backpack
    backpackCopy.forEach((content, contentIndex) => {
      if((content.pokemon_species !== undefined) && (backpackCopy[index].effect !== undefined)) {
        if (backpackCopy[index].effect.includes(content.pokemon_species.name)) {
          let evolutionChain = backpackCopy[contentIndex].pokemon_species.evolution_chain
          while(content.pokemon_species.name !== evolutionChain.species.name) {
            evolutionChain = evolutionChain.evolves_to[0]
          }

          const pokemonCopy = this.copy(this.state.pokemon)
          this.evolvePokemonByItem(index, contentIndex, content.entry_number, backpackCopy, content)
          this.evolvePokemonByItem(index, contentIndex, content.entry_number + 1, backpackCopy, content)
          this.evolvePokemonByItem(index, contentIndex, content.entry_number + 2, backpackCopy, content)
        }
      }
    })
    this.setState({backpack: backpackCopy})
  }

  render() {
    const { error, isLoadedPokemon, isLoadedItems, pokemon} = this.state
      if(error) {
        return <div>Error: {error.message}</div>
      } else if(!isLoadedPokemon || !isLoadedItems) {
        return <div>Loading...</div>
      } else {
        return (
          <div className="DataContainer">
            <Backpack
              backpack={this.state.backpack}
              onAddExperienceClick={this.handleAddExperienceClick}
              onBackpackDetailClick={this.handleBackpackDetailClick}
              onDeleteFromBackpack={this.handleDeleteFromBackpack}
              onUseItemClick={this.handleUseItemClick}
            />
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

export default DataContainer;
