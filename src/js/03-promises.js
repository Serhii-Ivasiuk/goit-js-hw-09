import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('input', handleFormInputs);
formEl.addEventListener('submit', handleFormSubmit);

const formData = {};

function handleFormInputs(evt) {
  formData[evt.target.name] = Number(evt.target.value);
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  let delay = formData.delay;

  for (let i = 1; i <= formData.amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += formData.step;
  }

  formEl.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
