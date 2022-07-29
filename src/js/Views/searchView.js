class SearchView {
  /**
   * Responsible for getting and returning search-queue.
   * @returns {string} anime or title user is searching for.
   */
  getQuery() {
    const query = document.getElementById("quotes-search").value;
    document.getElementById("quotes-search").value = "";
    return query;
  }

  //Publisher (Subscriber --> 'controlRandomQuote'). On button-click.
  addHandlerRandomQuote(handlerFunction) {
    document
      .querySelector(".random-quote-button")
      .addEventListener("click", function () {
        handlerFunction();
      });
  }

  /**
   * 'Publisher' to 'controlSearchView', listens to 'submit'-event on search-bar.
   * @param {function} handlerFunction passed in 'subscriber'.
   * @returns {undefined}
   */
  addHandlerSearch(handlerFunction) {
    document.querySelector(".search").addEventListener("submit", function (e) {
      e.preventDefault();
      const mode = document.getElementById("character-or-title").value;
      document.querySelector(".section-search-results").innerHTML = "";
      handlerFunction(mode);
    });
  }
}

export default new SearchView();
