const menuBtn = document.querySelector('.open-menu');
const closeBtn = document.querySelector('.close-menu');
const mobMenu = document.querySelector('.mob-menu');
const menuLinks = document.querySelectorAll('.menu-link, .header-link');

const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (mobMenu && !mobMenu.classList.contains('hidden')) {
  mobMenu.classList.add('hidden');
}

if (mobMenu && isMobile) {

  const onEscPress = (e) => {
    if (e.key === 'Escape') closeMenu();
  };

  const onOverlayClick = (e) => {
    if (e.target === mobMenu) closeMenu();
  };

  const onLinkClick = (e) => {
    e.preventDefault();

    const targetID = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetID);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    if (e.currentTarget.classList.contains('menu-link')) {
      closeMenu();
    }
  };

  const openMenu = () => {
    mobMenu.classList.remove('hidden');
    mobMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', onEscPress);
    closeBtn && closeBtn.addEventListener('click', closeMenu);
    mobMenu.addEventListener('click', onOverlayClick);
    menuLinks.forEach(link => link.addEventListener('click', onLinkClick));
  };

  const closeMenu = () => {
    mobMenu.classList.remove('is-open');
    mobMenu.classList.add('hidden');
    document.body.style.overflow = '';

    document.removeEventListener('keydown', onEscPress);
    closeBtn && closeBtn.removeEventListener('click', closeMenu);
    mobMenu.removeEventListener('click', onOverlayClick);
    menuLinks.forEach(link => link.removeEventListener('click', onLinkClick));
  };


  menuBtn && menuBtn.addEventListener('click', openMenu);
}