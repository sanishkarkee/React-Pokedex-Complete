import React from 'react';

const PokeCard = () => {
  return (
    <>
      <div>Poke card</div>
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
