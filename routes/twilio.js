const express = require('express');
const queries = require('../queries/runnerqueries');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const router = express.Router();

function pacerParser(string) {
  if (string === 'piy') {
    return 'Yes';
  } else if (string === 'poy') {
    return 'Yes';
  } else if (string === 'pin') {
    return 'No';
  } else if (string === 'pon') {
    return 'No';
  }
}

function formatBody(string) {
  const newMsg = string.replace(/,/g, '').split(' ');
  if (newMsg[4] != undefined) {
    const body = {
      [`${newMsg[0]}In`]: newMsg[2],
      [`${newMsg[0]}Out`]: newMsg[3],
      [`${newMsg[0]}PacerIn`]: pacerParser(newMsg[4]),
      [`${newMsg[0]}PacerOut`]: pacerParser(newMsg[5]),
    };
    return body;
  }
  const body = {
    [`${newMsg[0]}In`]: newMsg[2],
    [`${newMsg[0]}Out`]: newMsg[3],
  };
  return body;
}

router.post('/sms', (request, response) => {
  const twiml = new MessagingResponse();
  twiml.message('Message received!');
  const updateBody = formatBody(request.body.Body);
  const id = request.body.Body.replace(/,/g, '').split(' ')[1];
  queries.update(id, updateBody).then((record) => {
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.end(twiml.toString());
  });
});

module.exports = router;
