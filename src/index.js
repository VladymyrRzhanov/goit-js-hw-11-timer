// import countdownTimerTpl from "./templates/countdown-timer.hbs";
import makeCountdown from "./countdown";

class CountdownTimer {
    constructor({ targetDate, selector }) {
        this.selector = selector;
        creatCountdown(this.selector);
        this.targetDate = targetDate.getTime();
        this.start();
    };
    
    start() {
        const startTime = Date.now();
        const targetTime = this.targetDate - startTime;
        this.callTimer(targetTime);
        setInterval(() => {
            const currentTime = Date.now();
            const difInTime = currentTime - startTime;
            const deltaTime = targetTime - difInTime;
            this.callTimer(deltaTime);
        },1000);
    };

    callTimer(timerTime) {
        const time = this.getTimeComponents(timerTime);
        const refs = chooseSelectors(this.selector);
        timerInterface(refs,time);
    };

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs };
    };

    pad(value) {
        return String(value).padStart(2, '0');
    };

};

function creatCountdown(selector) {
    const newSelector = selector.slice(1, [selector.length]);
        document.body.insertAdjacentHTML('afterbegin', makeCountdown(newSelector));
};

function chooseSelectors(selector) {
    const refs = {
        daysValue: document.querySelector(`${selector} [data-value="days"]`),
        hoursValue: document.querySelector(`${selector} [data-value="hours"]`),
        minsValue: document.querySelector(`${selector} [data-value="mins"]`),
        secsValue: document.querySelector(`${selector} [data-value="secs"]`),
    };
        
    return refs;
};

function timerInterface({daysValue,hoursValue,minsValue,secsValue},{ days, hours, mins, secs }) {
    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minsValue.textContent = mins;
    secsValue.textContent = secs;
};

const newTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 17, 2021'),
});

const newTimer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Jun 17, 2021'),
});

const newTimer3 = new CountdownTimer({
  selector: '#timer-3',
  targetDate: new Date('Jul 17, 2021'),
});