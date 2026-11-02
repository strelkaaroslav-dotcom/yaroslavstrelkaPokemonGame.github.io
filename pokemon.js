class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elName = document.getElementById(`name-${name}`);
        this.elImg = document.getElementById(`img-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, hp, type, img, selectors, attacks = [] }) {
        super(selectors);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.img = img;
        this.attacks = attacks;

        this.renderInfo();
        this.renderHP();
    }

    renderInfo = () => {
        const { elName, elImg, name, img } = this;

        elName.innerText = name;
        elImg.src = img;
    };

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    };

    renderHPLife = () => {
        const { elHP, hp: { current, total } } = this;

        elHP.innerText = `${current} / ${total}`;
    };

    renderProgressbarHP = () => {
        const { elProgressbar, hp: { current, total } } = this;
        const percent = (current / total) * 100;

        elProgressbar.style.width = `${percent}%`;
        elProgressbar.classList.remove('low', 'critical');

        if (percent < 20) {
            elProgressbar.classList.add('critical');
        } else if (percent < 60) {
            elProgressbar.classList.add('low');
        }
    };

    changeHP = (count, cb) => {
        const { current: before } = this.hp;

        this.hp.current = Math.max(before - count, 0);

        this.renderHP();
        cb && cb(before - this.hp.current);
    };
}

export default Pokemon;
