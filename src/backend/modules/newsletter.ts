import * as envConfig from "../envConfig";
const mailjet = require("node-mailjet").connect(
  envConfig.mailjetPublicKey,
  envConfig.mailjetSecretKey
);


class Newsletter {
  addToList(firstname:string, lastname:string, name:string, email:string, phone:string, country:string, list:string) {
    mailjet
      .post("contactslist", { version: "v3" })
      .id(list)
      .action("managemanycontacts")
      .request({
        Action: "addnoforce",
        Contacts: [
          {
            Email: email,
            IsExcludedFromCampaigns: "false",
            Name: name,
            Properties: {
              firstname: firstname,
              lastname: lastname,
              phone: phone,
              country: country
            }
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

export { Newsletter }