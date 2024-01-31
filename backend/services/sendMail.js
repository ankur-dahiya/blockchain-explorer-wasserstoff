const nodemailer = require("nodemailer");

// nodemailer config
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMail = async (to, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Wasserstoff Block Chain Explorer" <${process.env.SMTP_EMAIL}>`, // sender address
      to,
      subject: "Wasserstoff Block Chain Explorer | New transaction alert", // Subject line
      text, // plain text body
      html, // html body
    });
    return info;
  } catch (err) {
    return err;
  }
};

const alertMailTemplate = (msg, balance) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wasserstoff Block Chain Explorer</title>
        <style>
            #alert_center_container{
                margin: auto;
            display: grid;
            grid-template-columns: 1fr;
            }
            #alert_explorer{
                place-self: center;
            font-size: 50px;
            }
            #alert_txn_info{
                place-self: center;
            font-size: 20px;
            }
            #alert_balance_info{
                place-self: center;
            font-size: 20px;
            font-weight: bold;
            }
            #alert_balance{
                color:green
            }
        </style>
    </head>
    <body>
        <div id="alert_center_container">
            <h1 id="alert_explorer">Wasserstoff Block Chain Explorer</h1>
            <p id="alert_txn_info">${msg}</p>
            <p id="alert_balance_info">New Balance is: <span id="alert_balance">${(
              balance /
              10 ** 18
            ).toFixed(5)}</span> ETH</p>
        </div>
    </body>
    </html>`;
};

module.exports = { sendMail, alertMailTemplate };
