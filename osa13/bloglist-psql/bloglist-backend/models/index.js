const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");
const Session = require("./session");

// Blog.sync({ alter: true });
// User.sync({ alter: true });
// ReadingList.sync({ alter: true });
// Session.sync({ alter: true });

User.hasMany(Blog, { foreignKey: "userId" });
Blog.belongsTo(User, { foreignKey: "userId" });
//User.hasMany(Blog);
//Blog.belongsTo(User);

User.belongsToMany(Blog, { as: "readings", through: ReadingList });
Blog.belongsToMany(User, { through: ReadingList });
User.hasMany(ReadingList);
Blog.hasMany(ReadingList);
ReadingList.belongsTo(User);
ReadingList.belongsTo(Blog);

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};
