const appCard = document.querySelectorAll('.app-card');
const appCardPop = document.querySelector('#app-card-pop')
appCard.forEach((card) => {
  card.onclick = e => {
    appCardPop.querySelector('img').src = card.querySelector('img').src;
    appCardPop.querySelector('h4').innerHTML = card.querySelector('h4').innerHTML;
    appCardPop.querySelector('#app-card-pop-desc').innerHTML = card.getAttribute('data-desc');
    const ingredients = card.getAttribute('data-ingredients').split(',');
    appCardPop.querySelector('ul').innerHTML = '';
    for (let i = 0; i < ingredients.length; i++) {
      appCardPop.querySelector('ul').innerHTML += `
        <li>${ingredients[i]}</li>
      `;
    }
    DOM.addState('app-card-pop', 'open');
    DOM.addState('body', 'doverh');
  };
});
window.onload = e => {

  if (window.location.href.includes('gallery')) {
    if (!window.location.href.includes('#')) {
      window.location.href += '#';

    }
    filterGallery();
  }
}
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach((btn) => {
  btn.onclick = e => {
    const url = window.location.href;
    const filter = btn.getAttribute('data-filter');
    let currentFilter;
    if (url.includes('#')) {

      currentFilter = url.split('#').pop();
    }
    window.location.href = url.replace('#' + currentFilter, `#${filter}`);
    filterGallery();

  };
});

function filterGallery() {
  filterButtons.forEach(item => {
    item.classList.remove('active');
  });
  const filter = window.location.href.split('#').pop();
  if (filter.trim() == '') {
    appCard.forEach(e => {
      e.parentElement.classList.remove('d-none');
    });
    filterButtons[0].classList.add('active');
    return;
  }
  for (let i = 0; i < filterButtons.length; i++) {
    if (filterButtons[i].getAttribute('data-filter') == filter) filterButtons[i].classList.add('active');
  }
  const selectCards = document.querySelectorAll(`.app-card[data-type="${filter}"]`);
  appCard.forEach(e => {
    e.parentElement.classList.add('d-none');
  });
  selectCards.forEach(e => {
    e.parentElement.classList.remove('d-none');

  });
}