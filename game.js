import Pokemon from './pokemon.js';
import { pokemons } from './pokemons.js';
import random from './utils.js';
import { generateLog, addLog, clearLogs } from './logs.js';
import { countBtn } from './counter.js';

const HERO_NAME = 'Pikachu';

class Game {
    constructor() {
        this.$control = document.querySelector('.control');
        this.player1 = null;
        this.player2 = null;
        this.defeated = 0;
    }

    init = () => {
        this.createPlayers();
        this.showButton('START GAME', this.startGame);
    };

    createPlayer = (data, selectors) => new Pokemon({ ...data, selectors });

    randomEnemy = () => {
        const enemies = pokemons.filter(({ name }) => name !== HERO_NAME);

        return enemies[random(enemies.length) - 1];
    };

    createPlayers = () => {
        const hero = pokemons.find(({ name }) => name === HERO_NAME);

        this.player1 = this.createPlayer(hero, 'player1');
        this.player2 = this.createPlayer(this.randomEnemy(), 'player2');
    };

    createButton = (text, handler) => {
        const $btn = document.createElement('button');

        $btn.classList.add('button');
        $btn.innerText = text;
        $btn.addEventListener('click', handler);
        this.$control.appendChild($btn);

        return $btn;
    };

    clearControl = () => {
        const allButtons = document.querySelectorAll('.control .button');

        allButtons.forEach(($item) => $item.remove());
    };

    showButton = (text, handler) => {
        this.clearControl();
        this.createButton(text, handler);
    };

    createAttackButton = (attack) => {
        const { name, maxCount } = attack;
        const $btn = this.createButton(name, () => {
            btnCount();
            this.round(attack);
        });
        const btnCount = countBtn(maxCount, $btn);
    };

    startGame = () => {
        this.clearControl();
        this.defeated = 0;
        this.createPlayers();

        this.player1.attacks.forEach(this.createAttackButton);
    };

    resetGame = () => {
        clearLogs();
        this.startGame();
    };

    hit = (target, attacker, { maxDamage, minDamage }) => {
        target.changeHP(random(maxDamage, minDamage), (count) => {
            addLog(generateLog(target, attacker, count));
        });
    };

    round = (attack) => {
        const { player1, player2 } = this;

        this.hit(player2, player1, attack);

        if (player2.hp.current === 0) {
            this.nextEnemy();
            return;
        }

        this.hit(player1, player2, player2.attacks[0]);

        if (player1.hp.current === 0) {
            this.endGame();
        }
    };

    nextEnemy = () => {
        const { name } = this.player2;

        this.defeated++;
        this.player2 = this.createPlayer(this.randomEnemy(), 'player2');

        addLog(`${name} переможений! Новий суперник: ${this.player2.name}`);
    };

    endGame = () => {
        const { player1: { name }, defeated } = this;

        this.showButton('RESET GAME', this.resetGame);
        alert(`${name} програв. Переможено суперників: ${defeated}`);
    };
}

export default Game;
