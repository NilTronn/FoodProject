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
export default modal;
export {showModal, closeModal};