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
    setEnemyPokemons: any
}


const BattlePage: React.FunctionComponent<battlePageProps> = ({yourPokemons, enemyPokemons, setYourPokemons, setEnemyPokemons}) => {

    const [pokemonIndex, setPokemonIndex] = useState(0 as number);
    const [enemyPokemonIndex, setEnemyPokemonIndex] = useState(0 as number);
    const [yourHP, setYourHP] = useState(Math.floor(yourPokemons[pokemonIndex].hp))
    const [enemyHP, setEnemyHP] = useState(Math.floor(enemyPokemons[enemyPokemonIndex].hp))
    const [attacksStyle, setAttacksStyle] = useState("grid");
    const [battleTextStyle, setBattleTextStyle] = useState("none");
    const [battleText1, setBattleText1] = useState("");
    const [pokemonClass, setPokemonClass] = useState("pokemonDiv");
    const [enemyPokemonClass, setEnemyPokemonClass] = useState("enemyPokemonDiv");
    const [winScreenDisplay, setWinScreenDisplay] = useState("none");
    const [battleScreenDisplay, setbattleScreenDisplay] = useState("flex");
    const [winner, setWinner] = useState([] as any);
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
        0: 80,
        1: 78,
        2: 79,
    }

    useEffect(() => {        
        setYourHP(yourHurtHP[pokemonIndex])
        console.log(yourSuperEffective());
        console.log(enemySuperEffective());
        
        
    }, [pokemonIndex]);

    useEffect(() => {
        if (enemyPokemons[1].hp <= 0 && enemyPokemons[0].hp <= 0 && enemyPokemons[2].hp <= 0) {
            setEnemyHP(0);
            setWinScreenDisplay("flex");
            setbattleScreenDisplay("none");
            setPokemonClass("gone");
            setEnemyPokemonClass("gone");
            setWinner([
                "You Win",
                trainerRed,
                yourPokemons[0].frontImage,
                yourPokemons[1].frontImage,
                yourPokemons[2].frontImage
            ])
        }
    }, [enemyPokemons])

    useEffect(() => {
        if (yourPokemons[1].hp <= 0 && yourPokemons[0].hp <= 0 && yourPokemons[2].hp <= 0) {
            setYourHP(0);
            setWinScreenDisplay("flex");
            setbattleScreenDisplay("none");
            setPokemonClass("gone");
            setEnemyPokemonClass("gone");
            setWinner([
                "You Lose",
                trainerBlue,
                enemyPokemons[0].frontImage,
                enemyPokemons[1].frontImage,
                enemyPokemons[2].frontImage
            ])
        }
    }, [yourPokemons])

    useEffect(() => {
        if (yourHP <= 0) {
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

    useEffect(() => {
        if (enemyHP <= 0) {
        const eP = [...enemyPokemons];
        eP[enemyPokemonIndex].hp = 0;
        setEnemyPokemons(eP);
        console.log(enemyPokemons);
        enemyForceSwitch();
        console.log(enemyPokemons);
        }
    }, [enemyHP]);

    const forceSwitch = () => {
        if (pokemonIndex == 0) {
            return setPokemonIndex(1);
        } else if (pokemonIndex == 1) {
            return setPokemonIndex(2);
        } else if (pokemonIndex == 2) {
            return setPokemonIndex(0)
        };
    }

    const enemyForceSwitch = () => {
        if (enemyPokemonIndex == 0) {
            setEnemyPokemonIndex(1);
            setEnemyHP(enemyPokemons[1].hp);
            console.log(enemyHP);
            
        } else if (enemyPokemonIndex == 1) {
            setEnemyPokemonIndex(2);
            setEnemyHP(enemyPokemons[2].hp);
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
            return "#367330";
        }
    }

    const effectiveAgainst = (type:any) => {
        if (type == "Fire") {
            return "Super-Effective against Grass, Ice, Bug, and Steel Types";
        }
        if (type == "Water") {
            return "Super-Effective against Fire, Ground, and Rock Types";
        }
        if (type == "Electric") {
            return "Super-Effective against Water and Flying Types";
        }
        if (type == "Grass") {
            return "Super-Effective against Water, Ground, and Rock Types";
        }
        if (type == "Ice") {
            return "Super-Effective against Grass, Ground, Flying, and Dragon Types";
        }
        if (type == "Fighting") {
            return "Super-Effective against Normal, Ice, Rock, Dark, and Steel Types";
        }
        if (type == "Poison") {
            return "Super-Effective against Grass Types";
        }
        if (type == "Ground") {
            return "Super-Effective against Fire, Electric, Poison, Rock, and Steel Types";
        }
        if (type == "Flying") {
            return "Super-Effective against Grass, Fighting, and Bug Types";
        }
        if (type == "Psychic") {
            return "Super-Effective against Fighting and Poison Types";
        }
        if (type == "Bug") {
            return "Super-Effective against Grass, Psychic, and Dark Types";
        }
        if (type == "Rock") {
            return "Super-Effective against Fire, Ice, Flying, and Bug Types";
        }
        if (type == "Ghost") {
            return "Super-Effective against Psychic and Ghost Types";
        }
        if (type == "Dragon") {
            return "Super-Effective against Dragon Types";
        }
        if (type == "Dark") {
            return "Super-Effective against Psychic and Ghost Types";
        }
        if (type == "Steel") {
            return "Super-Effective against Ice and Rock Types";
        }
        if (type == "Normal") {
            return "Effective against all Types"
        }
    }

    const yourSuperEffective = () => {
        const yourType = yourPokemons[pokemonIndex].type;
        const enemyType = enemyPokemons[enemyPokemonIndex].type;
        if (enemyType == "Grass") {
            if (yourType == "Fire" || yourType == "Ice" || yourType == "Poison" || yourType == "Flying" || yourType == "Bug") {
                return true;
            }
        }
        if (enemyType == "Water") {
            if (yourType == "Electric" || yourType == "Grass") {
                return true;
            }
        }
        if (enemyType == "Fire") {
            if (yourType == "Water" || yourType == "Ground" || yourType == "Rock") {
                return true;
            }
        }
        return false;
    }

    const enemySuperEffective = () => {
        const yourType = yourPokemons[pokemonIndex].type;
        console.log(pokemonIndex);
        console.log(enemyPokemonIndex);       
        const enemyType = enemyPokemons[enemyPokemonIndex].type;
        if (enemyType == "Grass") {
            if (yourType == "Water" || yourType == "Ground" || yourType == "Rock") {
                console.log("true");
                return true;                
            }
        }
        if (enemyType == "Water") {
            if (yourType == "Fire" || yourType == "Ground" || yourType == "Rock") {
                return true;
            }
        }
        if (enemyType == "Fire") {
            if (yourType == "Grass" || yourType == "Ice" || yourType == "Bug" || yourType == "Steel") {
                return true;
            }
        }
        return false;
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

    const yourAttack = (x:number) => {
        if (x == 1) {
             setBattleText1(`Your ${yourPokemons[pokemonIndex].name} used ${yourPokemons[pokemonIndex].type} Attack!`);
             setPokemonClass("pokemonDiv attacking");
             setTimeout(() => {
                setPokemonClass("pokemonDiv")
                return typeAttack()
            }, 2000);
        }
        else if (x == 2) {
             setBattleText1(`Your ${yourPokemons[pokemonIndex].name} used Tackle!`);
             setPokemonClass("pokemonDiv attacking");
             setTimeout(() => {
                setPokemonClass("pokemonDiv")
                return tackle();
            }, 2000);
        }
        else if (x == 3) {
             setBattleText1(`Your ${yourPokemons[pokemonIndex].name} used Growl!`);
             setPokemonClass("pokemonDiv attacking");
             setTimeout(() => {
                setPokemonClass("pokemonDiv")
                return growl();
            }, 2000);
        }
        else if (x == 4) {
             setBattleText1(`Your ${yourPokemons[pokemonIndex].name} used Leer!`);
             setPokemonClass("pokemonDiv attacking");
             setTimeout(() => {
                setPokemonClass("pokemonDiv")
                return leer();
            }, 2000);
        }
    }

    const enemyAttack = () => {
        const randomNumber = Math.ceil(Math.random()*4);
        console.log(randomNumber);
        console.log(yourPokemons[pokemonIndex]);
        if (enemySuperEffective()) {
             setBattleText1(`Enemy ${enemyPokemons[enemyPokemonIndex].name} used ${enemyPokemons[enemyPokemonIndex].type} Attack!`);
             setEnemyPokemonClass("enemyPokemonDiv attackingEnemy");
             setTimeout(() => {
                setEnemyPokemonClass("enemyPokemonDiv")
                enemyTypeAttack();
            }, 2000);
        } 
        else if ((yourHP - (((enemyPokemons[enemyPokemonIndex].attack) / 200) * 50)) <= 0) {
            setBattleText1(`Enemy ${enemyPokemons[enemyPokemonIndex].name} used ${enemyPokemons[enemyPokemonIndex].type} Attack!`);
             setEnemyPokemonClass("enemyPokemonDiv attackingEnemy");
             setTimeout(() => {
                setEnemyPokemonClass("enemyPokemonDiv")
                enemyTypeAttack();
            }, 2000);
        }
        else if (randomNumber == 2) {
             setBattleText1(`Enemy ${enemyPokemons[enemyPokemonIndex].name} used Tackle!`);
             setEnemyPokemonClass("enemyPokemonDiv attackingEnemy");
             setTimeout(() => {
                setEnemyPokemonClass("enemyPokemonDiv")
                return enemyTackle();
            }, 2000);
        }
        else if (randomNumber == 1) {
             setBattleText1(`Enemy ${enemyPokemons[enemyPokemonIndex].name} used ${enemyPokemons[enemyPokemonIndex].type} Attack!`);
             setEnemyPokemonClass("enemyPokemonDiv attackingEnemy");
             setTimeout(() => {
                setEnemyPokemonClass("enemyPokemonDiv")
                return enemyTypeAttack();
            }, 2000);
        }
        else if (randomNumber == 3) {
             setBattleText1(`Enemy ${enemyPokemons[enemyPokemonIndex].name} used Growl`);
             setEnemyPokemonClass("enemyPokemonDiv attackingEnemy");
             setTimeout(() => {
                setEnemyPokemonClass("enemyPokemonDiv")
                return enemyGrowl();
            }, 2000);
        }
        else if (randomNumber == 4) {
             setBattleText1(`Enemy ${enemyPokemons[enemyPokemonIndex].name} used Leer`);
             setEnemyPokemonClass("enemyPokemonDiv attackingEnemy");
             setTimeout(() => {
                setEnemyPokemonClass("enemyPokemonDiv")
                return enemyLeer();
            }, 2000);
        }

    }

    const playRound = (x:number) => {
        setAttacksStyle("none");
        setBattleTextStyle("flex");
        if (yourPokemons[pokemonIndex].speed < enemyPokemons[enemyPokemonIndex].speed) {
            enemyAttack();
            if ((!enemySuperEffective() && (yourHP - (((enemyPokemons[enemyPokemonIndex].attack) / 200) * 50) <= 0)) || (enemySuperEffective() && (yourHP - (((enemyPokemons[enemyPokemonIndex].attack) / 200) * 100)) <= 0)) {
                console.log("faint")
                setTimeout(() => {
                    setBattleText1(`Your ${yourPokemons[pokemonIndex].name} Fainted!`)
                }, 2000);
                setTimeout(() => {
                    setAttacksStyle("grid");
                    setBattleTextStyle("none");
                    setBattleText1("");
                }, 4000);
            } else if ((yourHP - (((enemyPokemons[enemyPokemonIndex].attack) / 200) * 50)) > 0) {
                setTimeout(() => {
                    yourAttack(x);
                }, 2000);
                setTimeout(() => {
                    setAttacksStyle("grid");
                    setBattleTextStyle("none");
                    setBattleText1("");
                }, 4000);
            }
        } else {
            yourAttack(x);
            if ((x == 1 && yourSuperEffective() && (enemyHP - (((yourPokemons[pokemonIndex].attack) / 200) * 100) <= 0)) || (x == 1 && !yourSuperEffective && (enemyHP - (((yourPokemons[pokemonIndex].attack) / 200) * 50) <= 0)) || (x == 2 && (enemyHP - (((yourPokemons[pokemonIndex].attack) / 200) * 40) <= 0))) {
                console.log("faint")
                setTimeout(() => {
                    setBattleText1(`Your opponents ${enemyPokemons[enemyPokemonIndex].name} Fainted!`)
                }, 2000);
                setTimeout(() => {
                    setAttacksStyle("grid");
                    setBattleTextStyle("none");
                    setBattleText1("");
                }, 4000);
            } else {
                setTimeout(() => {
                    enemyAttack();
                }, 2000);
                setTimeout(() => {
                    setAttacksStyle("grid");
                    setBattleTextStyle("none");
                    setBattleText1("");
                }, 4000) 
            }
        }
    }

    const typeAttack = async() => {
        console.log("typeattack");
       const damage = Math.floor(((yourPokemons[pokemonIndex].attack / 2) / 100) * 50);
       console.log(damage);
        
        if (yourSuperEffective()) {
            const superEffectiveDamage = damage * 2;
            setEnemyHP(prevEnemyHP => prevEnemyHP - superEffectiveDamage);
        } else {
            setEnemyHP(prevEnemyHP => prevEnemyHP - damage);
        }
    }

    const enemyTypeAttack = () => {
        console.log("enemytypeattack");
        const damage = Math.floor(((enemyPokemons[enemyPokemonIndex].attack / 2) / 100) * 50);
        console.log(damage);
        console.log(enemyPokemonIndex);
        if (enemySuperEffective()) {
            const superEffectiveDamage = damage * 2;
            setYourHP(prevYourHP => prevYourHP - superEffectiveDamage);
        } else {
            setYourHP(prevYourHP => prevYourHP - damage);
        }
    }

    const tackle = () => {
        console.log("quickattack");
        const damage = Math.floor(((yourPokemons[pokemonIndex].attack / 2) / 100) * 40);
        setEnemyHP(prevEnemyHP => prevEnemyHP - damage);
    }

    const enemyTackle = () => {
        console.log("enemyquickattack");
        const damage = Math.floor(((enemyPokemons[enemyPokemonIndex].attack / 2) / 100) * 40);
        setYourHP(prevYourHP => prevYourHP - damage);
    }

    const growl = () => {
        console.log("growl");
        const enemyP = [...enemyPokemons];
        const enemyAttack = enemyP[enemyPokemonIndex].attack;
        enemyP[enemyPokemonIndex].attack = Math.floor((enemyAttack / 2));
        setEnemyPokemons(enemyP);
    }

    const enemyGrowl = () => {
        console.log("enemygrowl");
        const yourP = [...yourPokemons];
        const yourAttack = yourP[pokemonIndex].attack;
        yourP[pokemonIndex].attack = Math.floor((yourAttack / 2));
        setYourPokemons(yourP);
    }

    const leer = () => {   
        console.log("leer");     
        const enemyP = [...enemyPokemons];
        const enemyDefense = enemyP[enemyPokemonIndex].defense;
        enemyP[enemyPokemonIndex].defense = Math.floor((enemyDefense / 2));
        setEnemyPokemons(enemyP);
    }

    const enemyLeer = () => { 
        console.log("enemyleer");       
        const yourP = [...yourPokemons];
        const yourDefense = yourP[pokemonIndex].defense;
        yourP[pokemonIndex].defense = Math.floor((yourDefense / 2));
        setYourPokemons(yourP);
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
        setAttacksStyle("none");
        setBattleTextStyle("flex");
        setBattleText1(`You switched in ${clickedPokemonName}`);        
        setTimeout(() => {
            enemyAttack();
        }, 2000);
        setTimeout(() => {
            setAttacksStyle("grid");
            setBattleTextStyle("none");
            setBattleText1("");
        }, 4000);
    }

    return(
        <div className='battlePageDiv'>
            <div className='winScreen' style={{display: winScreenDisplay}}>
                <h1 className="winScreenTitle">{winner[0]}</h1>
                <img className='winScreenTrainerPic' src={winner[1]} alt='trainer'></img>
                <div className='winScreenPokemonContainer'>
                    <img className='winScreenPokemon' src={winner[2]} alt='pokemon'></img>
                    <img className='winScreenPokemon' src={winner[3]} alt='pokemon'></img>
                    <img className='winScreenPokemon' src={winner[4]} alt='pokemon'></img>
                </div>
                <button className='playAgain' onClick={event => window.location.href=""}>Play Again</button>
            </div>
            <div className='battleSection' style={{display: battleScreenDisplay}}>
                <img className={pokemonClass} src={yourPokemons[pokemonIndex].backImage} alt="pokemon"></img>
                <img className={enemyPokemonClass} src={enemyPokemons[enemyPokemonIndex].frontImage} alt="pokemon"></img>
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
            <div className='menuSection' style={{display: battleScreenDisplay}}> 
                <div className='attacks' style={{display: attacksStyle}}>
                    <div className='attack' onClick={() => playRound(1)}>
                        <div className='attackTop'>
                            <div className='attackName'>{yourPokemons[pokemonIndex].type} Attack</div>
                            <div className='attackPower'>50 Power</div>
                        </div>
                        <div className='attackDescription'>{effectiveAgainst(yourPokemons[pokemonIndex].type)}</div>
                    </div>
                    <div className='attack' onClick={() => playRound(2)}>
                        <div className='attackTop'>
                            <div className='attackName'>Tackle</div>
                            <div className='attackPower'>40 Power</div>
                        </div>
                        <div className='attackDescription'>Effective against all types</div>
                    </div>
                    <div className="attack" onClick={() => playRound(3)}>
                        <div className='attackName'>Growl</div>
                        <div className='attackDescription'>Lowers the enemy pokemon's Attack stat</div>
                    </div>
                    <div className="attack" onClick={() => playRound(4)}>
                        <div className='attackName'>Leer</div>
                        <div className='attackDescription'>Lowers the enemy pokemon's Defense stat</div>
                    </div>
                </div>
                <div className='battleText' style={{display: battleTextStyle}}>
                    <div className='battleText1'>{battleText1}</div>
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