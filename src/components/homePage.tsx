import React, { useState, useEffect } from 'react';
import "./homePage.css";
import ball from "./images/pokemonball.png";
import trainerRed from "./images/trainerRed.png";
import trainerBlue from "./images/trainerBlue.png";
import { Link } from 'react-router-dom';


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

  export type homePageProps = {
      pokemons: pokemonArray[];
      handleNextArrow: any;
      handleLastArrow: any;
      handleCardClick: any;
      yourPokemons: pokemonArray[];
      enemyPokemons: pokemonArray[];
  }


const HomePage: React.FunctionComponent<homePageProps> = ({pokemons, handleNextArrow, handleLastArrow, handleCardClick, yourPokemons, enemyPokemons}) => {

    const [buttonStyle, setButtonStyle] = useState({
        display: "none"
    });
    
    useEffect(() => {
        if (yourPokemons.length === 3) {
            setButtonStyle({
                display: "flex"
            })
        }
    }, [yourPokemons])
    const barColor = (x:number) => {
        if (x < 50) {
            return "red";
        } else if (x < 70) {
            return "yellow";
        } else if (x > 69) {
            return "green";
        }
    }

    const barStyleHp = (x:any) => {
        return {
            width: `${x.hp}%`,
            backgroundColor: `${barColor(x.hp)}`
        }
    }

    const barStyleAttack = (x:any) => {
        return {
            width: `${x.attack}%`,
            backgroundColor: `${barColor(x.attack)}`
        }
    }

    const barStyleDefense = (x:any) => {
        return {
            width: `${x.defense}%`,
            backgroundColor: `${barColor(x.defense)}`
        }
    }

    const barStyleSpeed = (x:any) => {
        return {
            width: `${x.speed}%`,
            backgroundColor: `${barColor(x.speed)}`
        }
    }

    const ballOrPokemon = (x:number) => {
        if (yourPokemons[x]) {
            return yourPokemons[x].frontImage;
        } else {return ball};
    }



    return (
        <div className="homeDiv" data-testid="homePage">
            <div className="homeHeader">
                <div className="homeTitle"><img src='https://fontmeme.com/permalink/220622/de8a8ff8a7e388a64ff2624d3869d92a.png' alt='pokemon battle'></img></div>
                <div className="trainersAndDescription">
                    <div className="trainerLeft">
                        <img src={trainerRed} alt="trainer" className="trainerPic"></img>
                        <div className="trainerPokemon">
                            <img src={ballOrPokemon(0)} alt="ball" className="battlePokemon" data-testid="battlePokemon1"></img>
                            <img src={ballOrPokemon(1)} alt="ball" className="battlePokemon" data-testid="battlePokemon2"></img>
                            <img src={ballOrPokemon(2)} alt="ball" className="battlePokemon" data-testid="battlePokemon3"></img>
                        </div>
                    </div>
                    <div className="battleDescription">
                        <div className='battleDescriptionText'>Choose your pokemon and get ready to battle!</div>
                        <button className='battleButton' style={buttonStyle}><Link style={buttonStyle} to="/battle" className='link'>Start the battle!</Link></button>
                    </div>
                    <div className="trainerRight">
                        <img src={trainerBlue} alt="trainer" className="trainerPic"></img>
                        <div className="trainerPokemon">
                            <img src={enemyPokemons[0].frontImage} alt="ball" className="battlePokemon"></img>
                            <img src={enemyPokemons[1].frontImage} alt="ball" className="battlePokemon"></img>
                            <img src={enemyPokemons[2].frontImage} alt="ball" className="battlePokemon"></img>
                        </div>
                    </div>
                </div>
                <div className='battleDescriptionTextMobileContainer'>
                    <div className='battleDescriptionTextMobile'>Choose your pokemon and get ready to battle!</div>
                    <button className='battleButton' style={buttonStyle} data-testid="battleButton"><Link style={buttonStyle} to="/battle" className='link'>Start the battle!</Link></button>
                </div>
                
                <div className="blackBar">
                    <div className="bigCircle">
                        <div className="lilCircle"></div>
                    </div>
                </div>
            </div>
            <div className="homeBody">
                <div className='leftArrow' onClick={handleLastArrow}></div>
                <div className="bodyMain">
                    {pokemons.map((pokemon) => {
                    return (
                        <div className='cardContainer' key={pokemon.id} data-testid={`pokemon-${pokemons.indexOf(pokemon)}`}>
                            <div className='card'>
                                <img src={pokemon.frontImage} alt={pokemon.name}></img>
                                <div className='pokemonName'>{pokemon.name}</div>
                            </div>
                            <div className='stats'>
                                <div className='pokemonType'>Type: {pokemon.type}</div>
                                <div className='pokemonStat'>
                                    <div className='statName'>Hp:</div>
                                    <div className='progressBarContainer'><div className='progressBar' style={barStyleHp(pokemon)} >{pokemon.hp}</div></div>
                                </div>
                                <div className='pokemonStat'>
                                    <div className='statName'>Attack:</div>
                                    <div className='progressBarContainer'><div className='progressBar' style={barStyleAttack(pokemon)}>{pokemon.attack}</div></div>
                                </div>
                                <div className='pokemonStat'>
                                    <div className='statName'>Defense:</div>
                                    <div className='progressBarContainer'><div className='progressBar' style={barStyleDefense(pokemon)}>{pokemon.defense}</div></div>
                                </div>
                                <div className='pokemonStat'>
                                    <div className='statName'>Speed:</div>
                                    <div className='progressBarContainer'><div className='progressBar' style={barStyleSpeed(pokemon)}>{pokemon.speed}</div></div>
                                </div>
                                <button className='addToTeam' onClick={handleCardClick} data-testid={`addPokemon-${pokemons.indexOf(pokemon)}`}>Add to team</button>
                            </div>
                        </div>
                    )
                    })}
                </div>
                <div className='rightArrow' onClick={handleNextArrow}></div>
            </div>
        </div>
    )
}

export default HomePage;