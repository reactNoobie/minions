const NUMBER_OF_COLUMNS = 4;
const NUMBER_OF_ROWS = 5;
const NUMBER_OF_MINIONS = NUMBER_OF_ROWS * NUMBER_OF_COLUMNS;

const INTERVAL_DURATION_MIN = 1000;
const INTERVAL_DURATION_MAX = 3000;

const getRandom = (max, min) => Math.floor(Math.random() * (min - max + 1)) + max;

const score = document.querySelector('.score');
score.innerText = "0";
score.dataset.score = 0;

const onIntervalPassed = minion => {
    minion.innerText = ++minion.dataset.elapsedTime;
    score.innerText = ++score.dataset.score;
};

const setMinionInterval = (minion, interval) => {
    minion.dataset.intervalDuration = interval;
    minion.dataset.intervalId = setInterval(onIntervalPassed, interval, minion);
    minion.style.animationDuration = `${interval}ms`;
};

const onGameOver = () => {
    score.innerText += ' (Game over)';
    document.querySelectorAll('.minion').forEach(minion => {
        minion.onclick = null;
        minion.style.opacity = 0;
    });
    container.onclick = null;
};

const checkGameOver = () => {
    const pausedMinions = document.querySelectorAll('.minion:not(.paused)');
    if (pausedMinions.length === 0) {
        onGameOver();
    }
};

const onMinionClicked = (e, minion) => {
    e.stopPropagation();
    minion.classList.toggle('paused');
    if (minion.classList.contains('paused')) {
        clearInterval(minion.dataset.intervalId);
        checkGameOver();
    } else {
        setMinionInterval(minion, minion.dataset.intervalDuration);
    }
};

const createMinion = () => {
    const minion = document.createElement('button');
    minion.classList.add('minion');
    minion.innerText = "0";
    minion.dataset.elapsedTime = 0;
    minion.style.backgroundColor = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)}`;
    return minion;
};

const getMinion = (minInterval, maxInterval) => {
    const minion = createMinion();
    const interval = getRandom(minInterval, maxInterval);
    setMinionInterval(minion, interval);
    minion.onclick = e => onMinionClicked(e, minion);
    return minion;
};

const container = document.querySelector('.container');
container.onclick = () => container.appendChild(getMinion(INTERVAL_DURATION_MIN, INTERVAL_DURATION_MAX));
for (let i = 0; i < NUMBER_OF_MINIONS; i++) {
    container.appendChild(getMinion(INTERVAL_DURATION_MIN, INTERVAL_DURATION_MAX));
}
