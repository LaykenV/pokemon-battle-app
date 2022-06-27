import React, { useState, useEffect } from 'react';
import "./battlePage.css";
import battleBackground from "./images/battleBackground.png";
import ball from "./images/pokemonball.png";
import trainerRed from "./images/trainerRed.png";
import trainerBlue from "./images/trainerBlue.png";
import { useSearchParams } from 'react-router-dom';

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
  
  type battlePageProps = {
    yourPokemons: pokemonArray[];
    enemyPokemons: pokemonArray[];
    setYourPokemons: any;
}


const BattlePage: React.FunctionComponent<battlePageProps> = ({yourPokemons, enemyPokemons, setYourPokemons}) => {

    const [pokemonIndex, setPokemonIndex] = useState(0 as number);
    const [enemyPokemonIndex, setEnemyPokemonIndex] = useState(0 as number);
    const [yourHP, setYourHP] = useState(Math.floor(yourPokemons[pokemonIndex].hp))
    const [enemyHP, setEnemyHP] = useState(Math.floor(enemyPokemons[enemyPokemonIndex].hp))
    const [yourHurtHP, setYourHurtHp] = useState([
        yourPokemons[0].hp,
        yourPokemons[1].hp,
        yourPokemons[2].hp
    ] as any);

    const yourBaseHP:any = {
        0: yourPokemons[0].hp,
        1: yourPokemons[1].hp,
        2: yourPokemons[2].hp,
    }

    const enemyBaseHP:any = {
        0: enemyPokemons[0].hp,
        1: enemyPokemons[1].hp,
        2: enemyPokemons[2].hp,
    }

    useEffect(() => {        
        setYourHP(yourHurtHP[pokemonIndex])
    }, [pokemonIndex]);

    useEffect(() => {
        if (yourHP == 0) {
        const yHHP = [...yourHurtHP];
        yHHP[pokemonIndex] = 0;
        console.log(yHHP);
        
        setYourHurtHp(yHHP);
        const yP = [...yourPokemons];
        yP[pokemonIndex].hp = 0;
        setYourPokemons(yP);
        forceSwitch();

        }
    }, [yourHP]);

    const forceSwitch = () => {
        if (pokemonIndex == 0) {
            return setPokemonIndex(1);
        } else if (pokemonIndex == 1) {
            return setPokemonIndex(2);
        } else if (pokemonIndex == 2) {
            return setPokemonIndex(0)
        };
    }

    const yourHpPercentage = (x:number) => {
        return (yourHP / yourBaseHP[x]) * 100;
    }

    const enemyHpPercentage = (x:number) => {
        return (enemyHP / enemyBaseHP[x]) * 100;
    }

    const barColor = (x:number) => {
        if (x < 30) {
            return "red";
        } else if (x < 50) {
            return "yellow";
        } else if (x > 49) {
            return "green";
        }
    }

    const yourBarStyle = (x:number) => {
        return {
            width: `${yourHpPercentage(x)}%`,
            backgroundColor: `${barColor(yourHpPercentage(x))}`
        }
    }

    const enemyBarStyle = (x:number) => {
        return {
            width: `${enemyHpPercentage(x)}%`,
            backgroundColor: `${barColor(enemyHpPercentage(x))}`
        }
    }

    const attackTest = () => {
       setYourHP(Math.floor(yourHP / 2));       
    }

    const switchPokemon = (e:any) => {
        const clickedPokemonName = e.target.alt;
        const clickedPokemon:any = yourPokemons.filter(pokemon => {
            return pokemon.name === clickedPokemonName;
        });
        const hurtHP = [...yourHurtHP];
        hurtHP[pokemonIndex] = yourHP;
        setYourHurtHp(hurtHP);
        setPokemonIndex(yourPokemons.indexOf(clickedPokemon[0]));
        
    }

    return(
        <div className='battlePageDiv'>
            <div className='battleSection'>
                <img className='pokemonDiv' src={yourPokemons[pokemonIndex].backImage} alt="pokemon"></img>
                <img className='enemyPokemonDiv' onClick={attackTest} src={enemyPokemons[enemyPokemonIndex].frontImage} alt="pokemon"></img>
                <div className='enemyPokemonStatus'>
                <div className='pokemonNameAndType'>
                    <div className='pokemonName'>{enemyPokemons[enemyPokemonIndex].name}</div>
                    <div className='pokemonType'>{enemyPokemons[enemyPokemonIndex].type} Type</div>
                </div>                    
                <div className='pokemonHealthBarContainer'>
                    <div className='pokemonHealthBar' style={enemyBarStyle(enemyPokemonIndex)}></div>
                </div>
                <div className='healthText'>HP: {enemyHP}/{enemyBaseHP[enemyPokemonIndex]}</div>
                </div>
                <div className='pokemonStatus'>
                    <div className='pokemonNameAndType'>
                        <div className='pokemonName'>{yourPokemons[pokemonIndex].name}</div>
                        <div className='pokemonType'>{yourPokemons[pokemonIndex].type} Type</div>
                    </div>
                    <div className='pokemonHealthBarContainer'>
                        <div className='pokemonHealthBar' style={yourBarStyle(pokemonIndex)}></div>
                    </div>
                    <div className='healthText'>HP: {yourHP}/{yourBaseHP[pokemonIndex]}</div>
                </div>
            </div>
            <div className='menuSection'>
                <div className='attacks'>
                    <div className='attack'>Tackle</div>
                    <div className="attack">Surf</div>
                </div>
                <div className='switchPokemons'>
                    <div className='switchPokemonsText'>Switch your Pokemon!</div>
                    <div className='pokemonOptions'>
                        {yourPokemons.map((pokemon) => {
                            if (pokemon.hp > 0) {
                                return(
                                    <img className='pokemonOption' onClick={switchPokemon} src={pokemon.frontImage} alt={pokemon.name} key={pokemon.id}></img>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BattlePage;