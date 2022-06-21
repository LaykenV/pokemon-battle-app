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
      const type : string = pokemon.types[0].type.name;
      pokemons.push({ id, name, frontImage, backImage, hp, attack, defense, specialAttack, specialDefense, speed, type })
    }
    setPokemons(pokemons);
    console.log(pokemons);
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
        <Route path="/" element={<HomePage pokemons={pokemons} handleNextArrow={handleNextArrow} handleLastArrow={handleLastArrow}/>} />
        <Route path="/battle" element={<BattlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
