const header = document.querySelector('#header');
let previousScroll = window.scrollY;
let directionDown = true;
let directionChangeScroll = window.scrollY;
let dataScroll = 'top';
document.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const previousDirectionDown = directionDown;

    directionDown = scroll - previousScroll > 0;

    if (scroll < 100) {
        dataScroll = 'top';
        header.setAttribute('data-scroll', dataScroll);

        previousScroll = scroll;

        return;
    }

    if (scroll < 200 && directionDown) {
        previousScroll = scroll;

        return;
    }

    if (directionDown !== previousDirectionDown) {
        directionChangeScroll = scroll;
    }

    const changeInScroll = scroll - directionChangeScroll;

    if (changeInScroll < -60) {
        dataScroll = 'up';
        header.setAttribute('data-scroll', dataScroll);

        previousScroll = scroll;

        return;
    }

    dataScroll = 'none';
    header.setAttribute('data-scroll', dataScroll);

    previousScroll = scroll;
});

const navbarSelector = '#header';
const navbar = document.querySelector(navbarSelector);
const checkbox = document.querySelector(
    navbarSelector + ' input[type=checkbox]',
);

(() => {
    if (!checkbox || !navbar) {
        return;
    }

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            navbar.setAttribute('data-checked', '');
            header.setAttribute('data-scroll', 'none');
        } else {
            navbar.removeAttribute('data-checked');
            header.setAttribute('data-scroll', dataScroll);
        }
    });

    navbar.querySelectorAll('li, button').forEach((element) => {
        element.addEventListener('click', () => {
            checkbox.checked = false;
            const evt = new Event('change');
            checkbox?.dispatchEvent(evt);
        });
    });
})();
