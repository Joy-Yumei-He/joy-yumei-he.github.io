const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
  menuButton.querySelector('span').textContent = '＋';
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
  menuButton.querySelector('span').textContent = open ? '−' : '＋';
});
menu.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const navigation = [...menu.querySelectorAll('a[href^="#"]')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navigation.forEach((link) => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-12% 0px -65% 0px', threshold: 0 });
document.querySelectorAll('main .nav-section[id]').forEach((section) => observer.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();

// Keep the full photo and its lavender frame level with the desktop text block.
const beyondCopy = document.querySelector('#beyond > div');
const beyondPhoto = document.querySelector('.beyond-photo');
const beyondImage = beyondPhoto.querySelector('img');
function sizeBeyondPhoto() {
  const frameStyle = getComputedStyle(beyondPhoto);
  const borderHeight = parseFloat(frameStyle.borderTopWidth) + parseFloat(frameStyle.borderBottomWidth);
  const borderWidth = parseFloat(frameStyle.borderLeftWidth) + parseFloat(frameStyle.borderRightWidth);
  const footerHeight = beyondPhoto.querySelector('.photo-frame-footer').getBoundingClientRect().height;
  const imageHeight = Math.max(0, beyondCopy.getBoundingClientRect().height - footerHeight - borderHeight);
  const imageRatio = Number(beyondImage.getAttribute('width')) / Number(beyondImage.getAttribute('height'));
  beyondPhoto.style.setProperty('--beyond-photo-width', `${imageHeight * imageRatio + borderWidth}px`);
}
sizeBeyondPhoto();
if ('ResizeObserver' in window) new ResizeObserver(sizeBeyondPhoto).observe(beyondCopy);
else window.addEventListener('resize', sizeBeyondPhoto);
