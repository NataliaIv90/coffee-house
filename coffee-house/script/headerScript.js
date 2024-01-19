const burgerBtn = document.querySelector('#header-burger-btn'),
  headerNavSection = document.querySelector('#header-nav-section');

burgerBtn.addEventListener('click', () => {
  toggleButgerBtn();
  toggleNavigationVisibility();
});

document.querySelectorAll('.header-list-item').forEach((btn) => {
  btn.addEventListener('click', () => {

    if (window.innerWidth <= 768) {
      toggleButgerBtn();
      toggleNavigationVisibility();
    }
  });
})

function toggleButgerBtn() {
  burgerBtn.classList.toggle('active');
}

function toggleNavigationVisibility() {
  headerNavSection.classList.toggle('tablet-hidden');
}
