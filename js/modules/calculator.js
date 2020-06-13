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
export default calculator;