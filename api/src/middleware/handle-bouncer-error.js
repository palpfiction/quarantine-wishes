const bouncer = require("koa-bouncer");

/**
 * catches bouncer errors and returns BadRequest response with
 * the specified message.
 */
module.exports = function handleBouncerValidationError() {
  return async (ctx, next) => {
    try {
      return await next();
    } catch (error) {
      if (error instanceof bouncer.ValidationError) {
        return ctx.badRequest({ error: error.message });
      }
      throw error;
    }
  };
};
