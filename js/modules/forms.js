import {showModal, closeModal} from './modal';
import {postData} from '../services/services';

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
            postData('http://localhost:3000/requests', formData)
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

        showModal('.modal', modalTimerID);

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
            closeModal('.modal');
        }, 3000);
    }
}

// module.exports = forms;
export default forms;