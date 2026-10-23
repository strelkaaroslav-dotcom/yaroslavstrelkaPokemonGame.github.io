import Pokemon from './pokemon.js';
import random from './utils.js';
import { generateLog, addLog } from './logs.js';
import { attachClickCounter } from './counter.js';

const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    hp: 100,
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 100,
    selectors: 'enemy',
});

const [btnKick, btnSpecial] = ['btn-kick', 'btn-special'].map(
    (id) => document.getElementById(id)
);
const $logo = document.querySelector('.logo');

const hit = (target, attacker, maxDamage) => {
    target.changeHP(random(maxDamage), (count) => {
        addLog(generateLog(target, attacker, count));
    });
};

const endGame = () => {
    btnKick.disabled = true;
    btnSpecial.disabled = true;

    const { name: name1, hp: { current: hp1 } } = player1;
    const { name: name2, hp: { current: hp2 } } = player2;

    if (hp1 === 0 && hp2 === 0) {
        alert('Нічия!');
    } else if (hp2 === 0) {
        alert(`${name1} переміг!`);
    } else {
        alert(`${name2} переміг!`);
    }
};

const fight = ({ toPlayer2, toPlayer1 }) => {
    hit(player2, player1, toPlayer2);
    hit(player1, player2, toPlayer1);

    if (player1.hp.current === 0 || player2.hp.current === 0) {
        endGame();
    }
};

btnKick.addEventListener('click', () => fight({ toPlayer2: 20, toPlayer1: 20 }));

btnSpecial.addEventListener('click', () => fight({ toPlayer2: 40, toPlayer1: 10 }));

$logo.addEventListener('click', () => location.reload());

document.querySelectorAll('.button').forEach(($btn) => attachClickCounter($btn, 6));
