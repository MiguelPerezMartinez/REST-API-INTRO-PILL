const app = require("./server");
const { config } = require("./config/config");
const { connect } = require("./db/connect");

connect().then(async () => {
  //Listen pcon puerto y funcion de que queremos que haga
  app.listen(config.app.port, () => {
    console.log("Server running at port ");
    console.log(config.app.port);
  });
});
