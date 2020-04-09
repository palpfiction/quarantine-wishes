require("dotenv").config();
const Koa = require("koa");
const cors = require("@koa/cors");
const respond = require("koa-respond");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const bouncer = require("koa-bouncer");
const app = new Koa();

const PORT = process.env.PORT || 3000;

app.use(logger());
app.use(cors());
app.use(bodyParser());
app.use(respond());
app.use(bouncer.middleware());
app.use(require("./route/routes").routes());

app.start = (port = PORT) => {
  app.listen(port, () => {
    console.log(`listening on http://localost:${port}`);
  });
};

module.exports = app;
