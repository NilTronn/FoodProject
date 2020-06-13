/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calculator() {
    // Калькулятор
    const  male = document.querySelector('#male'),
        female = document.querySelector('#female'),
        height = document.querySelector('#height'),
        weight = document.querySelector('#weight'),
        age = document.querySelector('#age'),
        physicalActivity = document.querySelectorAll('.calculating__choose_big [data-ratio]'),
        result = document.querySelector('.calculating__result span');

    function recalcCallories() {
        if (localStorage.getItem('gender') && localStorage.getItem('height') && localStorage.getItem('weight') && 
        localStorage.getItem('age') && localStorage.getItem('physicalActivityValue')) {
            result.textContent = localStorage.getItem('physicalActivityValue');
            if (localStorage.getItem('gender') == 'male') {
                result.textContent = Math.floor(result.textContent * (88.36 + (13.4 * localStorage.getItem('weight')) + 
                (4.8 * localStorage.getItem('height')) - (5.7 * localStorage.getItem('age'))));
            } else if (localStorage.getItem('gender') == 'female') {
                result.textContent = Math.floor(result.textContent * (447.6 + (9.2 * localStorage.getItem('weight')) + 
                (3.1 * localStorage.getItem('height')) - (4.3 * localStorage.getItem('age'))));
            }
        } else {
            result.textContent = '____';
        }
    }

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', () => {
                if (elem.getAttribute('data-ratio')) {
                    localStorage.setItem('physicalActivityValue', elem.getAttribute('data-ratio'));
                } else {
                    localStorage.setItem('gender', elem.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                elem.classList.add(activeClass);

                recalcCallories();
            });
        });
    }

    function getDinamicInformation(elem, localStorageValue) {
        elem.addEventListener('input', () => {
            if ((!isNaN(elem.value)) && (elem.value != '')) {
                localStorage.setItem(localStorageValue, +elem.value);
                elem.style.border = '1px solid green';
            } else if (elem.value == '') {
                elem.style.border = '1px solid #FFCC00';
                localStorage.removeItem(localStorageValue);
            } else {
                elem.style.border = '1px solid red';
                localStorage.removeItem(localStorageValue);
            }
            recalcCallories();
        });
    }

    if (localStorage.getItem('gender') == 'male') {
        male.classList.add('calculating__choose-item_active');
    } else {
        localStorage.setItem('gender', 'female');
        female.classList.add('calculating__choose-item_active');
    }

    if (localStorage.getItem('height') != null) {
        height.value = localStorage.getItem('height');
    }
    if (localStorage.getItem('weight') != null) {
        weight.value = localStorage.getItem('weight');
    }
    if (localStorage.getItem('age') != null) {
        age.value = localStorage.getItem('age');
    }

    document.querySelectorAll('[data-ratio]').forEach((elem, i, arr) => {
        if (elem.getAttribute('data-ratio') == localStorage.getItem('physicalActivityValue')) {
            elem.classList.add('calculating__choose-item_active');
        }
        if (!localStorage.getItem('physicalActivityValue')) {
            localStorage.setItem('physicalActivityValue', 1.375);
            arr[1].classList.add('calculating__choose-item_active');
        }
    });

    getStaticInformation("#gender", 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    getDinamicInformation(height, 'height');
    getDinamicInformation(weight, 'weight');
    getDinamicInformation(age, 'age');
    recalcCallories();
}

// module.exports = calculator;
/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(modalTimerID) {
    // Формы

    const forms = document.querySelectorAll('form');

    const messages = {
        success: 'Спасибо! Скоро с Вами свяжутся',
        loading: 'img/form/spinner.svg',
        error: 'Произошла ошибка! Попробуйте позже',
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            //  Добавляем спиннер после формы
            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.classList.add('center');
            form.insertAdjacentElement('afterend', statusMessage);

            //  Создаём объект FormData, чтобы получить данные из формы => далее переписываем их в объект json
            let formData = new FormData(form);
            // const object = {};
            // formData.forEach((value, key) => {
            //     object[key] = value;
            // });
            formData = JSON.stringify(Object.fromEntries(formData.entries()));

            // Создаём и отправляем запрос
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // request.setRequestHeader('Content-type', 'application/json');
            // request.send(formData);

            // fetch('server.php', {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'Content-type': 'application/json',
            //     },
            // })
            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', formData)
            .then(() => {
                showThanksModal(messages.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(messages.error);
            }).finally(() => {
                form.reset();
            });

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(messages.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(messages.error);
            //     }
            // });
        });
    }

    forms.forEach(form => {
        bindPostData(form);
    });

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showModal"])('.modal', modalTimerID);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close></div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
        }, 3000);
    }
}

