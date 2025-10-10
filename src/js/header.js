
const menuBtn = document.querySelector('.open-menu');   
const closeBtn = document.querySelector('.close-menu');  
const mobMenu = document.querySelector('.mob-menu');     


const menuLinks = document.querySelectorAll('.menu-link, .header-link');

if (mobMenu) {

  const openMenu = () => {
    mobMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  menuBtn && menuBtn.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);


  mobMenu.addEventListener('click', (e) => {
    if (e.target === mobMenu) closeMenu();
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); 

      const targetID = link.getAttribute('href'); 
      const targetSection = document.querySelector(targetID); 

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth', 
          block: 'start'      
        });
      }

      if (link.classList.contains('menu-link')) {
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}