const router = require("koa-router")();
const service = require("../service/wish");
const date = require("../db/postgres").timestamp;

const BASE_PATH = "/api";
const LIMIT = 10;
const OFFSET = 0;

router.get(`${BASE_PATH}`, (ctx) => {
  ctx.ok(`welcome, bro in the ip ${ctx.request.ip}`);
});

router.get(`${BASE_PATH}/wish`, async (ctx) => {
  ctx.validateQuery("limit").optional().toInt();
  ctx.validateQuery("offset").optional().toInt();

  const wishes = await service.getAll(
    ctx.vals.limit || LIMIT,
    ctx.vals.offset || OFFSET
  );

  ctx.ok({ wishes });
});

router.get(`${BASE_PATH}/wish/:id`, async (ctx) => {
  ctx.validateParam("id").required("id must be provided").toInt();

  const wish = await service.get(ctx.vals.id);
  if (!wish)
    return ctx.notFound({ error: `wish with id ${ctx.vals.id} not found` });

  ctx.ok(wish);
});

router.post(`${BASE_PATH}/wish`, async (ctx) => {
  ctx
    .validateBody("text")
    .required("text must be provided")
    .isString("text must be a string")
    .isLength(6, 500, "text must be 6-500 chars");

  ctx
    .validateBody("publisher")
    .optional()
    .isString("publisher must be a string")
    .isLength(3, 30, "publisher must be 3-30 chars");

  const wish = await service.post({
    text: ctx.vals.text,
    publisher: ctx.vals.publisher,
    ip: ctx.request.ip,
    created: date(),
  });

  if (!wish)
    return ctx.internalServerError({
      error: `i don't really know what happened...`,
    });

  ctx.ok(wish);
});

router.delete(`${BASE_PATH}/wish/:id`, async (ctx) => {
  ctx.validateParam("id").required("id must be provided").toInt();

  const removed = await service.remove(ctx.vals.id);

  if (!removed)
    return ctx.notFound({
      error: `i couldn't find wish with id ${ctx.vals.id}`,
    });
  ctx.ok({ message: "done!" });
});

module.exports = router;
