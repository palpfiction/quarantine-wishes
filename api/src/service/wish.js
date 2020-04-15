const repository = require("../repository/wishrepository");

const MAX_WISHES_PER_DAY = 2;

module.exports = {
  async getAll(limit, offset) {
    const wishes = await repository.getAll(limit, offset);
    return wishes;
  },

  async get(id) {
    const wish = await repository.get(id);
    return wish;
  },

  async post(wish) {
    const ipWishCount = await repository.getIPWishCountLastDay(wish.ip);
    if (ipWishCount > MAX_WISHES_PER_DAY)
      return {
        error: `sorry, you've posted too many wishes today. see you tomorrow!`,
      };
    const storedWish = await repository.store(wish);
    return storedWish;
  },

  async remove(id) {
    const removed = await repository.remove(id);
    return removed !== 0;
  },
};
