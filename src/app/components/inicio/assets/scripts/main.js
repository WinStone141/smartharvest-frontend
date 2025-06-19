
// button for navmenu
const nav = document.getElementById('nav');
const button = document.getElementById('menu-button');
const header = document.getElementById('header');
button.addEventListener('click', () => {
  nav.classList.toggle('show-nav');
  button.classList.toggle('show-menu');
  header.classList.toggle('show-header');
})

// handle resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    nav.classList.remove('show-nav');
    button.classList.remove('show-menu');
  }
})

