const NAVBAR_BURGER_SELECTOR = '.navbar-burger';
const ACTIVE_NAVBAR_BURGER_CLASS = 'is-active';

const turnOnNavbarMenuToggle = () => {
  const navbarBurgers = document.querySelectorAll(NAVBAR_BURGER_SELECTOR);

  for (const navbarBurger of navbarBurgers) {
    const { target } = navbarBurger.dataset;
    const navbarMenu = document.querySelector(target);

    navbarBurger.addEventListener('click', () => {
      navbarBurger.classList.toggle(ACTIVE_NAVBAR_BURGER_CLASS);
      navbarMenu.classList.toggle(ACTIVE_NAVBAR_BURGER_CLASS);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => turnOnNavbarMenuToggle());
