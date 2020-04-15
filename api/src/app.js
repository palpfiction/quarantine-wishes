require("dotenv").config();
const Koa = require("koa");
const cors = require("@koa/cors");
const respond = require("koa-respond");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const bouncer = require("koa-bouncer");
const handleBouncerError = require("./middleware/handle-bouncer-error");
const ratelimit = require("koa-ratelimit");
const app = new Koa();

const PORT = process.env.PORT || 3000;
const RATE_LIMIT_DURATION = 3600000;

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
    max: 1000,
    disableHeader: false,
  })
);

app.use(require("./route/routes").routes());
app.start = (port = PORT) => {
  app.listen(port, () => {
    console.log(`listening on http://localost:${port}`);
  });
};

module.exports = app;
