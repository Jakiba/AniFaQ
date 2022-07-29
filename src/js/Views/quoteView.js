class QuoteView {
  _parentElement = document.querySelector(".section-search-results");

  constructor() {
    //for bookmarking quotes
    this._parentElement.addEventListener("click", function (e) {
      const target = e.target.closest(".bookmark-icon");
      target?.classList.toggle("bookmark-fill");
    });
  }

  //clears all inner HTML of section.
  _clear() {
    document.querySelector(".section-search-results").innerHTML = "";
  }

  /**
   * Responsible for rendering the found quotes into the view.
   * @param {object} data fetched object with all data (title,...)
   */
  _renderResults(data) {
    const html = `
    <div class="container-results">
       <figure class="results-quote">
         <blockquote class="results-quote-text">
           “${data.quote}”
         </blockquote>
         <figcaption class="results-quote-from">
           (${data.anime}, ${data.character})
         </figcaption>
       </figure>

       <svg
       class="bookmark-icon"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg"
     >
       <path
         stroke-linecap="round"
         stroke-linejoin="round"
         stroke-width="2"
         d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
       ></path>
     </svg>
     </div>
    `;

    this._parentElement.insertAdjacentHTML("beforeend", html);
  }

  //Renders the 'loading'-spinner.
  _renderSpinner() {
    const html = `
        <div class='spinner-container'>
         <svg
            class="spinner-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <defs>
              <filter id="g">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="1"
                  result="b"
                />
                <feColorMatrix
                  in="b"
                  mode="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                  result="g"
                />
                <feBlend in="SourceGraphic" in2="g" />
              </filter>
            </defs>
            <g filter="url(#g)">
              <circle cx="5" cy="12" r="4">
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2s"
                  values="5;8;5"
                  keySplines=".36,.62,.43,.99;.79,0,.58,.57"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="19" cy="12" r="4">
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2s"
                  values="19;16;19"
                  keySplines=".36,.62,.43,.99;.79,0,.58,.57"
                  repeatCount="indefinite"
                />
              </circle>
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="0.75s"
                values="0 12 12;360 12 12"
                repeatCount="indefinite"
              />
            </g>
          </svg>
        </div>
    `;

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  /**
   * Responsible for rendering the error-message, if no data found for search-queue.
   * @param {string} mode 'title' or 'character'.
   * @returns {undefined}
   */
  _renderErrorMessage(mode) {
    const html = `
        <div class="error-container">
          <h3 class="error-message">could not find ${mode}...Try somehting else!</h3>
        </div>
     `;
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
}

export default new QuoteView();
