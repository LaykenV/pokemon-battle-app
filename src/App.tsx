import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import BattlePage from './components/battlePage';
import HomePage from './components/homePage';

type pokemonArray = {
  id: number;
  name: string;
  frontImage: string;
  backImage: string;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  type: string;
}
function App() {
  const [pokemons, setPokemons] = useState([] as pokemonArray[]);
  const [yourPokemons, setYourPokemons] = useState([] as pokemonArray[]);
  const [a, setA] = useState(1);
  const [b, setB] = useState(10);

  const enemyPokemons = [
    {
      id: 3,
      name: "Venesaur",
      frontImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      backImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png",
      hp: 80,
      attack: 82,
      defense: 83,
      specialAttack: 100,
      specialDefense: 100,
      speed: 80,
      type: "Grass"
    },
    {
      id: 6,
      name: "Charizard",
      frontImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
      backImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png",
      hp: 78,
      attack: 84,
      defense: 78,
      specialAttack: 109,
      specialDefense: 85,
      speed: 100,
      type: "Fire"
    },
    {
      id: 9,
      name: "Blastoise",
      frontImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
      backImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
      hp: 79,
      attack: 83,
      defense: 100,
      specialAttack: 85,
      specialDefense: 105,
      speed: 78,
      type: "Water"
    }
  ]


  const fetchPokemons = async (a:number, b:number) => {
    const pokemons: pokemonArray[] = [];
    for (let i = a; i <= b; i++) {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`
      const response = await fetch(pokemonUrl)
      const pokemon = await response.json()
      const id : number = pokemon.id;
      const name = capitalizeFirstLetter(pokemon.name)
      const frontImage: string = pokemon.sprites.front_default;
      const backImage : string = pokemon.sprites.back_default;
      const hp : number = pokemon.stats[0].base_stat;
      const attack : number = pokemon.stats[1].base_stat;
      const defense : number = pokemon.stats[2].base_stat;
      const specialAttack : number = pokemon.stats[3].base_stat;
      const specialDefense : number = pokemon.stats[4].base_stat;
      const speed : number = pokemon.stats[5].base_stat;
      const type : string = capitalizeFirstLetter(pokemon.types[0].type.name);
      pokemons.push({ id, name, frontImage, backImage, hp, attack, defense, specialAttack, specialDefense, speed, type })
    }
    setPokemons(pokemons);    
  }

  useEffect(() => {
    fetchPokemons(a,b);    
  }, []);

  useEffect(() => {
    fetchPokemons(a,b);    
  }, [b]);

  const capitalizeFirstLetter = (string:string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleCardClick = (e:any) => {
    const pokemonName = e.target.parentNode.parentNode.firstChild.lastChild.textContent;
    const clickedPokemon:any = pokemons.filter(pokemon => {
      return pokemon.name === pokemonName;
    });    
    setYourPokemons((prevState) => [...prevState, clickedPokemon[0]]);        
  }

  const handleNextArrow = () => {
    setA(a + 10);
    setB(b + 10);    
  }

  const handleLastArrow = () => {
    if (a > 1 && b > 10) {
      setA(a - 10);
      setB(b - 10)
    }    
  }


  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<HomePage pokemons={pokemons} enemyPokemons={enemyPokemons} yourPokemons={yourPokemons} handleNextArrow={handleNextArrow} handleLastArrow={handleLastArrow} handleCardClick={handleCardClick}/>} />
        <Route path="/battle" element={<BattlePage enemyPokemons={enemyPokemons} yourPokemons={yourPokemons} setYourPokemons={setYourPokemons}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
