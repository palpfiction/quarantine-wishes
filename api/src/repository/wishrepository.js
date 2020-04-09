const db = require("../db/postgres").db();

module.exports = {
  async getAll() {
    return db("wish").select();
  },

  async get(id) {
    return db("wish").select().where({ id }).first();
  },

  async store(wish) {
    return db("wish").insert(wish).returning("*");
  },

  async remove(id) {
    return db("wish").where({ id }).delete();
  },
};
