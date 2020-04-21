import mailgun from 'mailgun-js';

const DOMAIN = 'sandboxf765937f20244d298d1c4df0b3ba176d.mailgun.org';

const sendMail = (email) => {
  const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

  mg.messages().send(email, (error, bytes) => {
    if (error) console.error(error);
    console.log(bytes);
  });
};

export const sendSecretMail = (to, secret) => {
  const email = {
    from: 'max@prismagram.com',
    to,
    subject: 'Login Secret for Prismagram 🔒',
    html: `Hello! Your login secret is <strong>${secret}</strong>. <br /> Copy paste on the app/website to login`,
  };
  sendMail(email);
};
