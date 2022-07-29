export const randomQuote = async function () {
  try {
    const response = await fetch("https://animechan.vercel.app/api/random");
    const data = await response.json();
    return data;
  } catch (err) {}
};

/**
 * Responsible for generating unique IDs.
 * @param {number} [length=25] length of id
 * @returns {string} 'id'
 */
const generateUniqueID = function (length = 25) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

/**
 * Responsible for fetching the necessary data.
 * @param {string} titleOrCharacter the queue with which we fetch the data.
 * @param {string} mode decides which fetch-function we use (one which searches for title or one which searches for character)!
 * @returns {object} fetched data
 */
export const getQuoteByTitleOrCharacter = async function (
  titleOrCharacter,
  mode
) {
  try {
    if (mode === "title") {
      const response = await fetch(
        `https://animechan.vercel.app/api/quotes/anime?title=${titleOrCharacter}`
      );
      const data = await response.json();
      data.id = generateUniqueID();
      return data;
    }
    if (mode === "character") {
      const response = await fetch(
        `https://animechan.vercel.app/api/quotes/character?name=${titleOrCharacter}`
      );
      const data = await response.json();
      data.id = generateUniqueID();
      return data;
    }
  } catch (err) {
    throw err;
  }
};
