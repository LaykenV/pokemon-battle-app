import React from "react";
import "./homePage.css";

function HomePage() {
    return (
        <div className="homeDiv">
            <div className="homeHeader">
                <div className="homeTitle">Pokemon Battle</div>
                <div className="trainersAndDescription">
                    <div className="trainerLeft">
                        <img src="" alt="" className="trainerPic"></img>
                        <div className="trainerPokemon">
                            <img src="" alt="" className="battlePokemon"></img>
                            <img src="" alt="" className="battlePokemon"></img>
                            <img src="" alt="" className="battlePokemon"></img>
                        </div>
                    </div>
                    <div className="battleDescription">Choose your pokemon and get ready to battle!</div>
                    <div className="trainerRight">
                        <img src="" alt="" className="trainerPic"></img>
                        <div className="trainerPokemon">
                            <img src="" alt="" className="battlePokemon"></img>
                            <img src="" alt="" className="battlePokemon"></img>
                            <img src="" alt="" className="battlePokemon"></img>
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
                <div className="bodyMain">
                    <div className="pokemonCard"></div>
                    <div className="pokemonCard"></div>
                    <div className="pokemonCard"></div>
                    <div className="pokemonCard"></div>
                    <div className="pokemonCard"></div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;