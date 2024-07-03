import { createOptimizedPicture } from '../../scripts/aem.js';

async function createCard(block, data) {
  const ul = document.createElement('ul');
  data.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = '<div class="cards-card-image"><p>'
      + `<a href="${item.path}" title="${item.title}">`
      + `<picture><img loading="lazy" alt="" src="${item.image}"></picture>`
      + '</a></p></div>'
      + '<div class="cards-card-body">'
      + `<p class="button-container"><strong><a href="${item.path}" title="${item.title}" class="button primary">${item.title}</a></strong></p>`
      + `<p>${item.description}</p>`
      + '</div>';
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}

export default async function decorate(block) {
  const jsonEl = block.querySelector('a[href$=".json"]');
  const jsonPath = jsonEl.href;
  if (jsonPath) {
    const resp = await fetch(jsonPath);
    const json = await resp.json();
    // console.log('=====JSON=====> {} ', json);

    if (json && json.data) {
      createCard(block, json.data);
    }
  }
}
