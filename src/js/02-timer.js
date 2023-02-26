import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', handleStartTimer);

const TIMER_INTERVAL = 1000;
let intervalId = null;
let pickedDate = null;
let remainingTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkTimer(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function checkTimer(date) {
  pickedDate = date.getTime();

  if (date < Date.now()) {
    Notify.failure('Please choose a date in the future', {
      showOnlyTheLastOne: true,
    });

    refs.startBtn.disabled = true;

    return;
  }

  Notify.success('Countdown timer is ready to start', {
    showOnlyTheLastOne: true,
  });

  refs.startBtn.disabled = false;
}

function handleStartTimer() {
  intervalId = setInterval(timer, TIMER_INTERVAL);
  refs.startBtn.disabled = true;
  refs.dateInput.disabled = true;
}

function timer() {
  remainingTime = pickedDate - Date.now();

  if (remainingTime <= 0) {
    clearInterval(intervalId);
    refs.dateInput.disabled = false;
    return;
  }

  updateClockMarkup(remainingTime);
}

function updateClockMarkup(time) {
  refs.days.textContent = addLeadingZero(convertMs(time).days);
  refs.hours.textContent = addLeadingZero(convertMs(time).hours);
  refs.minutes.textContent = addLeadingZero(convertMs(time).minutes);
  refs.seconds.textContent = addLeadingZero(convertMs(time).seconds);
}

function addLeadingZero(number) {
  return String(number).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
