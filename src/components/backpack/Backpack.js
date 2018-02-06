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
import charmanderData from '../../data/pokemon/charmander.json';
import poliwhirlData from '../../data/pokemon/poliwhirl.json';


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
    this.copy = this.copy.bind(this)
    this.buildPokemon = this.buildPokemon.bind(this)
  }

  componentDidMount() {
    // pokemonData.pokemon_entries.forEach((pokemon) => {
      // pokemon.pokemon_species.level = 1
      // pokemon.pokemon_species.experience = 0
      // make a GET request for individual pokemon data from pokemon_species url
      // const flavorTextObj = poliwhirlData.flavor_text_entries.find((element) => {
      //   return element.version.name === ("red" || "yellow" || "blue")
      // })
      // pokemon.pokemon_species.description = flavorTextObj.flavor_text
      // pokemon.pokemon_species.growth_rate = mediumSlow.levels
      // pokemon.pokemon_species.evolution_chain = pikachu.chain
    // })
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
          // console.log(item)
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
    // axios.get("https://www.pokeapi.co/api/v2/pokedex/2/")
    //   .then(
    //     (result) => {
    //       console.log('result: ', result)
    //
    //       this.setState({
    //         isLoaded: true,
    //         pokemon: result.data.pokemon_entries
    //       })
    //     },
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       })
    //     }
    //   )
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
        console.log("species result: ", result);
        console.log('pokemonCopy[index]: ', pokemonCopy[index]);
        console.log('flavorTextObj: ', flavorTextObj(result.data));
        pokemonCopy[index].pokemon_species.description = flavorTextObj(result.data).flavor_text
        return result
      })
      .then((result) => {
        axios.get(result.data.growth_rate.url)
          .then((result) => {
            console.log("growth_rate result: ", result);
            pokemonCopy[index].pokemon_species.growth_rate = result.data.levels
          })
          return result
      })
      .then((result) => {
        axios.get(result.data.evolution_chain.url)
          .then((result) => {
            console.log("evolution_chain result: ", result);
            pokemonCopy[index].pokemon_species.evolution_chain = result.data.chain
          })
      })
      .catch((err) => {
        console.log('error: ', err);
      })
      return pokemonCopy[index]
  }

  handlePokemonClick(index){
    console.log('pokemon added')

    const backpackCopy = this.state.backpack.slice()
    const pokemonCopy = this.copy(this.state.pokemon)
    pokemonCopy[index].pokemon_species.experience = 0
    pokemonCopy[index].pokemon_species.level = 1

    backpackCopy.push(this.buildPokemon(index, pokemonCopy))
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
    backpackCopy[index].pokemon_species.experience += 20

    backpackCopy[index].pokemon_species.growth_rate.map((levelInfo) => {
      if(backpackCopy[index].pokemon_species.level === levelInfo.level) {
        if(backpackCopy[index].pokemon_species.experience >= levelInfo.experience) {
          backpackCopy[index].pokemon_species.level++
          console.log(backpackCopy[index])
        }
      }
    })

    let evolutionChain = backpackCopy[index].pokemon_species.evolution_chain
    while(backpackCopy[index].pokemon_species.name != evolutionChain.species.name) {
      evolutionChain = evolutionChain.evolves_to[0]
    }
    if(backpackCopy[index].pokemon_species.level === evolutionChain.evolves_to[0].evolution_details[0].min_level) {

        const pokemonCopy = this.copy(this.state.pokemon)
        if(pokemonCopy[backpackCopy[index].entry_number - 1].pokemon_species.name === evolutionChain.species.name) {

          pokemonCopy[backpackCopy[index].entry_number].pokemon_species.experience = backpackCopy[index].pokemon_species.experience
          pokemonCopy[backpackCopy[index].entry_number].pokemon_species.level = backpackCopy[index].pokemon_species.level

          backpackCopy.splice(index, 1, this.buildPokemon(backpackCopy[index].entry_number, pokemonCopy))
        }
    }

    this.setState({backpack: backpackCopy})
  }

  handleUseItemClick (index) {
    const backpackCopy = this.state.backpack
    backpackCopy.forEach((content, contentIndex) => {
      if(content.pokemon_species != undefined) {

        if (backpackCopy[index].effect.includes(content.pokemon_species.name)) {
          let evolutionChain = backpackCopy[contentIndex].pokemon_species.evolution_chain
          while(content.pokemon_species.name != evolutionChain.species.name) {
            evolutionChain = evolutionChain.evolves_to[0]
          }

           const pokemonCopy = this.copy(this.state.pokemon)
           if(backpackCopy[index].effect.includes(pokemonCopy[content.entry_number].pokemon_species.name)) {

             pokemonCopy[content.entry_number].pokemon_species.experience = content.pokemon_species.experience
             pokemonCopy[content.entry_number].pokemon_species.level = content.pokemon_species.level

             backpackCopy.splice(contentIndex, 1, this.buildPokemon(content.entry_number, pokemonCopy))
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
            <p>Description: {data.pokemon_species.description}</p>
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
