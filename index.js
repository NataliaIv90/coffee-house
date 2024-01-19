const sliderData = [
  {
    id: 1,
    imageSrc: './img/home/coffee-slider-1.png',
    title: 'S&#39;mores Frappuccino',
    description: 'This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.',
    price: '5.50'
  },
  {
    id: 2,
    imageSrc: './img/home/coffee-slider-2.png',
    title: 'Caramel Macchiato',
    description: 'Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.',
    price: '5.00'
  },
  {
    id: 3,
    imageSrc: './img/home/coffee-slider-3.png',
    title: 'Ice coffee',
    description: 'A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.',
    price: '4.50'
  }
];
const sliderCards = document.querySelectorAll('.card');

let currentSlideIndex = 0,
  stopInterval = false;

const sliderWrapper = document.querySelector('.cards-wrapper'),
  intervalDuration = 5000;

sliderData.forEach(el => {
  sliderWrapper.insertAdjacentHTML('beforeend', `

  <div class='card ${el.id === 1 ? 'visible' : ''}' key=${el.id}>
    <div class='card-image-container'>
      <img src=${el.imageSrc} class='card-image' alt=${el.title}>
    </div>
    <h3 class='heading-3 card-title'>${el.title}</h3>
    <p class='body-medium card-text'>${el.description}</p>
    <p class='heading-3 card-price'>$${el.price}</p>
  </div>
  `);
})


function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('.header-list-item').forEach((btn, index) => {
  if (index !== 4) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = btn.firstElementChild.getAttribute('href');
      setTimeout(() => {
        navigateToSection(sectionId.split('').slice(1, sectionId.length).join(''));
      }, 1000)
    });
  }
})

document.querySelector('#sliderBtnRight').addEventListener('click', slideToLeft);

document.querySelector('#sliderBtnLeft').addEventListener('click', slideToRight);

let intervalId = setInterval(slideToLeft, intervalDuration);

function removeClassesFromElements(elements, classes) {
  elements.forEach((el) => {
    classes.forEach((className) => {
      el.classList.remove(className);
    });
  });
}

function slideToLeft() {
  const sliderBtns = document.querySelectorAll('.slider-cards-btn');
  const cards = document.querySelectorAll('.card');

  removeClassesFromElements(sliderBtns, ['active']);
  removeClassesFromElements(cards, ['slide-to-left', 'visible', 'slide-to-center-from-left', 'slide-to-right', 'slide-to-center-from-right']);

  cards[currentSlideIndex].classList.add('slide-to-left');

  currentSlideIndex += 1;
  if (currentSlideIndex > 2) {
    currentSlideIndex = 0;
  }

  cards[currentSlideIndex].classList.add('slide-to-center-from-left');
  sliderBtns[currentSlideIndex].classList.add('active');
}

function slideToRight() {
  const sliderBtns = document.querySelectorAll('.slider-cards-btn');
  const cards = document.querySelectorAll('.card');

  removeClassesFromElements(sliderBtns, ['active']);
  removeClassesFromElements(cards, ['slide-to-left', 'visible', 'slide-to-center-from-left', 'slide-to-right', 'slide-to-center-from-right']);

  cards[currentSlideIndex].classList.add('slide-to-right');

  currentSlideIndex -= 1;
  if (currentSlideIndex === -1) {
    currentSlideIndex = 2;
  }

  cards[currentSlideIndex].classList.add('slide-to-center-from-right');
  sliderBtns[currentSlideIndex].classList.add('active');
}

const eventsForSettingInterval = ['mouseenter', 'touchstart'];
const eventsToClearInterval = ['mouseleave', 'touchend'];

document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
  });

  card.addEventListener('mouseleave', () => {
    intervalId = setInterval(slideToLeft, intervalDuration);
  });

  card.addEventListener('touchstart', () => {
    clearInterval(intervalId);
  });

  card.addEventListener('touchend', () => {
    intervalId = setInterval(slideToLeft, intervalDuration);
  });
});


const cardContainer = document.querySelector('.cards-container');

let touchStartX = 0;
let touchEndX = 0;

cardContainer.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
});

cardContainer.addEventListener('touchmove', (event) => {
  touchEndX = event.touches[0].clientX;
});

cardContainer.addEventListener('touchend', () => {
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > 50) {
    slideToRight();
  } else if (swipeDistance < -50) {

    slideToLeft();
  }
});