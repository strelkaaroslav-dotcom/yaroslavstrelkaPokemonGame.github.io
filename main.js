function random(num) {
    return Math.ceil(Math.random() * num);
}

function renderHPLife() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressbarHP() {
    const percent = (this.damageHP / this.defaultHP) * 100;
    this.elProgressbar.style.width = percent + '%';

    this.elProgressbar.classList.remove('low', 'critical');
    if (percent < 20) {
        this.elProgressbar.classList.add('critical');
    } else if (percent < 50) {
        this.elProgressbar.classList.add('low');
    }
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function changeHP(count) {
    this.damageHP -= count;
    if (this.damageHP < 0) {
        this.damageHP = 0;
    }
    this.renderHP();
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

const btnKick = document.getElementById('btn-kick');
const btnSpecial = document.getElementById('btn-special');
const logo = document.querySelector('.logo');

function fight(maxDamageToEnemy, maxDamageToCharacter) {
    enemy.changeHP(random(maxDamageToEnemy));
    character.changeHP(random(maxDamageToCharacter));

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

character.renderHP();
enemy.renderHP();
