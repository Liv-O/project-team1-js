const menuBtn = document.querySelector('.open-menu');
const closeBtn = document.querySelector('.close-menu');
const mobMenu = document.querySelector('.mob-menu');
const mobileMenuLinks = document.querySelectorAll('.menu-link'); 
const desktopLinks = document.querySelectorAll('.header-link'); 
const isMobile = window.matchMedia('(max-width: 768px)').matches;

export const smoothScroll = (e) => {
  e.preventDefault();
  const targetID = e.currentTarget.getAttribute('href');
  const targetSection = document.querySelector(targetID);
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  e.currentTarget.blur();
};

if (mobMenu && isMobile) {
  const onEscPress = (e) => {
    if (e.key === 'Escape') closeMenu();
  };

  const onOverlayClick = (e) => {
    if (e.target === mobMenu) closeMenu();
  };

  const onLinkClick = (e) => {
    smoothScroll(e);
    if (e.currentTarget.classList.contains('menu-link')) closeMenu();
  };

  const openMenu = () => {
    mobMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', onEscPress);
    mobMenu.addEventListener('click', onOverlayClick);
    closeBtn?.addEventListener('click', closeMenu);
    mobileMenuLinks.forEach((link) => link.addEventListener('click', onLinkClick));
  };

  const closeMenu = () => {
    mobMenu.classList.remove('is-open');
    document.body.style.overflow = '';

    document.removeEventListener('keydown', onEscPress);
    mobMenu.removeEventListener('click', onOverlayClick);
    closeBtn?.removeEventListener('click', closeMenu);
    mobileMenuLinks.forEach((link) => link.removeEventListener('click', onLinkClick));
  };

  menuBtn?.addEventListener('click', openMenu);
}

if (!isMobile) {
  desktopLinks.forEach((link) => link.addEventListener('click', smoothScroll));
}