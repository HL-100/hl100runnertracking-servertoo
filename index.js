const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const queries = require("./queries");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const morgan = require("morgan");
const devMode = process.env.NODE_ENV !== "production";
let msg = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan(devMode ? "dev" : "combined"));
app.use(cors());

app.get("/runners", (req, res) => {
  queries
    .getRunners()
    .then(runners => {
      res.json(runners);
    })
    .catch(console.error);
});

app.get("/runners/:id", (request, response) => {
  queries
    .read(request.params.id)
    .then(runners => {
      runners ? response.json({ runners }) : response.sendStatus(404);
    })
    .catch(console.error);
});

app.post("/runners", (request, response) => {
  queries
    .create(request.body)
    .then(runners => {
      console.log(request.body);
      response.status(201).json({ runners });
    })
    .catch(console.error);
});

app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("Message received!");
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
  msg = req.body.Body;
  console.log(msg);
});

app.delete("/runners/:id", (request, response) => {
  queries
    .delete(request.params.id)
    .then(() => {
      response.sendStatus(204);
    })
    .catch(console.error);
});

app.put("/runners/:id", (request, response) => {
  queries
    .update(request.params.id, request.body)
    .then(runners => {
      response.json({ runners: runners[0] });
    })
    .catch(console.error);
});

app.use((request, response) => {
  response.sendStatus(404);
});

app.listen(process.env.PORT || 3000);
