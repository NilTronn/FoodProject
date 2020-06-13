"use strict";
import calculator from './modules/calculator';
import forms from './modules/forms';
import menu from './modules/menu';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    // const timer = require('./modules/timer');
    // const tabs = require('./modules/tabs');
    // const slider = require('./modules/slider');
    // const modal = require('./modules/modal');
    // const menu = require('./modules/menu');
    // const forms = require('./modules/forms');
    // const calculator = require('./modules/calculator');
    const modalTimerID = setTimeout(() => showModal('.modal', modalTimerID), 15000);
    
    timer('2020-07-10', '.timer', '#days', '#hours', '#minutes', '#seconds', '.promotion__timer .title');
    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    slider({
        slidesSelector: '.offer__slide', 
        prevSelector: '.offer__slider-prev', 
        nextSelector: '.offer__slider-next', 
        totalSelector: '#total', 
        currentSelector: '#current', 
        wrapperSelector: '.offer__slider-wrapper', 
        fieldSelector: '.offer__slider-inner'
    });
    modal('[data-modal]', '.modal', modalTimerID);
    menu();
    forms(modalTimerID);
    calculator();
});