import {getZero} from './timer';

const deleteNaN = string => {
    return +string.replace(/\D/g, '');
};


function slider({slidesSelector, prevSelector, nextSelector, totalSelector, currentSelector, wrapperSelector, fieldSelector}) {
    // Слайдер

    const slides = document.querySelectorAll(slidesSelector),
        prev = document.querySelector(prevSelector),
        next = document.querySelector(nextSelector),
        total = document.querySelector(totalSelector),
        current = document.querySelector(currentSelector),
        slidesWrapper = document.querySelector(wrapperSelector),
        slidesField = document.querySelector(fieldSelector),
        width = deleteNaN(window.getComputedStyle(slidesWrapper).width);

    let slideIndex = 1,
        offset = 0;
    slides.forEach(slide => {
        slide.style.width = width;
    });
    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex);

    function plusSlides(n) {
        dots[slideIndex - 1].style.opacity = 0.5;

        slideIndex += n;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        } else if (slideIndex < 1) {
            slideIndex = slides.length;
        }

        dots[slideIndex - 1].style.opacity = 1;

        current.textContent = getZero(slideIndex);

        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function toNextSlide() {
        if (offset == width * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += width;
        }

        plusSlides(1);
    }

    function toPrevSlide() {
        if (offset == 0) {
            offset = width * (slides.length - 1);
        } else {
            offset -= width;
        }

        plusSlides(-1);
    }

    next.addEventListener('click', () => {
        resetSlideInterval();
        toNextSlide();
    });

    prev.addEventListener('click', () => {
        resetSlideInterval();
        toPrevSlide();
    });
    // showSlides(slideIndex);

    // total.textContent = getZero(slides.length);

    // function showSlides() {
    //     if (slideIndex > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (slideIndex < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.classList.add('hide'));

    //     slides[slideIndex - 1].classList.remove('hide'); 
    //     slides[slideIndex - 1].classList.add('show'); 

    //     current.textContent =  getZero(slideIndex);
    // }

    // function plusSlides (n) {
    //     slideIndex += n;
    //     showSlides();
    // }

    // prev.addEventListener('click', function(){
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', function(){
    //     plusSlides(1);
    // });

    const dotsWrapper = document.createElement('ol'),
        slider = document.querySelector('.offer__slider'),
        dots = [];

    slider.style.position = 'relative';
    dotsWrapper.classList.add('carousel-indicators');
    slider.append(dotsWrapper);

    for (let i = 1; i <= slides.length; i++) {
        let dot = document.createElement('li');
        dot.classList.add('dot');
        dotsWrapper.append(dot);
        dots.push(dot);

        if (i == 1) {
            dot.style.opacity = 1;
        }

        dot.addEventListener('click', () => {
            resetSlideInterval();
            offset += width * (i - slideIndex);
            plusSlides(i - slideIndex);
        });
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            toNextSlide();
        }, 6000);
    }

    let slideInterval = setInterval(() => {
        toNextSlide();
    }, 6000);
}

// module.exports = slider;
export default slider;