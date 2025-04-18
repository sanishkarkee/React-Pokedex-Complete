//Its used to render out the type of pokemon, If its "poison", "fyling","still", "normal", "water"

import React from 'react';
import { pokemonTypeColors } from '../Utlis';

const TypeCard = (props) => {
  const { type } = props;

  console.log('In TypeCard.jsx: ', type);
  return (
    <>
      <div
        className='type-tile'
        style={{
          color: pokemonTypeColors?.[type]?.color,
          background: pokemonTypeColors?.[type]?.background,
        }}
      >
        <p>{type}</p>
      </div>
    </>
  );
};

export default TypeCard;
