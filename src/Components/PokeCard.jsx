import React, { useEffect, useState } from 'react';
import { getFullPokedexNumber, getPokedexNumber } from '../Utlis';
import TypeCard from './TypeCard';
import Modal from './Modal';

//'selectedPokemon' ma chai pokemon ko order anusar 'NUMBER' aauxa
const PokeCard = (props) => {
  const { selectedPokemon } = props;

  // For TYPE 1 fetching data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // For MODAL (to show-hide modal) , "skill:true => show modal" or dont show
  const [skill, setSkill] = useState(null);
  const [loadingSkill, setLoadingSkill] = useState(false);

  // destructuring datas information from TYPE 1 API call
  const { name, height, abilities, stats, types, moves, sprites } = data || {};

  // FILTERING IMAGES.  Object.keys(sprites): returns an array of keys from the sprites object.   sprites ={name:'ram', age:24, roll:121} >> returns name, age, roll
  const imgList = Object.keys(sprites || {}).filter((val) => {
    if (!sprites[val]) {
      return false;
    }

    if (['versions', 'other'].includes(val)) {
      return false;
    }

    return true;
  });

  // TYPE 1: Fetching the data from the API using useEffect()
  useEffect(() => {
    //1 If 'loading || dont have access to localstorage', then exit loop
    if (loading || !localStorage) {
      return;
    }

    //2 Check the selected Pokemon is available in the cache
    //2.1  Define the cache,,  Eg: cache = { {a}, {b}, {c}, {d},...}
    let cache = {};

    //Get all the values from localstorage and storing it to 'cache'
    if (localStorage.getItem('pokedex')) {
      cache = JSON.parse(localStorage.getItem('pokedex'));
    }

    //2.2  Check wether the selected pokemon is in the cache , Otherwise fetch from the API
    if (selectedPokemon in cache) {
      //Read from cache, Eg: cache = { {a}, {b}, {c}, {d},...}
      setData(cache[selectedPokemon]);
      console.log('Found pokemon in cache');
      return;
    }

    //Here the data isnt available in the cache so we need to fetch from the API
    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseUrl = 'https://pokeapi.co/api/v2/';
        const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon);
        const finalUrl = baseUrl + suffix;

        const res = await fetch(finalUrl);
        const pokemonData = await res.json();
        setData(pokemonData);
        console.log('Fetched pokemon data');

        //Storedata in the cache,Eg:"cache[1] = {ram} >>> cache={ {a}, {ram}, {c},..}"
        cache[selectedPokemon] = pokemonData;
        //Push the cache data to localstorage
        localStorage.setItem('pokedex', JSON.stringify(cache));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();

    //2.3  If we fetch from the API, make sure to save the inforamtion to the cache for next time
  }, [selectedPokemon]);

  // TYPE 2: Fetching the 'moves data' from the API without useEffect() when the user clicks on the 'moves button' to display the skill
  const fetchMoveData = async (move, moveUrl) => {
    if (loadingSkill || !localStorage || !moveUrl) {
      return;
    }

    let c = {};
    if (localStorage.getItem('pokemon-moves')) {
      c = JSON.parse(localStorage.getItem('pokemon-moves'));
    }

    if (move in c) {
      setSkill(c[move]);
      console.log('Found moves in cache');
      return;
    }

    try {
      setLoadingSkill(true);

      const res = await fetch(moveUrl);
      const moveData = await res.json();
      console.log('Fetched moves from API', moveData);

      const description = moveData?.flavor_text_entries.filter((val) => {
        return (val.version_group.name = 'firered-leafgreen');
      })[0].flavor_text;

      //Data finally GET gare paxiobject ko form ma transform gareko
      const skillData = {
        name: move,
        description,
      };

      setSkill(skillData);
      c[move] = skillData;
      localStorage.setItem('pokemon-moves', JSON.stringify(c));
    } catch (error) {
      console.log('Error is encountered', error.message);
    } finally {
      setLoadingSkill(false);
    }
  };

  if (loading || !data) {
    return (
      <img
        src='/loading_gif/loading_icon.gif'
        alt='loader-img'
        style={{ width: '200px', height: '200px', marginTop: '20px' }}
      />
    );
  }

  return (
    <>
      <div className='poke-card'>
        {/* ------------POKE NUMBER + NAME ( 001  Bulbasaur)----------------- */}
        <div>
          <h4># {getFullPokedexNumber(selectedPokemon)}</h4>
          <h2>{name}</h2>
        </div>

        {/* ---------POKEMON TYPES (Eg: Grass, Fire, electric, ice)-------------- */}
        <div className='type-container'>
          {types.map((typeObj, typeIndex) => {
            return <TypeCard key={typeIndex} type={typeObj?.type?.name} />;
          })}
        </div>

        {/* -----------------------IMAGES - Main big image----------------- */}
        <img
          className='default-img'
          src={'pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'}
          alt={`${name}-large-img`}
        />

        {/* ---------------------------SMALL IMAGES LIST------------------------ */}
        <div className='img-container'>
          {imgList.map((spriteUrl, spriteIndex) => {
            const imgUrl = sprites[spriteUrl];
            return (
              <img
                key={spriteIndex}
                src={imgUrl}
                alt={`${name}-img-${spriteUrl}`}
              />
            );
          })}
        </div>

        {/* -----------STATS  ( eg: Hp 45, Attack  60 )------------------- */}
        <h3>STATS</h3>
        <div className='stats-card'>
          {stats.map((statObj, statIndex) => {
            const { base_stat, stat } = statObj;
            return (
              <div key={statIndex} className='stat-item'>
                <p>{stat?.name.replaceAll('-', ' ')}</p>
                <h4>{base_stat}</h4>
              </div>
            );
          })}
        </div>

        {/* ------------------------MOVES + MODAL--------------------------- */}
        <h3>Moves</h3>
        <div className='pokemon-move-grid'>
          {/* <Modal></Modal> bhitra ko jati pani html xa aba as a children props pass hunxa <Modal/> component ma */}
          {skill && (
            <Modal
              handleCloseModal={() => {
                setSkill(null);
              }}
            >
              <div>
                <h6>Name</h6>
                <h2 className='skill-name'>
                  {skill.name.replaceAll('-', '  ')}
                </h2>
              </div>

              <div>
                <h6>Description</h6>
                <h2>{skill.description}</h2>
              </div>
            </Modal>
          )}

          {moves.map((moveObj, moveIndex) => {
            return (
              <button
                key={moveIndex}
                className='button-card pokemon-move'
                onClick={() => {
                  fetchMoveData(moveObj?.move?.name, moveObj?.move?.url);
                }}
              >
                <p> {moveObj?.move?.name.replaceAll('-', ' ')}</p>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PokeCard;

/*

  MAIN POINTS:
    1. Yo component ma hamilai API ko data use garnu xa so ,API lai yo component ma call garne

    2. Ani arko kura, hamile <sideNav/> ma jun pokemon select garekonxau tyo pokemon ko data matra API bata fetch garera dekhaunu parxa, ani data Parent to child component ma matra pass hune bhayeko le app.jsx ma "selected pokemon" store ra pass garna lai useState banaune

    3. We fetch the information to display on the screen once our page is fully loaded and we do it using the "useEffect" hook. "
    "selectedPokemon" ko value change hune bittikai, naya information re-download or re-fetch garnu parxa so "dependecny" ma "selectedPokemon" pass gareko ho

    4. if(loading || !localstorage) { return }
    - Prevent multiple API calls
    - Example:
        You click on Pikachu → The app starts fetching data While Pikachu is loading, you click Charmander.The app should not send another request until Pikachu’s data is  fetched.
      (This is why we check if (loading) return;)

    - Prevent errors when localStorage is missing
    - Example:
        Your app tries to store the last selected Pokémon in localStorage. But some browsers disable localStorage (e.g., incognito mode). If localStorage is unavailable, trying to access it could cause an error.
      (This is why we check if (!localStorage) return;)

*/
