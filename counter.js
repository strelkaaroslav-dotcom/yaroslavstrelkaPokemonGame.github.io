const createClickCounter = (name, limit) => {
    let count = 0;

    return () => {
        count++;
        const left = limit - count;

        console.log(`Кнопка «${name}»: натискань ${count}, залишилось ${left}`);

        return left;
    };
};

export const attachClickCounter = ($btn, limit) => {
    const name = $btn.innerText.trim();
    const counter = createClickCounter(name, limit);

    $btn.addEventListener('click', () => {
        if (counter() === 0) {
            $btn.disabled = true;
            console.log(`Кнопка «${name}»: ліміт натискань вичерпано`);
        }
    });
};
