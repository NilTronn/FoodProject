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
export default tabs;