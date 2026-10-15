function random(num) {
    return Math.ceil(Math.random() * num);
}

function renderHPLife() {
    const { elHP, damageHP, defaultHP } = this;
    elHP.innerText = `${damageHP} / ${defaultHP}`;
}

function renderProgressbarHP() {
    const { elProgressbar, damageHP, defaultHP } = this;
    const percent = (damageHP / defaultHP) * 100;
    elProgressbar.style.width = `${percent}%`;

    elProgressbar.classList.remove('low', 'critical');
    if (percent < 20) {
        elProgressbar.classList.add('critical');
    } else if (percent < 50) {
        elProgressbar.classList.add('low');
    }
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function changeHP(count) {
    const { damageHP: before } = this;
    this.damageHP = Math.max(before - count, 0);
    const lost = before - this.damageHP;

    this.renderHP();

    const opponent = this === enemy ? character : enemy;
    addLog(generateLog(this, opponent, lost));
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHPLife,
    renderProgressbarHP,
    renderHP,
    changeHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHPLife,
    renderProgressbarHP,
    renderHP,
    changeHP,
};

const [btnKick, btnSpecial] = ['btn-kick', 'btn-special'].map(
    (id) => document.getElementById(id)
);
const $logs = document.querySelector('#logs');
const $logo = document.querySelector('.logo');

function generateLog(firstPerson, secondPerson, damage) {
    const { name: firstName, damageHP, defaultHP } = firstPerson;
    const { name: secondName } = secondPerson;

    const logs = [
        `${firstName} згадав щось важливе, але несподівано ${secondName}, не тямлячи себе від переляку, вдарив у передпліччя ворога.`,
        `${firstName} поперхнувся, і за це ${secondName} з переляку приклав прямий удар коліном у лоб ворога.`,
        `${firstName} забувся, але в цей час нахабний ${secondName}, прийнявши вольове рішення, нечутно підійшовши ззаду, вдарив.`,
        `${firstName} отямився, але несподівано ${secondName} випадково завдав потужного удару.`,
        `${firstName} поперхнувся, але в цей час ${secondName} неохоче роздробив кулаком \\<вирізано цензурою\\> супротивника.`,
        `${firstName} здивувався, а ${secondName}, похитнувшись, влупив підлий удар.`,
        `${firstName} висякався, але несподівано ${secondName} провів нищівний удар.`,
        `${firstName} похитнувся, і раптом нахабний ${secondName} безпричинно вдарив у ногу супротивника.`,
        `${firstName} засмутився, як раптом, несподівано ${secondName} випадково влупив стопою в живіт суперника.`,
        `${firstName} намагався щось сказати, але раптом, несподівано ${secondName} зі скуки розбив брову суперникові.`,
    ];

    const text = logs[random(logs.length) - 1];
    return `${text} -${damage}, [${damageHP}/${defaultHP}]`;
}

function addLog(text) {
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
}

function fight({ toEnemy, toCharacter }) {
    enemy.changeHP(random(toEnemy));
    character.changeHP(random(toCharacter));

    const { damageHP: enemyHP } = enemy;
    const { damageHP: characterHP } = character;

    if (enemyHP === 0 || characterHP === 0) {
        endGame(characterHP, enemyHP);
    }
}

function endGame(characterHP, enemyHP) {
    btnKick.disabled = true;
    btnSpecial.disabled = true;

    const { name: heroName } = character;
    const { name: enemyName } = enemy;

    if (characterHP === 0 && enemyHP === 0) {
        alert('Нічия!');
    } else if (enemyHP === 0) {
        alert(`${heroName} переміг!`);
    } else {
        alert(`${enemyName} переміг!`);
    }
}

btnKick.addEventListener('click', () => fight({ toEnemy: 20, toCharacter: 20 }));

btnSpecial.addEventListener('click', () => fight({ toEnemy: 40, toCharacter: 10 }));

$logo.addEventListener('click', () => location.reload());

const createClickCounter = (name, limit) => {
    let count = 0;

    return () => {
        count++;
        const left = limit - count;
        console.log(`Кнопка «${name}»: натискань ${count}, залишилось ${left}`);
        return left;
    };
};

const attachClickCounter = ($btn, limit) => {
    const counter = createClickCounter($btn.innerText.trim(), limit);

    $btn.addEventListener('click', () => {
        if (counter() === 0) {
            $btn.disabled = true;
            console.log(`Кнопка «${$btn.innerText.trim()}»: ліміт натискань вичерпано`);
        }
    });
};

document.querySelectorAll('.button').forEach(($btn) => attachClickCounter($btn, 6));

character.renderHP();
enemy.renderHP();
