import React from 'react';
import { first151Pokemon, getFullPokedexNumber } from '../Utlis';

const SideNav = () => {
  return (
    <>
      <nav>
        <div className={'header'}>
          <h1 className='text-gradient'>Pokedex</h1>
        </div>

        <input />

        {first151Pokemon.map((pokemon, pokemonIndex) => {
          return (
            <button className={'nav-card'} key={pokemonIndex}>
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
