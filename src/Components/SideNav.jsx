import React from 'react';
import { first151Pokemon, getFullPokedexNumber } from '../Utlis';

const SideNav = (props) => {
  const { selectedPokemon, setSelectedPokemon } = props;

  return (
    <>
      <nav>
        <div className={'header'}>
          <h1 className='text-gradient'>Pokedex</h1>
        </div>

        <input />

        {first151Pokemon.map((pokemon, pokemonIndex) => {
          return (
            <button
              key={pokemonIndex}
              className={
                'nav-card' +
                (pokemonIndex === selectedPokemon ? 'nav-card-selected' : '')
              }
              onClick={() => {
                setSelectedPokemon(pokemonIndex);
              }}
            >
              {getFullPokedexNumber(pokemonIndex)} {'   '}
              {pokemon}
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default SideNav;
