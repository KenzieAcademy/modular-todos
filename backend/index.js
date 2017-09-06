// used to combine middleware and run an HTTP server
const express = require("express");
// used to parse request body as JSON
const bodyParser = require("body-parser");
// we mount these routse onto /todos
const todoRoutes = require("./controllers/todos");
// needed to make cross-origin requests (eg, those originating from a different domain than the server is running on)
const cors = require("cors");

const app = express();
// enable cors requests for all routes
app.use(cors());
// parse request body as JSON
app.use(bodyParser.json());
// all routes beginning with /todos will be combined with those listed in
// todoRoutes (eg, /todos + /:id = /todos/:id)
app.use("/todos", todoRoutes)

// run a server listening on port 3000
app.listen(3000, () => console.log("API available @ http://localhost:3000/"));
