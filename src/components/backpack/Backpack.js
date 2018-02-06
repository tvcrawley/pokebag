import React, { Component } from 'react';
import './Backpack.css';

class Backpack extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const details = ((data, index) => {
      if(!data.showDetails) {
        return null
      } else {
        if ((data.pokemon_species != undefined) && (data.pokemon_species.description != undefined)) {
          return <div>
            <p>
              Experience: {data.pokemon_species.experience}
              <span onClick={() => this.props.onAddExperienceClick(index)}>+</span>
            </p>
            <p>Level: {data.pokemon_species.level}</p>
            <p>Description: {data.pokemon_species.description}</p>
          </div>
        } else if(data.effect != undefined) {
          return <div>
            <p>
              Effect: {data.effect}
            </p>
          </div>
        }
      }
    })

    const backpackList = this.props.backpack.map((data, index) => {
      if (data.pokemon_species != undefined) {
        return (<li key={index}>
          <span onClick={() => this.props.onBackpackDetailClick(index)}>{data.pokemon_species.name}</span>
          <span onClick={() => this.props.onDeleteFromBackpack(index)}>X</span>
          {details(data, index)}
        </li>)
      } else {
          return (
            <li key={index}>
              <span onClick={() => this.props.onBackpackDetailClick(index)}>{data.name}</span>
              <span onClick={() => this.props.onUseItemClick(index)}>Use</span>
              <span onClick={() => this.props.onDeleteFromBackpack(index)}>X</span>
              {details(data, index)}
            </li>
          )
        }
    })
    return (
      <div className="Backpack">
        <h2>Backpack</h2>
          {backpackList}
      </div>
    );
  }
}

export default Backpack;
