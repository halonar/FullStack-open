const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(DATABASE_URL);

const migrationConf = {
  migrations: { glob: "migrations/*.js" },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("connected to the database");
  } catch (err) {
    console.log("failed to connect to the database", err);
    return process.exit(1);
  }

  return null;
};

const runMigrationsDown = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);

  // Get all migrations
  const migrations = await migrator.executed();

  // Sort migrations in descending order of timestamp
  migrations.sort((a, b) => b.timestamp - a.timestamp);

  // Run the migrations down
  for (const migration of migrations) {
    console.log(`Running migration down: ${migration.file}`);
    await migrator.down({ migration });
  }

  console.log("Migrations run down");
};

module.exports = {
  connectToDatabase,
  sequelize,
  rollbackMigration,
  runMigrationsDown,
};
