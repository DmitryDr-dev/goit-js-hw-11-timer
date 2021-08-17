class CountdownTimer {
  constructor({ name, targetDate }) {
    this.name = name;
    this.targetDate = targetDate;
    this.intervalId = null;
  }

  getRefs() {
    const days = document.querySelector('[data-value = "days"]');
    const hours = document.querySelector('[data-value = "hours"]');
    const mins = document.querySelector('[data-value = "mins"]');
    const secs = document.querySelector('[data-value = "secs"]');

    return { days, hours, mins, secs };
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.updateTimer(this.getRefs());
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  updateTimer({ days, hours, mins, secs }) {
    const deltaTime = this.targetDate - Date.now();
    console.log(deltaTime);

    days.textContent = Math.floor(deltaTime / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, '0');
    hours.textContent = Math.floor(
      (deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
      .toString()
      .padStart(2, '0');
    mins.textContent = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, '0');
    secs.textContent = Math.floor((deltaTime % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');

    if (deltaTime < 0) {
      this.stopTimer();

      days.textContent = '00';
      hours.textContent = '00';
      mins.textContent = '00';
      secs.textContent = '00';
    }
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 29, 2021'),
});

timer.startTimer();

// console.log(timer.getRefs());

/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);
