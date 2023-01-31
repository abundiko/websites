//variables 
const cardPopup = document.getElementById('card1-pop');


let lastOffset = 0;
window.onscroll = function (e) {
  const offset = window.scrollY;
  const h = window.innerHeight / 8;
  const mainWidth = document.getElementById('hero-main').clientWidth;
  (offset > lastOffset) ? DOM.remState("header", "scrolled") : DOM.addState("header", "scrolled");
  if (window.innerWidth > 768) {

    if (offset > h) {
      DOM.addState("hero-main", "scrolled");
      DOM.addState("hero-second", "scrolled");
      document.getElementById('hero-second').style = `transform: translateX(-${mainWidth}px)`;

    } else {
      DOM.remState("hero-main", "scrolled");
      DOM.remState("hero-second", "scrolled");
      document.getElementById('hero-second').style = "";

    }
  }
  lastOffset = offset;
};

const DOM = {
  toggleState: function (id, className) {
    document.getElementById(id).classList.toggle(className);
  },
  addState: function (id, className) {
    document.getElementById(id).classList.add(className);
  },
  remState: function (id, className) {
    document.getElementById(id).classList.remove(className);
  },
};

const appCard1 = {
  cards: document.querySelectorAll('.app-card1'),
  closeBtn: document.querySelector('#card1-pop-x'),
  values: {
    x: 0, y: 0, h: 0, w: 0,
  }
};

appCard1.cards.forEach((card) => {
  card.onclick = e => {
    const w = card.clientWidth;
    const h = card.clientHeight;
    const x = card.getBoundingClientRect().x;
    const y = card.getBoundingClientRect().y;

    setCardDetails(
      card.querySelector('#name').innerHTML,
      card.querySelector('#profile-pic').src,
      card.querySelector('#bg-img').src,
      card.getAttribute('data-poem'),
      card.getAttribute('data-prize'),
    )

    document.body.style = `
      --c1x:${x}px;
      --c1y:${y}px;
      --c1h:${h}px;
      --c1w:${w}px;
    `;
    appCard1.values.x = x;
    appCard1.values.y = y;
    appCard1.values.w = w;
    appCard1.values.h = h;

    DOM.addState("body", "doverh");
    setTimeout(() => {

      DOM.addState("card1-pop", "open");
      DOM.addState("card1-pop", "change");
      document.body.style = `
      --c1x:5vw;
      --c1y:5vh;
      --c1h:90vh;
      --c1w:90vw;
    `;
    }, 250);
  }
});

appCard1.closeBtn.onclick = e => {
  DOM.remState("card1-pop", "change");
  document.body.style = `
      --c1x:${appCard1.values.x}px;
      --c1y:${appCard1.values.y}px;
      --c1h:${appCard1.values.h}px;
      --c1w:${appCard1.values.w}px;
    `;
  DOM.remState("body", "doverh");
  setTimeout(() => {
    DOM.remState("card1-pop", "open");

  }, 10);
}

function setCardDetails(name, profilePic, bgImg, poem, prize) {
  cardPopup.querySelector('#name').innerHTML = name;
  cardPopup.querySelector('#prize').innerHTML = prize;
  cardPopup.querySelector('#card1-poem').innerHTML = poem;
  cardPopup.querySelector('#bg-img').src = bgImg;
  cardPopup.querySelector('#profile-pic').src = profilePic;
}