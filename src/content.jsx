const netflixProduced = ['arrested development', 'bojack horseman', 'love on the spectrum', 'blockbuster', 'dark tourist', 'queer eye', 'trailer park boys'];

const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

const filterOutNetflix = () => {
  const items = document.querySelectorAll('.slider-item');

  items.forEach((item) => {
    if(elementIsVisibleInViewport(item)){
      const targetChild = item.children[0].children[0].children[0].children[0]['ariaLabel'];
  
      netflixProduced.forEach((title) => {
        if(title.toLocaleLowerCase() === targetChild.toLocaleLowerCase()) {
          item.style.display = 'none'
        }
      })
    }
  })
}

const bringContinueWatchingToTop = () => {
  const continueWatching = document.querySelector('[data-list-context="continueWatching"]');
  const hero = document.querySelector(".volatile-billboard-animations-container");

  if(hero) {
    hero.appendChild(continueWatching);
  }
}

const useRegex = (input) => {
  let match = input.match(/\/title\/[A-Za-z0-9]+\?track/i);
  return match[0];
}

window.addEventListener('click', async(ev) => {
  if(ev.target.dataset.uia === 'expand-to-detail-button'){
    const targetLink = ev.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    
    const id = useRegex(targetLink.href);
    const split = id.split('/')[2].split('?')[0];
    
    const cards = document.querySelectorAll('.slider-refocus')

    const arrayNodes = Array.from(cards, node => node.href)

    const target = arrayNodes.find((node) => {
      return node.includes(split);
    })

    let title;

    cards.forEach((card) => {
      if(card.href === target){
        title = card;
      }
    })

    const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${title.ariaLabel}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      return data;
    })

    console.log('response: ', response)

    const previewModal = document.querySelector('.previewModal--info');
    const infoSection = previewModal.querySelector('.ptrack-container');

    const reviewsContainer = document.createElement("div");

    if(response.Ratings[0]){
      const firstScore = document.createElement('h2');
      firstScore.innerHTML = `${response.Ratings[0].Source}: ${response.Ratings[0].Value}`;
      reviewsContainer.appendChild(firstScore)
    }

    if(response.Ratings[1]){
      const secondScore = document.createElement('h2');
      secondScore.innerHTML = `${response.Ratings[1].Source}: ${response.Ratings[1].Value}`;
      reviewsContainer.appendChild(secondScore);
    }

    if(response.Ratings[2]){
      const thirdScore = document.createElement('h2');
      thirdScore.innerHTML = `${response.Ratings[2].Source}: ${response.Ratings[2].Value}`;
      reviewsContainer.appendChild(thirdScore);
    }

    infoSection.appendChild(reviewsContainer);

  }
})

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if(req.name === 'pullUpEvent') {
    switch(req.type) {
      case 'continue-watching':
        bringContinueWatchingToTop();
    }
  } else if (req.name === 'filterEvent') {
    switch(req.type) {
      case 'filterOutNetflix':
        filterOutNetflix();
    }
  }
})
