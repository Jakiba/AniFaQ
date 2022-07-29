import * as model from "./model";
import quoteView from "./Views/quoteView.js";
import searchView from "./Views/searchView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

/**
 * Responsible for taking the fetched data and using it to render data into view.
 * @param {string} mode comes from 'addHandlerSearch' and is passed in into 'getQuoteByTitleOrCharacter' to use right fetch!
 * @returns {undefined}
 */
const controlSearchView = async function (mode) {
  try {
    const searchedAnimeTitle = searchView.getQuery();
    if (!searchedAnimeTitle) return;

    quoteView._renderSpinner();

    const data = await model.getQuoteByTitleOrCharacter(
      searchedAnimeTitle,
      mode
    );

    quoteView._clear();

    if (data.error) throw new Error(data.error);

    data.forEach((object) => quoteView._renderResults(object));
  } catch (err) {
    console.error(err);
    quoteView._renderErrorMessage(mode);
  }
};

//Subscriber to Publisher 'addHandlerRandomQuote'. Generates random Quote.
const controlRandomQuote = async function () {
  try {
    quoteView._renderSpinner();

    const data = await model.randomQuote();

    quoteView._clear();

    if (data.error) throw new Error(data.error);

    quoteView._renderResults(data);
  } catch (err) {
    console.error(err);
    quoteView._renderErrorMessage(mode);
  }
};

//Where all 'control'-functions are used.
const init = function () {
  searchView.addHandlerSearch(controlSearchView);
  searchView.addHandlerRandomQuote(controlRandomQuote);
};
init();
