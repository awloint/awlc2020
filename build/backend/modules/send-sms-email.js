"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const newsletter_1 = require("./newsletter");
const sms_1 = require("./sms");
const email_1 = require("./email");
const cancelledEmail = __importStar(require("../emails/cancelledRegistration"));
let name = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
};
class SendSmsEmail {
    email_sms(delegate) {
        let newsletter = new newsletter_1.Newsletter();
        newsletter.addToList(delegate.firstName, delegate.lastName, name(delegate.firstName, delegate.lastName), delegate.email, delegate.phone, delegate.country, "12025");
        let sms = new sms_1.SMS();
        let email = new email_1.Email();
        sms.send("AWLOInt", delegate.phone, `Dear ${name(delegate.firstName, delegate.lastName)}, thank you for taking steps to register for AWLC Sierra Leone 2020 holding from 2nd – 5th April 2020 at Freetown International Convention Center, Bintumani. To complete your registration, kindly visit https://awlo.org/awlc/awlc2020
    #AWLCSierraLeone2020.
    `);
        email.sendWithoutAttachment(delegate.firstName, delegate.lastName, delegate.email, "African Women in Leadership Organisation", "info@awlo.org", "#AWLCSierraLeone2020: Your Registration is not complete", cancelledEmail.textBodyCancelled(delegate.firstName, delegate.lastName), cancelledEmail.htmlBodyCancelled(delegate.firstName, delegate.lastName));
    }
}
exports.SendSmsEmail = SendSmsEmail;
