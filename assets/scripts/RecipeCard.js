// RecipeCard.js

class RecipeCard extends HTMLElement {
  // Called once when document.createElement('recipe-card') is called, or
  // the element is written into the DOM
  constructor() {
    super(); // A1

    // A1: Attach the shadow DOM to this Web Component (remember 'open' mode)
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Called when the .data property is set on this element.
   */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;

    // A2: Select the shadowRoot and clear it out
    this.shadowRoot.innerHTML = '';

    // A3: Create a <style> tag and add the styles from cardTemplate.html
    const style = document.createElement('style');
    style.textContent = `
      * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }

      a {
        text-decoration: none;
        color: #1a0dab;
      }

      article {
        align-items: flex-start;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        height: 300px;
        justify-content: flex-start;
        margin: 0;
        padding: 0 16px 16px 16px;
        width: 178px;
        background-color: white;
      }

      article > img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 118px;
        object-fit: cover;
        margin-left: -16px;
        width: calc(100% + 32px);
      }

      /* FIX: Give the title a fixed height so the next element always starts at the same spot */
      p.title {
        display: -webkit-box;
        font-size: 16px;
        font-weight: 700;
        line-height: 1.2em;
        height: 2.4em; /* Exactly 2 lines of text height */
        margin-top: 10px;
        margin-bottom: 4px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      p.organization {
        color: #70757a;
        font-size: 14px;
        height: 18px; /* Anchor height */
      }

      p.rating {
        align-items: center;
        display: flex;
        font-size: 14px;
        margin-top: 4px;
      }

      p.rating > img {
        height: auto;
        display: inline-block;
        object-fit: cover;
        width: 78px;
        margin: 0 3px;
      }

      time {
        font-size: 14px;
        color: #70757a;
        margin-top: 4px;
      }

      p.ingredients {
        font-size: 14px;
        line-height: 1.2em;
        margin-top: 8px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    `;

    // A4: Create the <article> element that will hold our markup
    const article = document.createElement('article');

    // A5: Create <img> element
    const img = document.createElement('img');
    img.src = data.imgSrc;
    img.alt = data.imgAlt;

    // A6: Create title
    const titlePara = document.createElement('p');
    titlePara.classList.add('title');
    const titleLink = document.createElement('a');
    titleLink.href = data.titleLnk;
    titleLink.textContent = data.titleTxt;
    titlePara.appendChild(titleLink);

    // A7: Create organizational/stat elements
    const orgPara = document.createElement('p');
    orgPara.classList.add('organization');
    orgPara.textContent = data.organization;

    const ratingPara = document.createElement('p');
    ratingPara.classList.add('rating');
    const ratingSpan = document.createElement('span');
    ratingSpan.textContent = data.rating;
    const ratingImg = document.createElement('img');
    ratingImg.src = `assets/images/icons/${data.rating}-star.svg`;
    ratingImg.alt = `${data.rating} stars`;
    const numRatingsSpan = document.createElement('span');
    numRatingsSpan.textContent = `(${data.numRatings})`;
    ratingPara.append(ratingSpan, ratingImg, numRatingsSpan);

    const timeElement = document.createElement('time');
    timeElement.textContent = data.lengthTime;

    const ingredientsPara = document.createElement('p');
    ingredientsPara.classList.add('ingredients');
    ingredientsPara.textContent = data.ingredients;

    // A8: Append all elements
    article.append(img, titlePara, orgPara, ratingPara, timeElement, ingredientsPara);
    this.shadowRoot.append(style, article);
  }
}

// A8: Define the custom element
customElements.define('recipe-card', RecipeCard);