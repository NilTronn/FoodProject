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
export default menu;