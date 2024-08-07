const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
// eslint-disable-next-line no-unused-vars
const { GraphQLError } = require("graphql");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/*
  you can remove the placeholder query once your first one has been implemented
*/

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String]! 
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String]!
      ): Book

    addAuthor(
      name: String!
      born: Int
      bookCount: Int!
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) => {
      let filteredBooks = books;

      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (book) => book.author === args.author
        );
      }

      if (args.genre) {
        filteredBooks = filteredBooks.filter((book) =>
          book.genres.includes(args.genre)
        );
      }
      return filteredBooks;
    },
    authorCount: () => authors.length,
    allAuthors: () => {
      authors = authors.map((author) => {
        let bookCount = books.reduce((count, book) => {
          return book.author === author.name ? count + 1 : count;
        }, 0);
        return { ...author, bookCount };
      });
      console.log("ALL-AUTHORS: ", authors);
      return authors;
    },
  },

  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      console.log("BOOKS: ", books);

      if (!authors.find((author) => author.name === book.author)) {
        const author = { name: book.author, id: uuid() };
        authors = authors.concat(author);
        console.log("AUTHORS: ", authors);
      }

      return book;
    },

    addAuthor: (root, args) => {
      const author = { ...args, id: uuid() };
      authors = authors.concat(author);
      console.log("AUTHORS: ", authors);
      return author;
    },

    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);

      if (!author) {
        return null;
      }

      const editedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((author) =>
        author.name !== args.name ? author : editedAuthor
      );
      return editedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
