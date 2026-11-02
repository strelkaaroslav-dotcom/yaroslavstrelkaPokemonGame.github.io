import random from './utils.js';

const $logs = document.querySelector('#logs');

export const generateLog = (firstPerson, secondPerson, damage) => {
    const { name: firstName, hp: { current, total } } = firstPerson;
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

    return `${text} -${damage}, [${current}/${total}]`;
};

export const addLog = (text) => {
    const $p = document.createElement('p');

    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
};

export const clearLogs = () => {
    $logs.innerHTML = '';
};
