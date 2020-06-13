const getZero = (num) => {
    if (0 <= num && num < 10) {
        return `0${num}`;
    }

    if (num < 0) {
        return '00';
    }
    return num;
};

function timer(deadline, timerSelector, daysSelector, hoursSelector, minutesSelector, secondsSelector, timerTitlesSelector){
    // Таймер

    const endtime = deadline;
    
    const getTimeRemaining = (endTime) => {
        const miliSeconds = Date.parse(endTime) - new Date(),
            days = getZero(Math.floor(miliSeconds / (1000 * 60 * 60 * 24))),
            minutes = getZero(Math.floor(miliSeconds / (1000 * 60) % 60)),
            hours = getZero(Math.floor(miliSeconds / (1000 * 60 * 60) % 24)),
            seconds = getZero(Math.floor(miliSeconds / 1000 % 60));
    
        return {
            days,
            hours,
            minutes,
            seconds,
            miliSeconds,
        };
    };
    
    const setClock = (selector, endTime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector(daysSelector),
            hours = timer.querySelector(hoursSelector),
            minutes = timer.querySelector(minutesSelector),
            seconds = timer.querySelector(secondsSelector),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const timeObject = getTimeRemaining(endTime);
            hidePrice(timeObject.miliSeconds);

            days.innerHTML = timeObject.days;
            hours.innerHTML = timeObject.hours;
            minutes.innerHTML = timeObject.minutes;
            seconds.innerHTML = timeObject.seconds;

            if (timeObject.miliSeconds < 1000) {
                clearInterval(timeInterval);
            }
        }
    };

    function hidePrice(time) {
        const priceTitle = document.querySelectorAll(timerTitlesSelector);
            //   priceTimer = document.querySelector('.promotion__timer .timer');

        if (time > 1000) {
            priceTitle[1].classList.add('hide');
        } else {
            priceTitle[0].classList.add('hide');
            // priceTimer.classList.remove('timer');
            // priceTimer.classList.add('hide');
            priceTitle[1].classList.remove('hide');
            priceTitle[1].classList.add('show');
        }
    }

    setClock(timerSelector, endtime);
}

// module.exports = timer;
export default timer;
export {getZero};