require("dotenv").config();
const Koa = require("koa");
const cors = require("@koa/cors");
const respond = require("koa-respond");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const bouncer = require("koa-bouncer");
const handleBouncerError = require("./middleware/handle-bouncer-error");
const ratelimit = require("koa-ratelimit");
const send = require("koa-send");
const Router = require("koa-router");
const app = new Koa();

const PORT = process.env.PORT || 3000;
const RATE_LIMIT = process.env.RATE_LIMIT || 1000;
const RATE_LIMIT_DURATION = process.env.RATE_LIMIT_DURATION || 3600000;

app.use(logger());
app.use(cors());
app.use(bodyParser());
app.use(respond());
app.use(bouncer.middleware());
app.use(handleBouncerError());
app.use(
  ratelimit({
    driver: "memory",
    db: new Map(),
    duration: RATE_LIMIT_DURATION,
    errorMessage: `sorry... you've sent too many requests... sometimes you just have to slow down.`,
    id: (ctx) => ctx.ip,
    headers: {
      remaining: "Rate-Limit-Remaining",
      reset: "Rate-Limit-Reset",
      total: "Rate-Limit-Total",
    },
    max: RATE_LIMIT,
    disableHeader: false,
  })
);

app.use(require("./route/routes").routes());

const reactRoute = new Router();
reactRoute.get("/", async (ctx) => {
  await send(ctx, "index.html", { root: __dirname + "/client/build" });
});

app.use(reactRoute.routes());

app.use(async (ctx) => {
  await send(ctx, ctx.path, { root: __dirname + "/client/build" });
});

app.start = (port = PORT) => {
  app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
  });
};

module.exports = app;
