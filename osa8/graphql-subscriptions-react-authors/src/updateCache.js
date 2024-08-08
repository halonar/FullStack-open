import { ALL_BOOKS } from "./queries.js";

export const updateCache = (cache, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqueByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(
    {
      query: ALL_BOOKS,
      variables: { genre: null },
    },
    ({ allBooks }) => {
      return {
        allBooks: uniqueByTitle(allBooks.concat(addedBook)),
      };
    }
  );
};
