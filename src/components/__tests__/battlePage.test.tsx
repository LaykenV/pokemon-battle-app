import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BattlePage, {battlePageProps} from '../battlePage';
import { act } from 'react-dom/test-utils';

function renderBattlePage() {
    const defaultProps: battlePageProps = {
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
          setYourPokemons() {
            return;
          },
          setEnemyPokemons() {
            return;
          }
    }
    return render(<BattlePage {...defaultProps}/>);
}

test("should render battlePage component", () => {
    renderBattlePage();
    const battlePageElement = screen.getByTestId("battlePage");
    expect(battlePageElement).toBeInTheDocument();
});

test("can deal damage to enemy", async() => {
  renderBattlePage();
  const tackleAttack = screen.getByTestId("tackleAttack");
  const enemyHealthBar = screen.getByTestId("enemyHealthBar");
  fireEvent.click(tackleAttack);
  await new Promise(resolve => setTimeout(resolve, 3000))
  expect(enemyHealthBar).not.toHaveStyle("width: 100%");
})

test("can switch pokemon", async() => {
  renderBattlePage();
  const yourPokemonImg = screen.getByTestId("activePokemon");
  const switchPokemon = screen.getByTestId("yourPokemon-1");
  fireEvent.click(switchPokemon);
  expect(yourPokemonImg).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png")
})

