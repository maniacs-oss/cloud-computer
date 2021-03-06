import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mailgun from 'mailgun-js';

const app = express();

const {
  MAIL_SERVICE_DOMAIN,
  MAIL_SERVICE_APIKEY,
} = process.env;

app.use(bodyParser.json());
app.use(cors());

app.post('/mail', function (req, res) {
  const DOMAIN = MAIL_SERVICE_DOMAIN;
  const mg = mailgun({ apiKey: MAIL_SERVICE_APIKEY, domain: DOMAIN });

  const data = {
    from: "Mailgun Sandbox <postmaster@sandbox47f2a5030ace4d899fe52eba517c4551.mailgun.org>",
    to: "gideonrosales@gmail.com",
    subject: "Hello",
    text: "Testing some Mailgun awesomness!"
  };

  /** Send test body **/
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });

  res.send('Done email')
});

app.listen(3000);
