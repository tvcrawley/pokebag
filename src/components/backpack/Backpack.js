import React from 'react';
import './Backpack.css';

function Backpack (props) {

  // toggle backpack content details
  const details = ((data, index) => {
    // render nothing if showDetails is false
    // otherwise render backpack content details
    if(!data.showDetails) {
      return null
    } else {
      // if the content is a pokemon, render detailed pokemon data and functionality
      // if the content is an evolution item, render a user warning message and
      // detailed evolution item data
      // if the content is not an evolution item, render detailed item data
        if ((data.pokemon_species !== undefined) && (data.pokemon_species.description !== undefined)) {
          return <div>
            <p>
              Experience: {data.pokemon_species.experience}
              <span onClick={() => props.onAddExperienceClick(index)}>+</span>
            </p>
            <p>Level: {data.pokemon_species.level}</p>
            <p>Description: {data.pokemon_species.description}</p>
          </div>
        }  else if ((data.effect !== undefined) && (data.name.includes('-stone'))) {
            return <div>
              <p>Warning: Evolution stones are powerful! Make sure you don't accidentally evolve a Pokemon with the same evolution trigger.</p>
              <p>
                Effect: {data.effect}
              </p>
            </div>
        } else if(data.effect !== undefined) {
            return <div>
              <p>
                Effect: {data.effect}
              </p>
            </div>
        }
    }
  })

  // loop through backpack array
  // if the content is a pokemon, render pokemon data and functionality
  // if the content is an evolution item, render evolution item data and functionality
  // if the content is not an evolution item, render item data and functionality
  const backpackList = props.backpack.map((data, index) => {
    if (data.pokemon_species !== undefined) {
      return (
        <li key={index}>
          <span onClick={() => props.onBackpackDetailClick(index)}>{data.pokemon_species.name}</span>
          <span onClick={() => props.onDeleteFromBackpack(index)}>X</span>
          {details(data, index)}
        </li>
      )
    } else if ((data.effect !== undefined) && (data.name.includes('-stone'))) {
        return (
          <li key={index}>
            <span onClick={() => props.onBackpackDetailClick(index)}>{data.name}</span>
            <span onClick={() => props.onUseItemClick(index)}>Use</span>
            <span onClick={() => props.onDeleteFromBackpack(index)}>X</span>
            {details(data, index)}
          </li>
        )
    } else {
        return (
          <li key={index}>
            <span onClick={() => props.onBackpackDetailClick(index)}>{data.name}</span>
            <span onClick={() => props.onDeleteFromBackpack(index)}>X</span>
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

export default Backpack;
