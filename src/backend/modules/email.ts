import * as envConfig from "../envConfig";
const mailjet = require("node-mailjet").connect(
  envConfig.mailjetPublicKey,
  envConfig.mailjetSecretKey
);
import fs from "fs";

class Email {
  sendWithoutAttachment(
    firstName: string,
    lastName: string,
    email: string,
    fromName: string,
    fromEmail: string,
    subject: string,
    textBody: string,
    htmlBody: string
  ) {
    mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: fromEmail,
              Name: fromName
            },
            To: [
              {
                Email: email,
                Name: `${firstName} ${lastName}`
              }
            ],
            Subject: subject,
            TextPart: textBody,
            HTMLPart: htmlBody
          }
        ]
      })
      .then((result: { body: any }) => {
        console.log(result.body);
      })
      .catch((err: { statusCode: any }) => {
        console.log(err.statusCode);
      });
  }

  sendWithAttachment(
    firstName: string,
    lastName: string,
    email: string,
    fromName: string,
    fromEmail: string,
    subject: string,
    textBody: string,
    htmlBody: string,
    fileName: string
  ) {
      let buff = fs.readFileSync(fileName);
      let base64data = buff.toString("base64");
    mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: fromEmail,
              Name: fromName
            },
            To: [
              {
                Email: email,
                Name: `${firstName} ${lastName}`
              }
            ],
            Subject: subject,
            TextPart: textBody,
            HTMLPart: htmlBody,
            Attachments: [
              {
                ContentType: "application/pdf",
                Filename: fileName,
                Base64Content: base64data
              }
            ]
          }
        ]
      })
      .then((result: { body: any; }) => {
        console.log(result.body);
      })
      .catch((err: { statusCode: any; }) => {
        console.log(err.statusCode);
      });
  }
}

export { Email }