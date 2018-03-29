const express = require("express");
const queries = require("../queries/runnerqueries");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const router = express.Router();

function stringToBoolean(string) {
  let newBoolean;
  if (string === "yes") {
    return (newBoolean = true);
  } else if (string === "no") {
    return (newBoolean = false);
  } else {
    return (newBoolean = null);
  }
}

router.post("/sms", (request, response) => {
  const twiml = new MessagingResponse();
  twiml.message("Message received!");
  let msg = request.body.Body.replace(/,/g, "").split(" ");
  let as = msg[0];
  let id = msg[1];
  let updateBody = {
    [`${as}In`]: msg[2],
    [`${as}Out`]: msg[3],
    [`${as}PacerIn`]: stringToBoolean(msg[4]),
    [`${as}PacerOut`]: stringToBoolean(msg[5])
  };
  console.log(updateBody);
  queries.update(id, updateBody).then(record => {
    response.writeHead(200, { "Content-Type": "text/xml" });
    response.end(twiml.toString());
  });
});

module.exports = router;
