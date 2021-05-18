const refs = {
    timer: document.querySelector('#timer-1'),
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),  
}

// const targetDate = new Date('May 30, 2021')
// const CountdownTimer = () => {
//     const timeNow = Date.now();
//     const futuretDate = targetDate.getTime();
//     const time = futuretDate - timeNow;
//     const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
//     const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
//     const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//     const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
//     refs.days.textContent = days;
//     refs.hours.textContent = hours;
//     refs.mins.textContent = mins;
//     refs.secs.textContent = secs;
// }

// const pad = (value) => String(value).padStart(2, '0');
  

class CountdownTimer {
    constructor({targetDate}) {
        this.targetDate = targetDate;
        this.timer();
    }
    
    timer() {
        const timeNow = Date.now();
        console.log(this.targetDate)
        const futureDate = this.targetDate.getTime();
        console.log(futureDate)
        const time = futureDate - timeNow;
        console.log(time)
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        console.log(days);
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        console.log(`${days}:${hours}:${mins}:${secs}`)
        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.mins.textContent = mins;
        refs.secs.textContent = secs;
    };
    
    pad(value) {
        return String(value).padStart(2, '0');
    };

    startTimer() {
        return setInterval(this.timer,1000);
    };
}

const newTimer = new CountdownTimer({
  targetDate: new Date('May 30, 2021'),
});

newTimer.startTimer.bind(newTimer)