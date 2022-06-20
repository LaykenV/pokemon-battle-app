import React, { useState, useEffect } from 'react';
import "./homePage.css";
import ball from "./images/pokemonball.png";
import trainerRed from "./images/trainerRed.png";
import trainerBlue from "./images/trainerBlue.png";
import { AnyRecord } from 'dns';

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

  type homePageProps = {
      pokemons: pokemonArray[];
      handleNextArrow: any;
      handleLastArrow: any;
  }


const HomePage: React.FunctionComponent<homePageProps> = ({pokemons, handleNextArrow, handleLastArrow}) => {


    return (
        <div className="homeDiv">
            <div className="homeHeader">
                <div className="homeTitle" onClick={handleNextArrow}>Pokemon Battle</div>
                <div className="trainersAndDescription">
                    <div className="trainerLeft">
                        <img src={trainerRed} alt="trainer" className="trainerPic"></img>
                        <div className="trainerPokemon">
                            <img src={ball} alt="ball" className="battlePokemon"></img>
                            <img src={ball} alt="ball" className="battlePokemon"></img>
                            <img src={ball} alt="ball" className="battlePokemon"></img>
                        </div>
                    </div>
                    <div className="battleDescription" onClick={handleLastArrow}>Choose your pokemon and get ready to battle!</div>
                    <div className="trainerRight">
                        <img src={trainerBlue} alt="trainer" className="trainerPic"></img>
                        <div className="trainerPokemon">
                            <img src={ball} alt="ball" className="battlePokemon"></img>
                            <img src={ball} alt="ball" className="battlePokemon"></img>
                            <img src={ball} alt="ball" className="battlePokemon"></img>
                        </div>
                    </div>
                </div>
                <div className="blackBar">
                    <div className="bigCircle">
                        <div className="lilCircle"></div>
                    </div>
                </div>
            </div>
            <div className="homeBody">
                <div className='leftArrow'>Last Page</div>
                <div className="bodyMain">
                    {pokemons.map((pokemon) => {
                    return (
                        <div className='cardContainer' key={pokemon.id}>
                            <div className='card'>
                                <img src={pokemon.frontImage} alt={pokemon.name}></img>
                                <div className='pokemonName'>{pokemon.name}</div>
                            </div>
                            <div className='stats'>
                                <div className='pokemonType'>Type: {pokemon.type}</div>
                                <div className='pokemonStat'>HP: {pokemon.hp}</div>
                                <div className='pokemonStat'>Attack: {pokemon.attack}</div>
                                <div className='pokemonStat'>Defense: {pokemon.defense}</div>
                                <div className='pokemonStat'>Special Attack: {pokemon.specialAttack}</div>
                                <div className='pokemonStat'>Special Defense: {pokemon.specialDefense}</div>
                                <div className='pokemonStat'>Speed: {pokemon.speed}</div>
                                <button className='addToTeam'>Add to team</button>
                            </div>
                        </div>
                    )
                    })}
                </div>
                <div className='rightArrow'>Next Page</div>
            </div>
        </div>
    )
}

export default HomePage;