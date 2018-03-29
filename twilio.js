let msg = '';
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message('Message received!');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
  msg = req.body.Body;
  console.log(msg);
});

module.exports = twilio;
