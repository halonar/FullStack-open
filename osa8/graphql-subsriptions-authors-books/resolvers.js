const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, args, context) => {
      let filter = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });

        if (!author) {
          throw new Error("Author not found");
        }

        filter.author = author._id;
      }

      if (args.genre) {
        filter.genres = args.genre;
      }

      return await Book.find(filter).populate("author");
    },
    genres: async () => {
      return await Book.distinct("genres");
    },
    authorCount: async () => await Author.collection.countDocuments(),
    allAuthors: async (root, args, context) => {
      let authors = await Author.find({});
      const books = await Book.find({});

      authors = authors.map((author) => {
        let bookCount = books.reduce((count, book) => {
          return book.author.equals(author._id) ? count + 1 : count;
        }, 0);
        return { ...author._doc, id: author._id, bookCount };
      });

      console.log("ALL-AUTHORS: ", authors);
      return authors;
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      let token = { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
      console.log("Login token", token);
      return token;
    },

    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      let book = {};
      let newBook = {};

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      try {
        const author = await Author.findOne({ name: args.author });
        book = new Book({ ...args, author: author._id });
        newBook = await book.save().then((u) =>
          u.populate("author", {
            name: 1,
            born: 1,
          })
        );
      } catch (error) {
        throw new GraphQLError("Adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        });
      }

      console.log("BOOK_ADDED", newBook);
      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
      return newBook;
    },

    addAuthor: async (root, args) => {
      try {
        const author = new Author({ ...args });
        return await author.save();
      } catch (error) {
        throw new GraphQLError("Adding author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        });
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const filter = { name: args.name };
      const update = { born: args.setBornTo };
      try {
        const author = await Author.findOneAndUpdate(filter, update, {
          new: true,
        });
        return author;
      } catch (error) {
        throw new GraphQLError("Editing birth year failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
