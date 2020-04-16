const postgres = require("../db/postgres");
const db = postgres.db();

const YESTERDAY = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());

module.exports = {
  async getAll(limit, offset) {
    return db("wish")
      .select()
      .limit(limit)
      .offset(offset)
      .orderBy("created", "desc");
  },

  async get(id) {
    return db("wish").select().where({ id }).first();
  },

  async getIPWishCountLastDay(ip) {
    return db("wish")
      .count()
      .where({ ip })
      .andWhere("created", ">", YESTERDAY.toUTCString());
  },

  async store(wish) {
    return db("wish").insert(wish).returning("*");
  },

  async remove(id) {
    return db("wish").where({ id }).delete();
  },
};
