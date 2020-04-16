const Knex = require("knex");

const config = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    user: process.env.POSTGRES_USER || "palp",
    password: process.env.POSTGRES_PASSWORD || "palp",
    database: process.env.POSTGRES_DB || "quarantinewishes",
  },
  searchPath: ["public"],
};

const instance = Knex(config);

console.info(
  `will connect to postgres://${config.connection.user}@${config.connection.host}/${config.connection.database}`
);

instance
  .raw("select 1")
  .then(() => {
    console.info("connected to database - o.k.");
  })
  .catch((error) => {
    console.error(`failed to connect to database: ${error}`);
    process.exit(1);
  });

const db = () => instance;

const timestamp = () => new Date().toUTCString();

module.exports = {
  config,
  db,
  timestamp,
};
