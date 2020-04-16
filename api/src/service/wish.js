const repository = require("../repository/wishrepository");

const MAX_WISHES_PER_DAY = process.env.MAX_WISHES_PER_DAY || 100;

module.exports = {
  async getAll(limit, offset) {
    const wishes = await repository.getAll(limit, offset);
    return wishes;
  },

  async get(id) {
    const wish = await repository.get(id);
    return wish[0];
  },

  async post(wish) {
    const ipWishCount = await repository.getIPWishCountLastDay(wish.ip);
    console.log(MAX_WISHES_PER_DAY);
    console.log(ipWishCount[0].count);

    if (
      ipWishCount &&
      ipWishCount.length > 0 &&
      Number(ipWishCount[0].count) > Number(MAX_WISHES_PER_DAY)
    )
      return {
        error: `sorry, you've posted too many wishes today. see you tomorrow!`,
      };
    const storedWish = await repository.store(wish);

    return { wish: storedWish[0] };
  },

  async remove(id) {
    const removed = await repository.remove(id);
    return removed !== 0;
  },
};
