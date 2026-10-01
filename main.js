const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
};

const btnKick = document.getElementById('btn-kick');
const btnSpecial = document.getElementById('btn-special');
const logo = document.querySelector('.logo');

function random(num) {
    return Math.ceil(Math.random() * num);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    const percent = (person.damageHP / person.defaultHP) * 100;
    person.elProgressbar.style.width = percent + '%';

    person.elProgressbar.classList.remove('low', 'critical');
    if (percent < 20) {
        person.elProgressbar.classList.add('critical');
    } else if (percent < 50) {
        person.elProgressbar.classList.add('low');
    }
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function changeHP(count, person) {
    person.damageHP -= count;
    if (person.damageHP < 0) {
        person.damageHP = 0;
    }
    renderHP(person);
}

function fight(maxDamageToEnemy, maxDamageToCharacter) {
    changeHP(random(maxDamageToEnemy), enemy);
    changeHP(random(maxDamageToCharacter), character);

    if (enemy.damageHP === 0 || character.damageHP === 0) {
        endGame();
    }
}

function endGame() {
    btnKick.disabled = true;
    btnSpecial.disabled = true;

    if (enemy.damageHP === 0 && character.damageHP === 0) {
        alert('Нічия!');
    } else if (enemy.damageHP === 0) {
        alert(character.name + ' переміг!');
    } else {
        alert(enemy.name + ' переміг!');
    }
}

btnKick.addEventListener('click', function () {
    fight(20, 20);
});

btnSpecial.addEventListener('click', function () {
    fight(40, 10);
});

logo.addEventListener('click', function () {
    location.reload();
});

renderHP(character);
renderHP(enemy);