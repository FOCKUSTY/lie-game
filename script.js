const playingPlayers = {
    "1": {
        roulet: 6,
        dead: false
    },
    "2": {
        roulet: 6,
        dead: false
    },
    "3": {
        roulet: 6,
        dead: false
    },
    "4": {
        roulet: 6,
        dead: false
    }
};

let playersCount = document.getElementById("players-count").value || '2';

const main = document.getElementById("main");
const player = document.getElementById("player");
const timer = document.getElementById("timer");

const output = document.getElementById("output");
const info = document.getElementById("info");
const stopbtn = document.getElementById("stop");

const warn = document.createElement("span");

(() => {
    warn.style.position = 'absolute';
    warn.style.top = '0';
    warn.style.left = '0';
    warn.style.padding = '5px 10px';
    warn.style.color = 'red';
    warn.style.opacity = '0';
    warn.style.transition = '2s';
    main.appendChild(warn);
})();

const Warn = (text = '') => {
    warn.textContent = text;
    warn.style.opacity = '1';

    setTimeout(() => {
        warn.style.opacity = '0';
    }, 1000);
};

const RussianRoulet = () => {
    let currentPlayer = Number(player.textContent.charAt(player.textContent.search(/[0-4]/)));

    if (currentPlayer == 0) {
        Warn("Сделайте ход");
    } else {
        if (playingPlayers[currentPlayer].dead)
            return;

        const random = Math.floor(Math.random() * playingPlayers[currentPlayer].roulet) + 1;
        playingPlayers[currentPlayer].roulet -= 1;

        if (random == 1) {
            playingPlayers[currentPlayer].dead = true;

            const span = document.createElement('span');
            span.textContent = `Игрок ${currentPlayer} мертв`;
            output.appendChild(span);
        } else {
            const span = document.createElement('span');
            span.textContent = `Игроку ${currentPlayer} повезло, осталось ${playingPlayers[currentPlayer].roulet} ${RuWords(playingPlayers[currentPlayer].roulet, ["выстрел", "выстрела", "выстрелов"])}`;
            output.appendChild(span);
        }
    }
};

let interval;

const Timer = () => {
    clearInterval(interval);

    let seconds = 60;
    timer.textContent = `Осталось: ${seconds} ${RuWords(seconds, ['Секунда', 'Секунды', 'Секунд'])}`;

    interval = setInterval(() => {
        seconds -= 1;

        if (seconds <= 0) {
            clearInterval(interval);
            timer.textContent = 'Время вышло!';
            return;
        }

        timer.textContent = `Осталось: ${seconds} ${RuWords(seconds, ['Секунда', 'Секунды', 'Секунд'])}`;
    }, 1000);
};

const Move = () => {
    playersCount = document.getElementById("players-count").value || '2';

    const currentPlayer = player.textContent.charAt(player.textContent.search(/[0-4]/));
    const pl = Number(currentPlayer) + 1;

    let deads = 0;

    for(let i in playingPlayers) {
        if(playingPlayers[i].dead) deads++;
    }

    if(deads >= Number(playersCount)-1) {
        Stop();
        Warn(`Игрок ${currentPlayer} победил`);
    };

    if (playingPlayers[pl].dead)
        return Move();

    if (currentPlayer >= playersCount) {
        player.textContent = 'Ходит игрок: 1';
        return Timer();
    };

    player.textContent = 'Ходит игрок: ' + pl;
    return Timer();
};

let stopped = false;

const Stop = () => {
    const time = timer.textContent.match(/[0-9]/g);
    let seconds = ((Number(time[1])||undefined) ? Number(time[0]) * 10 : time) + (Number(time[1]) || 0);

    if (stopped) {
        stopped = false;
        stopbtn.textContent = "Остановить ход";

        interval = setInterval(() => {
            seconds -= 1;
    
            if (seconds <= 0) {
                clearInterval(interval);
                timer.textContent = 'Время вышло!';
                return;
            }
    
            timer.textContent = `Осталось: ${seconds} ${RuWords(seconds, ['Секунда', 'Секунды', 'Секунд'])}`;
        }, 1000);
    } else {
        stopped = true;
        stopbtn.textContent = "Возобновить ход";

        clearInterval(interval);
        timer.textContent = `Осталось: ${seconds} ${RuWords(seconds, ['Секунда', 'Секунды', 'Секунд'])}`;
    }
};