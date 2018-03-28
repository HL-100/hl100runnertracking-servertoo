const http = require("http");
const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

//The twilio account is set up so that if you send an SMS to (313) 486-9690, the message is sent to this express server which sends the response "Working!"
const app = express();
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("Working!");
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

http.createServer(app).listen(process.env.PORT || 1337, function() {
  console.log("Express server listening on port 1337");
});
