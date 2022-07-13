import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage, {homePageProps} from '../homePage';
import { MemoryRouter } from 'react-router-dom';

function renderHomePage() {
    const defaultProps: homePageProps = {
        pokemons: [{
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
          }],
        yourPokemons: [{
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
          }],
        enemyPokemons: [{
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
          }],
        handleCardClick() {
            return;
        },
        handleLastArrow() {
            return;
        },
        handleNextArrow() {
            return;
        }
    }
    return render(<MemoryRouter><HomePage {...defaultProps}/></MemoryRouter>);
}

test("should render homePage component", () => {
    renderHomePage();
    const homePageElement = screen.getByTestId("homePage");
    expect(homePageElement).toBeInTheDocument();
});

test("should render pokemon list from props", () => {
    renderHomePage();
    const pokemonElement1 = screen.getByTestId("pokemon-0");
    const pokemonElement2 = screen.getByTestId("pokemon-1");
    const pokemonElement3 = screen.getByTestId("pokemon-2");
    expect(pokemonElement1).toBeInTheDocument();
    expect(pokemonElement2).toBeInTheDocument();
    expect(pokemonElement3).toBeInTheDocument();
})

test("should render selected pokemon under trainer picture", () => {
  renderHomePage();
  const addPokemonButton1 = screen.getByTestId("addPokemon-0");
  const addPokemonButton2 = screen.getByTestId("addPokemon-1");
  const addPokemonButton3 = screen.getByTestId("addPokemon-2");
  const battlePokemon1 = screen.getByTestId("battlePokemon1");
  const battlePokemon2 = screen.getByTestId("battlePokemon2");
  const battlePokemon3 = screen.getByTestId("battlePokemon3");

  fireEvent.click(addPokemonButton1);
  fireEvent.click(addPokemonButton2);
  fireEvent.click(addPokemonButton3);

  expect(battlePokemon1).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png");
  expect(battlePokemon2).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png");
  expect(battlePokemon3).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png");
})

test("should render start battle button after 3 pokemon selections", () => {
  renderHomePage();
  const addPokemonButton1 = screen.getByTestId("addPokemon-0");
  const addPokemonButton2 = screen.getByTestId("addPokemon-1");
  const addPokemonButton3 = screen.getByTestId("addPokemon-2");
  const battleButton = screen.getByTestId("battleButton");

  fireEvent.click(addPokemonButton1);
  fireEvent.click(addPokemonButton2);
  fireEvent.click(addPokemonButton3);

  expect(battleButton).toBeVisible();
})