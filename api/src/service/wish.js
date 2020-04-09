const repository = require("../repository/wishrepository");

module.exports = {
  async getAll() {
    const wishes = await repository.getAll();
    return wishes;
  },

  async get(id) {
    const wish = await repository.get(id);
    return wish;
  },

  async store(wish) {
    const storedWish = await repository.store(wish);
    return storedWish;
  },

  async remove(id) {
    const removed = await repository.remove(id);
    return removed !== 0;
  },
};