// module.exports = forms;
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function menu() {
    // Меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.transfer = 27;
            this.price = this.changeToUAH(price);
            this.parentSelector = document.querySelector(parentSelector);
            if (classes.length === 0) {
                this.classes = ['menu__item'];
            } else {
                this.classes = classes;
            }
        }

        changeToUAH(price) {
            return (price * this.transfer);
        }

        render() {
            const menuItem = document.createElement('div');
            this.classes.forEach(className => {
                menuItem.classList.add(className);
            });
            
            menuItem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parentSelector.append(menuItem);
        }
    }

    // const getResources = async (url) => {
    //     const res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // };

    // getResources('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
    //         });
    //     });

    // new MenuCard(
    //     'img/tabs/vegy.jpg', 
    //     'vegy', 
    //     'Меню "Фитнес"', 
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    //     9, 
    //     '.menu__field .container',
    //     'menu__item',
    // ).render();

    // new MenuCard(
    //     'img/tabs/elite.jpg', 
    //     'elite', 
    //     'Меню “Премиум”', 
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    //     21, 
    //     '.menu__field .container',
    //     'menu__item',
    // ).render();

    // new MenuCard(
    //     'img/tabs/post.jpg', 
    //     'post', 
    //     'Меню "Постное"', 
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    //     14, 
    //     '.menu__field .container',
    //     'menu__item',
    // ).render();

    axios.get('http://localhost:3000/menu')
    .then(obj => {
        obj.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
        });
    });
}

// module.exports = menu;
/* harmony default export */ __webpack_exports__["default"] = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, showModal, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showModal", function() { return showModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
const showModal = (modalSelector, modalTimerID) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    // modal.classList.remove('unFade');
    modal.classList.add('fade');
    document.body.style.overflow = 'hidden';

    if (modalTimerID) {
        clearInterval(modalTimerID);
    }
}; 

const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('fade');
    // modal.classList.add('unFade');
    // const timeoutId = setTimeout(() => {
    modal.classList.remove('show');
    // }, 1000);
    document.body.style.overflow = '';
};

function modal(triggerSelector, modalSelector, modalTimerID) {
    // Модальное окно
    
    // const modal = document.querySelector('.modal'),
    //       modalClose = modal.querySelector('[data-close]'),
    //       modalBtn = document.querySelectorAll('[data-modal]');

    // const showModal = () => {
    //     modal.style.display = 'block';
    //     modal.classList.add('fade');
    // }; 

    // const closeModal = () => {
    //     modal.classList.remove('fade');
    //     modal.classList.add('unFade');
    //     const timeoutId = setTimeout(() => {
    //         modal.style.display = 'none';
    //     }, 1000);
    // };

    // modalBtn.forEach(btn => {
    //     btn.addEventListener('click', showModal);
    // });

    // modalClose.addEventListener('click', closeModal);

    const modalTriggers = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTriggers.forEach(modalTrigger => {
        modalTrigger.addEventListener('click', () => showModal(modalSelector, modalTimerID));
    });

    modal.addEventListener('click', (event) => {
        const element = event.target;
        if (element === modal || element.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape') {
            closeModal(modalSelector);
        }
    });

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerID);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);
}

// module.exports = modal;
/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


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

    total.textContent = Object(_timer__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slides.length);
    current.textContent = Object(_timer__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slideIndex);

    function plusSlides(n) {
        dots[slideIndex - 1].style.opacity = 0.5;

        slideIndex += n;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        } else if (slideIndex < 1) {
            slideIndex = slides.length;
        }

        dots[slideIndex - 1].style.opacity = 1;

        current.textContent = Object(_timer__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slideIndex);

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
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabHeaderSelector, tabsSelector, tabsContentSelector, activeClass) {
    //  Tабы

    const tabHeader = document.querySelector(tabHeaderSelector),
    tabs = tabHeader.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector);

    const hideTabsContent = () => {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    };

    const showTabContent = (i = 0) => {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add(activeClass);
    };

    hideTabsContent();
    showTabContent();

    tabHeader.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });
}

// module.exports = tabs;
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default, getZero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZero", function() { return getZero; });
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
/* harmony default export */ __webpack_exports__["default"] = (timer);


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










window.addEventListener('DOMContentLoaded', () => {
    // const timer = require('./modules/timer');
    // const tabs = require('./modules/tabs');
    // const slider = require('./modules/slider');
    // const modal = require('./modules/modal');
    // const menu = require('./modules/menu');
    // const forms = require('./modules/forms');
    // const calculator = require('./modules/calculator');
    const modalTimerID = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_3__["showModal"])('.modal', modalTimerID), 15000);
    
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('2020-07-10', '.timer', '#days', '#hours', '#minutes', '#seconds', '.promotion__timer .title');
    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        slidesSelector: '.offer__slide', 
        prevSelector: '.offer__slider-prev', 
        nextSelector: '.offer__slider-next', 
        totalSelector: '#total', 
        currentSelector: '#current', 
        wrapperSelector: '.offer__slider-wrapper', 
        fieldSelector: '.offer__slider-inner'
    });
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerID);
    Object(_modules_menu__WEBPACK_IMPORTED_MODULE_2__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_1__["default"])(modalTimerID);
    Object(_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: data,
    });

    return await res.json();
};



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map