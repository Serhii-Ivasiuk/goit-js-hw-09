const SWITCH_COLOR_DELAY = 1000;
let intervalId = null;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', handleStartBtnClick);
refs.stopBtn.addEventListener('click', handleStopBtnClick);

function handleStartBtnClick() {
  setRandomBodyBgColor();

  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  intervalId = setInterval(() => {
    setRandomBodyBgColor();
  }, SWITCH_COLOR_DELAY);
}

function handleStopBtnClick() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setRandomBodyBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
