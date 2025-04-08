import React, { useState } from 'react';
import { first151Pokemon, getFullPokedexNumber } from '../Utlis';

const SideNav = (props) => {
  const { selectedPokemon, setSelectedPokemon } = props;

  // For SEARCH
  const [searchValue, setSearchValue] = useState('');

  //Two search methods:  "pokedex number"  & "Pokemon name"
  const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
    // 1]. If the pokedex NUMBER includes the current search value, then return true and keep the value in the array

    if (getFullPokedexNumber(eleIndex).includes(searchValue)) {
      return true; // Keep this item in the filtered list.
    }

    // 2]. If the pokemon NAME includes the current search value, return TRUE  keep the value in the array
    if (ele.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
      return true; // Keep this item in the filtered list.
    }

    // 3]. Otherwise , exclude from the array
    return false; // Leave this item out of the filtered list.
  });

  return (
    <>
      <nav>
        <div className={'header'}>
          <h1 className='text-gradient'>Pokedex</h1>
        </div>
        {/* For SEARCH purpose */}
        <input
          placeholder='Eg 001 or Bulbasaur...'
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        {/* Initially 'search' ko code na lekhda "first151Pokemon.map()" thyo
        tara filter gare paxi "filteredPokemon.map()" bhayeko ho */}
        {filteredPokemon.map((pokemon, pokemonIndex) => {
          return (
            <button
              key={pokemonIndex}
              className={
                'nav-card' +
                (pokemonIndex === selectedPokemon ? 'nav-card-selected' : '')
              }
              onClick={() => {
                setSelectedPokemon(first151Pokemon.indexOf(pokemon));
              }}
            >
              {/* Individual pokemon ko respective number pauna ko lagi */}
              {getFullPokedexNumber(first151Pokemon.indexOf(pokemon))} {'   '}
              {pokemon}
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default SideNav;
